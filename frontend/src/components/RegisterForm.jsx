import Input from "./Input.jsx";
import "../css/RegisterForm.css";
import { useAuth } from "../contexts/AuthContext.jsx";

const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

function RegisterForm() {
    const { formData, handleChange, handleSubmit, loading, user, error } = useAuth();

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <Input
                        key={field.name}
                        {...field}
                        value={formData?.[field.name] || ""}
                        onChange={handleChange}
                    />
                    {error?.[field.name] && <p className="error">{error[field.name]}</p>}
                </div>
            ))}

            {error?.general && <p className="error">{error.general}</p>}

            {user && <p className="success">Successfully registered!</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default RegisterForm;