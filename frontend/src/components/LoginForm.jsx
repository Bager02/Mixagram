import Input from "./Input.jsx";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "password", type: "password", placeholder: "Password" },
];

function LoginForm({ onSuccess }) {
    const { loginFormData, handleChangeLogin, handleSubmitLogin, loading, error } = useAuth();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (e) => {
        try {
            const loggedInUser = await handleSubmitLogin(e);

            if (loggedInUser) 
                setSuccess(true);
                onSuccess?.(); 
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
        </form>
    );
}

export default LoginForm;