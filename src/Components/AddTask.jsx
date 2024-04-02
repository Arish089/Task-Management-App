import React, { useEffect, useReducer, useState } from 'react'
import { Box, Button, Modal,ModalOverlay,ModalContent,ModalHeader, 
    ModalCloseButton, ModalBody, ModalFooter,Select, FormControl, Input, FormLabel } from '@chakra-ui/react'
import {useDispatch,useSelector} from 'react-redux'
import { ADD_DESCRIPTION, ADD_TITLE, ASSIGNEE, END_DATE, PRIORITY, RESET, START_DATE, STATUS } from '../redux/actionTypes'
import { store } from '../redux/store'
import axios from 'axios'


const AddTask = ({onClose,isOpen,FetchTask,edit,id}) => {
    const state = useSelector(store=>store)
    const [Tasks,setTasks] = useState([])
    const [singleTask,setSingleTask] = useState({})
   

    const formattedToday = new Date().toISOString().split('T')[0];

    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [start,setStart] = useState('')
    const [end,setEnd] = useState('')
    const [status,setStatus] = useState('')
    const [assignee,setAssignee] = useState('')
    const [priority,setPriority] = useState('')
    

    function handleSubmit(e){
        
        //console.log(title);
        console.log(state);
        
       PostTask(state)
      
       dispatch({type:RESET})
       
     // localStorage.clear() 
       // setTasks([])
        
        //dispatch({type:'RESET'})
        
      }

const PostTask = async (data)=>{
  try {
    let resp = await axios({
      method:"post",
      baseURL: `http://localhost:8080`,
      url: `/tasks`,
      data: data
    })
  } catch (error) {
    console.log(error);
  }
}

const FetchTask2 = async ()=>{
try {
  let res = await axios.get(`http://localhost:8080/tasks/${id}`)
  let data = await res.data
  console.log(data);
  return data
} catch (error) {
  console.log(error);
}
}

const EditTask = async ()=>{
  try {
    let res = await axios({
      method:'patch',
      baseURL: `http://localhost:8080`,
      url: `/tasks/${id}`,
      data:{
        ...singleTask,
        status: status,
        priority: priority
      }
    })
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
        if (edit && isOpen) {
            FetchTask2().then(final => setSingleTask(final));
        }
    }, [edit, isOpen]);

const handleSubmit2 = ()=>{
console.log(singleTask);
EditTask()
}
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
                <FormLabel>Title</FormLabel>
                <Input  type='text' value={title} onChange={(e)=>{
                    setTitle(e.target.value)
                    dispatch({type:ADD_TITLE,payload:e.target.value})
                    }} />
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                    dispatch({type:ADD_DESCRIPTION,payload:e.target.value})
                }}
                    />
                <FormLabel>Start Date</FormLabel>
                <Input type='date' value={start} max={formattedToday} onChange={(e)=>{
                    setStart(e.target.value)
                    dispatch({type:START_DATE,payload:e.target.value})
                }}/>

                <FormLabel>End Date</FormLabel>
                <Input type='date' value={end} min={start} onChange={(e)=>{
                    setEnd(e.target.value)
                    dispatch({type:END_DATE,payload:e.target.value})
                }}/>

                <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e)=>{setStatus(e.target.value)
                dispatch({type:STATUS, payload:e.target.value})}}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">in Progress</option>
                    <option value="Completed" disabled={end === "" || new Date(end) > new Date() ?true: false } >Completed</option>
                    <option value="Deployed" disabled={end === "" || new Date(end) > new Date() ?true: false }>Deployed</option>
                    <option value="Deferred" >Deferred</option>
                </Select>
                <FormLabel>Assignee</FormLabel>
                <Input value={assignee} onChange={(e)=>{setAssignee(e.target.value)
                dispatch({type:ASSIGNEE, payload: e.target.value})}}/>
                <FormLabel>Priority</FormLabel>
                <Select value={priority} onChange={(e)=>{setPriority(e.target.value)
                dispatch({type:PRIORITY, payload: e.target.value})}}>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={FetchTask}>
              Close
            </Button>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
{edit && <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
                <FormLabel>Title</FormLabel>
                <Input disabled={edit} type='text' value={title} onChange={(e)=>{
                    setTitle(e.target.value)
                    dispatch({type:ADD_TITLE,payload:e.target.value})
                }} placeholder={singleTask.title}/>
                <FormLabel>Description</FormLabel>
                <Input disabled={edit} value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                    dispatch({type:ADD_DESCRIPTION,payload:e.target.value})
                }} placeholder={singleTask.description}
                    />
                <FormLabel>Start Date</FormLabel>
                <Input disabled={edit} type='date' value={start} max={formattedToday} onChange={(e)=>{
                    setStart(e.target.value)
                    dispatch({type:START_DATE,payload:e.target.value})
                }} placeholder={singleTask.start_Date}/>

                <FormLabel>End Date</FormLabel>
                <Input disabled={edit} type='date' value={end} min={start} onChange={(e)=>{
                    setEnd(e.target.value)
                    dispatch({type:END_DATE,payload:e.target.value})
                }} placeholder={singleTask.end_Date} />

                <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e)=>{setStatus(e.target.value) 
                dispatch({type:STATUS, payload:e.target.value})}} placeholder={singleTask.status}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">in Progress</option>
                    <option value="Completed" disabled={end === "" || new Date(end) > new Date() ?true: false } >Completed</option>
                    <option value="Deployed" disabled={end === "" || new Date(end) > new Date() ?true: false }>Deployed</option>
                    <option value="Deferred" >Deferred</option>
                </Select>
                <FormLabel>Assignee</FormLabel>
                <Input disabled={edit} placeholder={singleTask.assignee} value={assignee} onChange={(e)=>{setAssignee(e.target.value)
                dispatch({type:ASSIGNEE, payload: e.target.value})}}/>
                <FormLabel>Priority</FormLabel>
                <Select value={priority} onChange={(e)=>{setPriority(e.target.value)
                dispatch({type:PRIORITY, payload: e.target.value})}} placeholder={singleTask.priority}>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{FetchTask()
            onClose()}}>
              Close
            </Button>
            <Button type='submit' onClick={handleSubmit2}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>}

      </Box>) 
}

export default AddTask