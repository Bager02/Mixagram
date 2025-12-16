import { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser, getCurrentUser } from "../services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [registerFormData, setRegisterFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [loadingAuth, setLoadingAuth] = useState(true);
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) setUser(currentUser);
            } catch (err) {
                console.error(err);
            } //finally {
                //setLoadingAuth(false); 
            //}
        };
        fetchUser();
    }, []);

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setRegisterFormData(prev => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setLoginFormData(prev => ({ ...prev, [name]: value }));
        setError(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setError({});

        if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
            setError({ email: "Please enter a valid email (e.g., example@gmail.com)" });
            return;
        };

        setLoading(true);

        try {
            const newUser = await registerUser(registerFormData);
            setUser(newUser);
            setRegisterFormData({ username: "", email: "", password: "" });
            return newUser;
        } catch (err) {
            const fieldErrors = {};
            if (err.message.includes("Username")) fieldErrors.username = err.message;
            else if (err.message.includes("Email")) fieldErrors.email = err.message;
            else if (err.message.includes("Password")) fieldErrors.password = err.message;
            else fieldErrors.general = err.message;

            //and from the backend authController the error var is processed to determine which error occured

            setError(fieldErrors);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setError({});
        setLoading(true);

        try {
            const loggedUser = await loginUser(loginFormData);
            setUser(loggedUser);
            setLoginFormData({ username: "", password: "" });
        } catch (err) {
            if (err.message.includes("Incorrect password") || err.message.includes("User not found")) {
                setError({ general: "Username or password is incorrect" });
            } else {
                setError({ general: err.message });
            }
            //not as many errors for login as only possible error is invalid credetials NEEDS TO CHANGE        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loginFormData,
                registerFormData,
                handleChangeRegister,
                handleSubmitRegister,
                handleSubmitLogin,
                handleChangeLogin,
                user,
                loading,
                //loadingAuth,
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