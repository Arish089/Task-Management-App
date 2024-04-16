import React, { useEffect, useReducer, useState } from 'react'
import { Box, Button, Modal,ModalOverlay,ModalContent,ModalHeader, 
    ModalCloseButton, ModalBody, ModalFooter,Select, FormControl, Input, FormLabel } from '@chakra-ui/react'
import {useDispatch,useSelector} from 'react-redux'
import { ADD_DESCRIPTION, ADD_TITLE, ASSIGNEE, END_DATE, PRIORITY, RESET, START_DATE, STATUS } from '../redux/actionTypes'
import { store } from '../redux/store'
import axios from 'axios'


const EditTask = ({onClose,isOpen,FetchTask}) => {
    const state = useSelector(store=>store)
    const [Tasks,setTasks] = useState([])

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

useEffect(()=>{
  

  
},[])

  return (<Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl >
                <FormLabel>Title</FormLabel>
                <Input disabled={true} type='text' value={title} onChange={(e)=>{
                    setTitle(e.target.value)
                    dispatch({type:ADD_TITLE,payload:e.target.value})
                    }} />
                <FormLabel>Description</FormLabel>
                <Input disabled={true} value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                    dispatch({type:ADD_DESCRIPTION,payload:e.target.value})
                }}
                    />
                    <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e)=>{setStatus(e.target.value)
                dispatch({type:STATUS, payload:e.target.value})}}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">in Progress</option>
                    <option value="Completed" disabled={ false } >Completed</option>
                    <option value="Deployed" disabled={ false }>Deployed</option>
                    <option value="Deferred" >Deferred</option>
                </Select>

                <FormLabel>Start Date</FormLabel>
                <Input disabled={true} type='date' value={start} max={formattedToday} onChange={(e)=>{
                    setStart(e.target.value)
                    dispatch({type:START_DATE,payload:e.target.value})
                }}/>

                <FormLabel>End Date</FormLabel>
                <Input disabled={true} type='date' value={end} min={start} onChange={(e)=>{
                    setEnd(e.target.value)
                    dispatch({type:END_DATE,payload:e.target.value})
                }}/>

                
                <FormLabel>Assignee</FormLabel>
                <Input disabled={true} value={assignee} onChange={(e)=>{setAssignee(e.target.value)
                dispatch({type:ASSIGNEE, payload: e.target.value})}}/>
                <FormLabel>Priority</FormLabel>
                <Select value={priority} onChange={(e)=>{setPriority(e.target.value)
                dispatch({type:PRIORITY, payload: e.target.value})}}>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
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
      </Box>)
}

export default EditTask