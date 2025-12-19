import Input from "./Input.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "password", type: "password", placeholder: "Password" },
];

function LoginForm({ onSuccess }) {
    const { loginFormData, handleChangeLogin, handleSubmitLogin, clearAuthError, loading, error } = useAuth();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        clearAuthError();
    }, []);

    const onSubmit = async (e) => {
        try {
            const loggedInUser = await handleSubmitLogin(e);

            if (loggedInUser) {
                setSuccess(true);
                onSuccess?.();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>

            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <Input
                        key={field.name}
                        {...field}
                        value={loginFormData?.[field.name] || ""}
                        onChange={handleChangeLogin}
                    />
                    {error?.[field.name] && <p className="error">{error[field.name]}</p>}
                </div>
            ))}

            {error?.general && <p className="error">{error.general}</p>}

            {success && <p className="success">Successfully logged in!</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <div className="auth-redirect">
                <span>Don’t have an account?</span>
                <Link to="/register" className="auth-link">
                    Sign up
                </Link>
            </div>
            <div className="contact-link-container">
                <span>Need help?</span>
                <Link to="/contact" className="contact-page-link">
                    Contact us
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;