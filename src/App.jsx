import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  IconButton,
  Stack,
  Image,
  Text
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useState } from "react";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter"; // Importo Filter
import Footer from './components/Footer'; // Importo el componente Footer
import logo from "./assets/imagenes/logo.png";
import videoLight from "./assets/videos/ligth.mp4";
import videoDark from "./assets/videos/dark.mp4";
import { getTasks, saveTasks } from "./utils/LocalStorage";

const App = () => {
  const [tasks, setTasks] = useState(getTasks());
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [backgroundVideo, setBackgroundVideo] = useState(videoLight); // Estado para el video de fondo

  // Cambiar el video de fondo al hacer clic en el ícono
  const handleToggleBackground = () => {
    setBackgroundVideo(prevVideo => (prevVideo === videoLight ? videoDark : videoLight));
  };

  // Manejo de tareas
  const handleAddTask = () => {
    const newTaskObj = { id: tasks.length, text: newTask, completed: false };
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setNewTask("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrar las tareas según el filtro seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <ChakraProvider>
      <Stack minHeight="100vh" position="relative">
        
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={-1}
        >
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        <Box ml={10} mr={10} p={1}>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
              mb={50}
            >
              {/* Botón de sol/luna para alternar entre videoLight y videoDark */}
              <IconButton
                icon={backgroundVideo === videoDark ? <SunIcon color={"black"}/> : <MoonIcon color={"black"} />}
                aria-label="Toggle background video"
                onClick={handleToggleBackground} // Llamar a la función que cambia el fondo
                display="flex"
                alignItems="center"
                backgroundColor="blue.100"
              />
            </Box>

            {/* Logo y encabezado */}
            <Stack
              height={100}
              direction="row"
              mb={20}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={logo}
                alt="Logo"          
                alignItems="center"
                sizes={{
                  base: '24px',
                  sm: '30px',
                  md: '40px',
                  lg: '50px',
                  xl: '70px',
                }}
              />
              <Heading
                fontSize={{
                  base: '24px',
                  sm: '30px',
                  md: '40px',
                  lg: '50px',
                  xl: '70px',
                }}
                fontFamily="'Lobster', sans-serif"
                textAlign="center"
                fontWeight={400}
                fontStyle="normal"
                color="blue.500"
                alignItems="center"
              >
                Mi lista de tareas
              </Heading>
            </Stack>

            {/* Campo de entrada y botón para agregar tarea */}
            <Stack direction="row" spacing={4} mb={4}>
              <Input
                name="newTask"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Ingresar nueva tarea"
                color="grey"
                fontSize="20px"
                fontFamily="'Lobster'"
                borderColor={"blue.500"}
                borderWidth="2px"          
                placeholderColor="black"  // Cambiar color del placeholder
                backgroundColor={"blue.100"}
                 />
              <IconButton
                icon={<AddIcon />}
                onClick={handleAddTask}
                isDisabled={!newTask}
                borderColor={"blue.500"}
                borderWidth="2px"
                color={"black"}
                backgroundColor={"blue.200"}
              />
            </Stack>

            {/* Pasa el estado del filtro y la función para cambiarlo */}
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            {/* Pasa las tareas filtradas a TodoList */}
            <TodoList tasks={filteredTasks} setTasks={setTasks} />
          </Box>
        </Box>
 
      </Stack>
      <Footer />
    </ChakraProvider>
  );
};

export default App;



