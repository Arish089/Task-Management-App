import React, { useEffect, useState } from 'react'
import { Flex,Text,Box, Divider,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Heading,useDisclosure, Tag, Button,Menu,MenuButton,MenuList,MenuItem } from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa' 
import axios from 'axios'
import AddTask from './AddTask'

const Tasks = ({tasks,del,setDel,FetchTask,head}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen,setAlertOpen] = useState(false)

const [edit,setEdit] = useState(true)
const [editId,setEditId] = useState('')

const DeleteTask = async (id)=>{
  try {
    const resp = await axios.delete(`http://localhost:8080/tasks/${id}`)
    setDel(!del)
  } catch (error) {
    console.log(error);
  }
}


const handleOpenAlert = () => {
  setAlertOpen(true);
};

// Function to handle closing the alert dialog
const handleCloseAlert = () => {
  setAlertOpen(false);
};

  return (
  <Flex direction='column' bg='white' h='auto' w={{md:'1/4',lg:'1/6'}} flexGrow={1} rounded='md'>
    
  <Text bg='#178582' fontSize='x-large' textAlign='center' fontWeight='semibold' color='white' roundedTop='md' px={2}>{head }</Text>
    {tasks?.map(task=>
    <>
    
              <Box p={2} key={task.title}>
                <Flex direction='column' bg='silver' rounded='md' color='white' p={2} gap={2}>
                    <Flex justifyContent='space-between' alignItems='center'>
                        <Heading fontSize={16}>{task.title}</Heading>
                        <Tag colorScheme='teal' px={2} py={0}>{task.priority}</Tag>
                    </Flex>
                    <Divider orientation='horizontal' color='silver' />
                    <Text fontSize={12}>{task.description}</Text>
                    <Flex justifyContent='space-between' alignItems='center'>
                        <Text fontSize={12} fontWeight='semibold'>@{task.assignee}</Text>
                        <Menu>
                        <MenuButton as={Tag} colorScheme='teal' p={1}>
                          <FaEllipsisV />
                          </MenuButton>
                          <MenuList color='black'>
                            <MenuItem onClick={()=>onOpen()}>Edit</MenuItem>
                            <AddTask edit={edit} setEdit={setEdit} id={task.id} onClose={onClose} FetchTask={()=>FetchTask()} isOpen={isOpen}/>
                            <MenuItem onClick={handleOpenAlert}>Delete</MenuItem>
                            <AlertDialog isOpen={isAlertOpen} onClose={handleCloseAlert}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Task</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to Delete the task?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCloseAlert}>Cancel</Button>
            <Button colorScheme="red" onClick={()=>DeleteTask(task.id)}>Confirm</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
                            </MenuList>
                            
                            </Menu>
                    </Flex>
                    <Tag colorScheme='teal'>{task.status ==="Pending"? "Assign": task.status}</Tag>
                </Flex>
              </Box>
            
            </>)}
            
            </Flex>
            )
}

export default Tasks