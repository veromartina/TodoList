import { List } from '@chakra-ui/react';
import Item from './Item'; 

const ListTask = ({ tasks, setTasks }) => {
  return (
    <List spacing={4}>
      {/* Renderizamos cada tarea usando el componente Item */}
      {tasks.map((task) => (
        <Item key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
      ))}
    </List>
  );
};

export default ListTask;