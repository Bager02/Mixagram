import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <LoginForm onSuccess={() => navigate("/", { replace: true })} />
    </div>
  );
}

export default LoginPage;