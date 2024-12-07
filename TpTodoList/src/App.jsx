import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  IconButton,
  Stack,
  useColorMode,
  Image,
  Text
} from "@chakra-ui/react";
import { AddIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter"; // Importamos Filter
import { getTasks, saveTasks } from "./utils/LocalStorage";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState(getTasks());
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [backgroundVideo, setBackgroundVideo] = useState("./src/assets/videos/ligth.mp4"); // Estado para el video de fondo

  const { colorMode, toggleColorMode } = useColorMode("ligth");

  // Cambiar el video de fondo al hacer clic en el icono
  const handleToggleColorMode = () => {
    toggleColorMode();
    // Cambiar el video solo cuando se hace clic en el icono, sin importar el colorMode actual
    if (backgroundVideo === "./src/assets/videos/ligth.mp4") {
      setBackgroundVideo("./src/assets/videos/dark.mp4");
    } else if (backgroundVideo === "./src/assets/videos/dark.mp4") {
      setBackgroundVideo("./src/assets/videos/ligth.mp4");
    } 
  };

  // Manejo de tareas y filtro
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
              <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label="Toggle dark mode"
                onClick={handleToggleColorMode} // Llamar a la función que cambia el video
                display="flex"
                alignItems="center"
                backgroundColor="blue.100"
              />
            </Box>

            <Stack
              height={100}
              direction="row"
              mb={20}
              display="flex"
              justifyContent="flex-end"
              alignItems={"center"}
            >
              <Image
                src="./src/assets/logo.png"
                alt="Dan Abramov"
                width="1oopx"
                alignItems="center"
              />
              <Heading
                fontSize="60px"
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

            <Stack direction="row" spacing={4} mb={4}>
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Ingresar nueva tarea"
                textColor={"black"}
                fontSize="20px"
                fontFamily="'Lobster'"
                borderColor={"blue.500"}
                borderWidth="2px"
                backgroundColor={"blue.100"}
              />
              <IconButton
                icon={<AddIcon color="black.500" />}
                onClick={handleAddTask}
                isDisabled={!newTask}
                borderColor={"blue.500"}
                borderWidth="2px"
              />
            </Stack>

            {/* Pasa el estado del filtro y la función para cambiarlo */}
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            {/* Pasa las tareas filtradas a TodoList */}
            <TodoList tasks={filteredTasks} setTasks={setTasks} />
          </Box>
        </Box>
      </Stack>
      
        {/* Agrego footer */}
        <Box
          as="footer"
          position="relative"
          bottom="0"
          width="100%"
          py={4}
          textAlign="center"
          bg="gray.800"
          color="white"
        >
          <Text>© 2024 Martina Veronica Soledad. Todos los derechos reservados.</Text>
        </Box>
    </ChakraProvider>
  );
};

export default App;
