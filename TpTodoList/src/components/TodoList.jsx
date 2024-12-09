
import ListTask from './ListTask';

const TodoList = ({ tasks, setTasks }) => {  //componente recibe dos props,tasks:una lista de tareas que recibirá y mostrará.setTasks:función para modificar o actualizar el estado de las tareas.
  return (
    <div >
      <ListTask 
      tasks={tasks} setTasks={setTasks} />  {/*componente q se le pasan dos props,tasks={tasks}: Se le pasa el array tasks (que contiene las tareas) para que ListTask pueda usarlo.setTasks={setTasks}: Se le pasa la función setTasks para que ListTask pueda modificar la lista de tareas si es necesario.*/}
    </div>
  );
};

export default TodoList;