import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync } from "../store/slices/todos/todoSlice";
import TodoModal from "./TodoModal";

const TodoCard = ({ id, title, description }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteTodo = () => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <Card boxShadow={"lg"} borderRadius={5} height={"250px"}>
      <CardBody>
        <Heading noOfLines={1}>{title}</Heading>
        <Text mt={5} noOfLines={3}>
          {description}
        </Text>
      </CardBody>
      <CardFooter>
        <HStack spacing={3}>
          {/* <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<ViewIcon />}
          /> */}
          <TodoModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            todoId={id}
          />
          <IconButton
            colorScheme="red"
            aria-label="Search database"
            icon={<DeleteIcon />}
            onClick={handleDeleteTodo}
          />
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
