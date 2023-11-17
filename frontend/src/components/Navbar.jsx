import { Box, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth?.userInfo?.name);

  const handleLogoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} w="100%" p={4}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="2xl">Task Tracker</Text>
        <Text fontSize={"xl"}>
          Welcome {userName} 😊
          <Button colorScheme="blue" ml={5} onClick={handleLogoutUser}>
            Logout
          </Button>
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
