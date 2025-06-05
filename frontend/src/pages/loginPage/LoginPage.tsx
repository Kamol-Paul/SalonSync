import IconButton from "../../components/iconButton/IconButton";
import bg from '../../assets/logRegBG.svg';
import customerReg from "../../assets/customerReg.svg"; // This image seems to be for registration, consider changing if a login specific one is available
import LoginImg from "../../assets/login.png";
import { RiLoginCircleLine } from "react-icons/ri";
import { useState } from "react";
import { baseUrl } from "../../utils/constants";
import { storeInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function LoginPage() { // Renamed component to LoginPage for clarity
    const navigate = useNavigate();

    let [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });

    const onSubmit = () => {
        console.log(formData);

        setAlertBox({
            isError: false,
            message: "Please wait..."
        });

        // check if all fields are filled
        if (
            !formData.username ||
            !formData.password
        ) {
            setAlertBox({
                isError: true,
                message: "All fields are required"
            });
            return;
        }

        if (formData.password.length < 6) {
            setAlertBox({
                isError: true,
                message: "Password should be of atleast 6 characters"
            });
            return;
        }

        fetch(`${baseUrl}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (res.status === 400) {
                    res.text().then((errorMessage) => {
                        setAlertBox({
                            isError: true,
                            message: errorMessage
                        });
                    });
                    return;
                }

                return res.json().then((data) => {
                    return {
                        status: res.status,
                        data: data
                    };
                });
            })
            .then((data) => {
                if (data && data.status !== 200) {
                    setAlertBox({
                        isError: true,
                        message: "Invalid username or password"
                    });
                    return;
                }
                console.log(data);
                setAlertBox({
                    isError: false,
                    message: "Redirecting..."
                });
                if (data && data.data) {
                    storeInLocalStorage("token", data.data.token);

                    let role = data.data.roles.length ? data.data.roles[0] : "ROLE_CUSTOMER";
                    storeInLocalStorage("role", role);

                    storeInLocalStorage("id", data.data?.id);

                    if (role === "ROLE_CUSTOMER") {
                        navigate("/customer-dashboard");
                        return;
                    }
                    else if (role === "ROLE_SALON") {
                        navigate("/salon-dashboard");
                        return;
                    }
                    else if (role === "ROLE_ADMIN") {
                        navigate("/admin-dashboard");
                        return;
                    }
                }
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4"> {/* Outer container for centering */}
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="absolute inset-0 h-full w-full z-[-1]"> {/* Ensure bg covers screen and is behind content */}
            </div>

            <div className="bg-white dark:bg-brand-gray/80 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl m-auto max-w-4xl w-[90%]">
                <h1 className="font-heading text-3xl sm:text-4xl text-brand-blue dark:text-white mb-8 sm:mb-10 text-center">
                    Login
                </h1>

                <div className="flex flex-col sm:flex-row sm:space-x-10 justify-around">
                    <div className="w-full sm:w-1/2 p-4 items-center justify-center hidden sm:flex">
                        <img
                            className="h-auto max-h-[20rem] w-auto bg-transparent rounded-xl"
                            src={customerReg} // Consider using a more generic or login-specific image
                            alt="Login Visual" />
                    </div>

                    <div className="hidden sm:block border-r border-brand-gray/30 dark:border-brand-gray/60 mx-4"></div>

                    <div className="w-full sm:w-1/2 p-4 flex flex-col justify-center">
                        <img src={LoginImg} alt="Login Icon" className="w-32 sm:w-44 mx-auto mb-6" /> {/* Adjusted size and margin */}

                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter your username"
                            className="font-sans w-full p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-6"
                        />

                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value });
                            }}
                            type="password"
                            placeholder="Enter your password"
                            className="font-sans w-full p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-6"
                        />

                        {
                            alert.message && <div className={`text-center text-sm rounded-lg p-3 mb-4 font-sans ${alert.isError ? 'bg-red-100 dark:bg-red-500/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-500/30 border border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300'}`}>
                                {alert.message}
                            </div>
                        }
                        <div className="w-full">
                            <IconButton
                                icon={<RiLoginCircleLine />}
                                text="Login"
                                callback={onSubmit}
                                className="w-full justify-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}