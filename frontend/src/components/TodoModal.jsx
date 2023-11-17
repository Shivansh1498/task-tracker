import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTodo,
  setUpdateValues,
  updateTodoAsync,
} from "../store/slices/todos/todoSlice";

const TodoModal = ({ isOpen, onOpen, onClose, todoId }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const todoUpdatedTitle = useRef("");
  const todoUpdatedDescription = useRef("");
  const dispatch = useDispatch();
  const todoInfo = useSelector((state) => state.todo?.singleTodo);
  let updatedTitle, updatedDescription;

  const handleOnOpen = () => {
    onOpen();
    dispatch(getSingleTodo(todoId));
  };

  const handleUpdatedTodos = () => {
    updatedTitle = ("title", todoUpdatedTitle.current?.value);
    updatedDescription = ("desc", todoUpdatedDescription.current?.value);
    dispatch(
      updateTodoAsync({
        title: updatedTitle,
        description: updatedDescription,
        todoId,
      })
    );
    onClose();
  };

  return (
    <>
      <IconButton
        colorScheme="yellow"
        aria-label="View full todo"
        icon={<EditIcon />}
        onClick={handleOnOpen}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todos</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter Title"
                name="title"
                ref={todoUpdatedTitle}
                defaultValue={todoInfo?.title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter Description"
                name="description"
                ref={todoUpdatedDescription}
                defaultValue={todoInfo?.description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdatedTodos}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoModal;
