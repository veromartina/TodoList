import { Box, Text, IconButton, Input, Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { saveTasks } from '../utils/LocalStorage';
import { useState, useRef } from 'react';

const Item = ({ task, setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(false);  // Controla si la tarea está en modo de edición
  const [editedText, setEditedText] = useState(task.text);  // Guarda el nuevo texto de la tarea
  
  // AlertDialog Hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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
      flexDirection={{ base: 'column', sm: 'row' }}  // En pantallas pequeñas, columna; en pantallas grandes, fila
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      overflow="hidden"  // Asegura que no haya desbordamiento
      textDecoration={task.completed ? 'line-through' : 'none'}
      textDecorationColor={task.completed ? 'blue.500' : 'transparent'}  // Color solo si está completada . 'transparent'cuando la tarea no está completada asegura que no se aplique ningún color al tachado.
    >
      {isEditing ? (
        <Box mt={30} display="flex" alignItems="center" width="100%">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}  // Actualiza el texto mientras se escribe
            size="sm"
            mr={2}
            fontSize="20px"
            fontFamily="'Lobster'"
            font-style= "normal"
            font-weight="100"
            borderColor={"blue.500"}
            borderWidth="2px"
            backgroundColor={"blue.100"}
            maxWidth="100%" 
            color= "grey"
          
          />
          <Button onClick={handleEditTask}  backgroundColor= {"green.500"} size="sm" color={"black"}>
            Modificar
          </Button>
          <Button
            onClick={() => setIsEditing(false)}  // Cancelar la edición
            backgroundColor= {"red.500"} color={"black"}
            size="sm"
            ml={2}
          >
            Cancelar
          </Button>
        </Box>
      ) : (
        <>
          <Text color= "grey" flex="1" ml={4}>
            {task.text}
          </Text>
          <div>
            <IconButton
              icon={<CheckIcon />}
              onClick={handleCompleteTask}
              backgroundColor= {"green.500"}
              mr={2}
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={onOpen}  // Abre el AlertDialog de confirmación
              backgroundColor="red.500"
              mr={2}
            />
            <IconButton
              icon={<EditIcon />}
              onClick={() => setIsEditing(true)}  // Activa el modo de edición
              backgroundColor={"blue.500"}
            />
          </div>
        </>
      )}

      {/* Aquí empieza el AlertDialog */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent color= {"black"} backgroundColor={"blue.100"} fontFamily="'Lobster'" >
          <AlertDialogHeader>¿Esta seguro de eliminar esta tarea?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Esta acción eliminará definitivamente la tarea de la lista.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button backgroundColor={"green.500"}  color={"black"}
             ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
            color={"black"}
              backgroundColor= {"red.500"}
              ml={3}
              onClick={() => {
                handleDeleteTask();  // Eliminar la tarea
                onClose();  // Cerrar el dialogo
              }}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default Item;

