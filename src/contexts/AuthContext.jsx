import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";


const AuthContext = createContext()
export const UseAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [errorMessage, setErrorMessage] = useState()
    const [warningMessage, setWarningMessage] = useState()

    
    const [successMessage, setSuccessMessage] = useState()
    const navigate = useNavigate()
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const apiUrl = import.meta.env.VITE_apiUrl;
    const signUpUrl = `${apiUrl}/auth/signup`
    const loginUrl = `${apiUrl}/auth/login`

    useEffect(() => {
        const tempToken = localStorage.getItem("token")
        setToken(tempToken);

        const tempUser = JSON.parse(localStorage.getItem("user"));
        setUser(tempUser);

    }, [])


    // REGISTER USER
    const registerUser = async (formData) => {
        const { role } = formData

        try {
            const response = await axios.post(`${signUpUrl}/${role}`, formData);

            const data = response.data;
            console.log(data.status)

            if (data.status == "Success") {
                setSuccessMessage(data.message)

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user))

                setTimeout(() => {
                    navigate("/dashboard")
                    window.location.reload();
                }, [2000])
            }

        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message)
        }

    }


    // LOGIN USER
    const loginUser = async (formData) => {

        const loginLoader = document.querySelector(".loginSpinner")
        loginLoader.classList.remove("d-none")

        const loginBtn = document.querySelector(".loginBtn")

        try {
            loginBtn.disabled = true;
            const response = await axios.post(loginUrl, formData)
            const data = response.data
            setSuccessMessage(data.message)

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))

            setTimeout(() => {
                navigate("/dashboard")
                window.location.reload();
            }, [2000])

        } catch (error) {
            console.log(error.response.data.message)
            setErrorMessage(error.response.data.message)
        }
        finally {
            loginBtn.disabled = false;
            loginLoader.classList.add("d-none")
        }
    }

    // logout
    const logout = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${apiUrl}/auth/logout`, { token })
            localStorage.clear()
            setToken(null)
            setUser({})
            navigate("/")

            // window.location.reload();


        } catch (error) {
            console.log(error);
        } finally {

            setIsLoading(false)
        }
    }

    // update user
    const updateUser = async (role, formData, userId) => {
        // console.log(formData)
        setIsLoading(true)
        try {

            const response = await axios.patch(`${apiUrl}/${role}/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })

            localStorage.setItem("user", JSON.stringify(response.data.user))
            const user = JSON.parse(localStorage.getItem("user"))
            setUser(user)


        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }





    const value = {
        user,
        registerUser,
        token,
        loginUser,
        logout,
        updateUser,
        isLoading,
        errorMessage,
        setErrorMessage,
        setSuccessMessage,
        successMessage,
        warningMessage,
        setWarningMessage
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthProvider