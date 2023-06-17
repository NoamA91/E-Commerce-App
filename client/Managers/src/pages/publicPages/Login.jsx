import { Navigate } from "react-router-dom";
import LoginForm from "../../components/partials/LoginForm";

function Login({ logged }) {

  if (logged) {
    return <Navigate to="/dashboard" />
  }

  return <LoginForm />
}

export default Login