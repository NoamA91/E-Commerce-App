import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { Box } from "@chakra-ui/layout";

function Login({ logged }) {

  if (logged) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Box bgGradient="linear(to-b, blue.400, #c8e6c9)" w='100%'>
      <LoginForm />
    </Box>
  )
}

export default Login