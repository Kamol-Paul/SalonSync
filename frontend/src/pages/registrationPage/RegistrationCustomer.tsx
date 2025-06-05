import IconButton from "../../components/iconButton/IconButton";
import customerReg from "../../assets/customerReg.svg";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { storeInLocalStorage } from "../../utils/localStorage";
import { baseUrl } from "../../utils/constants";
import { useState } from "react";

export default function RegistrationCutomer() {
    // const navigate = useNavigate();

    let [formData, setFormData] = useState({
        username: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        roles: []
    });

    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });

    const onSubmit = () => {
        setAlertBox({
            isError: false,
            message: "Please wait..."
        });

        // check if all fields are filled
        if (
            !formData.username ||
            !formData.address ||
            !formData.phoneNumber ||
            !formData.email ||
            !formData.password
        ) {
            setAlertBox({
                isError: true,
                message: "All fields are required"
            });
            return;
        }

        if (formData.phoneNumber.length !== 11) {
            setAlertBox({
                isError: true,
                message: "Phone number should be of 11 digits"
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

        fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                return res.json().then((data) => {
                    return {
                        status: res.status,
                        data: data
                    };
                });
            })
            .then((data) => {
                if (data.status !== 200) {
                    setAlertBox({
                        isError: true,
                        message: data.data.message
                    });
                    return;
                }
                console.log(data);
                setAlertBox({
                    isError: false,
                    message: "Verification email sent. Please verify your email."
                });
                // storeInLocalStorage("customer-token", data["key"]);
                // navigate("/doctor");
            });
    };

    return (
        <div className="bg-white dark:bg-brand-gray/80 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl m-auto max-w-4xl w-[90%]">
            <h1 className="font-heading text-3xl sm:text-4xl text-brand-blue dark:text-white mb-8 sm:mb-10 text-center">
                Customer Registration
            </h1>
            <div className="flex flex-col sm:flex-row sm:space-x-10 justify-around">
                <div className="w-full sm:w-1/2 p-4 items-center justify-center hidden sm:flex">
                    <img
                        className="h-auto max-h-[20rem] w-auto bg-transparent rounded-xl"
                        src={customerReg}
                        alt="Customer Registration Visual" />
                </div>

                <div className="hidden sm:block border-r border-brand-gray/30 dark:border-brand-gray/60 mx-4"></div>

                <div className="w-full sm:w-1/2 p-4 flex flex-col justify-center">
                    <input
                        onChange={(e) => {
                            setFormData({ ...formData, username: e.target.value });
                        }}
                        type="text"
                        placeholder="Enter your name"
                        className="font-sans w-full p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-6"
                    />

                    <input
                        onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                        }}
                        type="text"
                        placeholder="Enter your address"
                        className="font-sans w-full p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-6"
                    />

                    <input
                        onChange={(e) => {
                            setFormData({ ...formData, phoneNumber: e.target.value });
                        }}
                        type="text"
                        placeholder="Enter your phone number"
                        className="font-sans w-full p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-6"
                    />

                    <input
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                        }}
                        type="text"
                        placeholder="Enter your email"
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

                    {/* warning div */}
                    {
                        alert.message && <div className={`text-center text-sm rounded-lg p-3 mb-4 font-sans ${alert.isError ? 'bg-red-100 dark:bg-red-500/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-500/30 border border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300'}`}>
                            {alert.message}
                        </div>
                    }
                    <div className="w-full">
                        <IconButton
                            icon={<FaArrowAltCircleRight />}
                            text="Register"
                            callback={onSubmit}
                            className="w-full justify-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


