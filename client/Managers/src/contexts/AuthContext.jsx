import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cookies, setCookies, removeCookies] = useCookies(['token'])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cookies.token) {
            const authUser = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/managers/auth`,
                        {
                            headers: {
                                Authorization: `Bearer ${cookies.token}`
                            }
                        });
                    const data = await response.data;

                    console.log(data);

                    if (!data.success) {
                        removeCookies('token');
                        throw new Error(`${data.message} : ${data.error}`);
                    }
                    setUser(data.user);
                    setIsAuthenticated(true);
                } catch (error) {
                    setIsAuthenticated(false);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
            authUser();
        }
    }, [cookies]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/managers/login`,
                { email, password }
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(`${data.message} : ${data.error}`);
            }
            setUser(data.user);
            setIsAuthenticated(true);
            setCookies("token", data.token, { path: "/", maxAge: 10800 });

            return {
                success: true,
                message: data.message
            };

        } catch (error) {
            return {
                success: false,
                message: error.response.data.message,
            };
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/managers/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            const data = response.data;

            if (!data.success) {
                throw new Error(`${data.message} : ${data.error}`);
            }

            setIsAuthenticated(false);
            setUser(null);
            removeCookies("token");

            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        error,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


const AuthContextObj = {
    AuthProvider,
    AuthContext
};

export default AuthContextObj;