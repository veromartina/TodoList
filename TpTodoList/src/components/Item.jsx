// El componente para cada tarea(TASKS)individual, que contiene las funciones de completar , eliminar y editar 

import { Box, Text, IconButton, Input, Button } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { saveTasks } from '../utils/LocalStorage';
import { useState } from 'react';  // Necesitas importar useState aquí

const Item = ({ task, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);  // Controla si la tarea está en modo de edición
  const [editedText, setEditedText] = useState(task.text);  // Guarda el nuevo texto de la tarea

  const handleCompleteTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEditTask = () => {
    if (editedText.trim() !== "") {  // Asegurarme de que el texto no esté vacío
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, text: editedText } : t
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setIsEditing(false);  // Desactivar el modo de edición
    }
  };

  return (
    <Box
    fontSize="20px"
    fontFamily="'Lobster'"
    borderColor={"blue.500"}
    borderWidth="2px"
    
      p={4}
      borderRadius="md"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      textDecoration={task.completed ? 'line-through' : 'none'}
    >
      {isEditing ? (
        <Box  mt={30} display="flex" alignItems="center" width="100%">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}  // Actualiza el texto mientras se escribe
            size="sm"
            mr={2}
            fontSize="20px"
            fontFamily="'Lobster'"
            borderColor={"blue.500"}
            borderWidth="2px"
            backgroundColor={"blue.100"}
          />
          <Button onClick={handleEditTask} colorScheme="teal" size="sm">
           Modificar
          </Button>
          <Button
            onClick={() => setIsEditing(false)}  // Cancelar la edición
            colorScheme="red"
            size="sm"
            ml={2}
          >
            Cancelar
          </Button>
        </Box>
      ) : (
        <>
          <Text flex="1" ml={4}>
            {task.text}
          </Text>
          <div>
            <IconButton
              icon={<CheckIcon />}
              onClick={handleCompleteTask}
              colorScheme="teal"
              mr={2}
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={handleDeleteTask}
              colorScheme="red"
              mr={2}
            />
            <IconButton
              icon={<EditIcon />}
              onClick={() => setIsEditing(true)}  // Activa el modo de edición
              colorScheme="blue"
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default Item;