import Input from "./Input.jsx";
import "../css/RegisterLoginForm.css";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from 'react-router-dom';

const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

function RegisterForm() {
    const { registerFormData, handleChangeRegister, handleSubmitRegister, clearAuthError, loading, error } = useAuth();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        clearAuthError();
    }, []);

    const onSubmit = async (e) => {
        try {
            const newUser = await handleSubmitRegister(e);
            if (newUser) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>

            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <Input
                        key={field.name}
                        {...field}
                        value={registerFormData?.[field.name] || ""}
                        onChange={handleChangeRegister}
                    />
                    {error?.[field.name] && <p className="error">{error[field.name]}</p>}
                </div>
            ))}

            {error?.general && <p className="error">{error.general}</p>}

            {success && <p className="success">Successfully registered!</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
            <div className="auth-redirect">
                <span>Already have an account?</span>
                <Link to="/login" className="auth-link">
                    Log in
                </Link>
            </div>
        </form>
    );
}

export default RegisterForm;