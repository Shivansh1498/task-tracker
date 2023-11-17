import {
  Box,
  Button,
  Center,
  Container,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync, getAllTodoAsync } from "../store/slices/todos/todoSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const userTodos = useSelector((state) => state.todo?.todos);
  const userTodosLoadingState = useSelector((state) => state.auth?.loading);

  const handleTodoInputChange = (e) => {
    const { name, value } = e.target;
    setTodoInfo({ ...todoInfo, [name]: value });
  };

  const handleTodoInfoReset = () => {
    setTodoInfo({ title: "", description: "" });
  };

  const handleAddTodos = () => {
    dispatch(addTodoAsync(todoInfo));
  };

  useEffect(() => {
    dispatch(getAllTodoAsync());
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <VStack>
        <Container mt={10}>
          <Center>
            <Text fontSize="3xl">TODO LIST</Text>
          </Center>
          <Box mt={5}>
            <Input
              placeholder="Enter Title"
              mb={3}
              value={todoInfo.title}
              name="title"
              onChange={handleTodoInputChange}
            />
            <Input
              placeholder="Enter Description"
              value={todoInfo.description}
              name="description"
              onChange={handleTodoInputChange}
            />
          </Box>
          <Box mt={3}>
            <Button colorScheme="gray" mr={3} onClick={handleTodoInfoReset}>
              Reset
            </Button>
            <Button
              loadingText="Adding Todo..."
              isLoading={userTodosLoadingState}
              colorScheme="blue"
              onClick={handleAddTodos}
            >
              Add Todo
            </Button>
          </Box>
        </Container>
      </VStack>
      <SimpleGrid columns={4} spacing={5} mt={"50px"} mx={"70px"} mb={10}>
        {userTodos?.length > 0 ? (
          userTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
            />
          ))
        ) : (
          <Text fontSize={"large"}>No todos to display...</Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default HomePage;
