import { createContext, useContext, useState } from "react";
import { registerUser } from "../services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError({ email: "Please enter a valid email (e.g., example@gmail.com)" });
            return;
        }

        setLoading(true);

        try {
            const newUser = await registerUser(formData);
            setUser(newUser);
            setFormData({ username: "", email: "", password: "" });
            return newUser;
        } catch (err) {
            const fieldErrors = {};
            if (err.message.includes("Username")) fieldErrors.username = err.message;
            else if (err.message.includes("Email")) fieldErrors.email = err.message;
            else if (err.message.includes("Password")) fieldErrors.password = err.message;
            else fieldErrors.general = err.message;

            setError(fieldErrors);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                formData,
                handleChange,
                handleSubmit,
                user,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}