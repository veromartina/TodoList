import { Select } from "@chakra-ui/react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <Select
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        mb={4}
        width={200}
        borderColor={"blue.500"}
        borderWidth="2px"
        fontSize="20px"
        fontFamily="'Lobster'"
        backgroundColor={"blue.100"}
        textColor={"grey"}
               
      >
        <option value="all">Todas las tareas</option>
        <option value="completed">Tareas completadas</option>
        <option value="pending">Tareas pendientes</option>
      </Select>
    </div>
  );
};

export default Filter;