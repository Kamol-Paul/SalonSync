import Header from "../../components/header/Header";
import IconButton from "../../components/iconButton/IconButton";
import bg from '../../assets/logRegBG.svg'
import customerReg from "../../assets/customerReg.svg";
import { RiLoginCircleLine } from "react-icons/ri";
import { useState } from "react";
import { baseUrl } from "../../utils/constants";
import { storeInLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
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
                        message: "Invalid username or password"
                    });
                    return;
                }
                console.log(data);
                setAlertBox({
                    isError: false,
                    message: "Verification email sent. Please verify your email."
                });
                storeInLocalStorage("customer-token", data.data.token);
                navigate("/customer-dashboard");
            });
    };


    return (
        <div className="">
            <Header></Header>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="absolute top-0 h-screen w-screen">
            </div>

            <div className="flex h-[80vh] relative top-[0rem]">
                <div
                    className="rounded-sm glass-bg p-6 m-auto border border-black max-w-[960px]"
                    style={{
                        backgroundColor: "rgb(87 112 182 / 32%)",
                    }}
                >
                    <h1
                        className="text-[#d18d32] text-[2rem] font-bold mb-10"
                        style={{
                            textShadow:
                                "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                    >
                        Login
                    </h1>

                    <div className="flex flex-row space-x-10 justify-around">
                        <div className="flex flex-col w-[20rem]">
                            <img
                                className="h-[25rem] bg-white rounded-xl w-[20rem] bg-opacity-50"
                                src={customerReg}
                                alt="Salon Registration" />
                        </div>

                        <div className="border border-black"></div>

                        <div className="flex">
                            <div className="flex flex-col w-[20rem] m-auto">
                                <input
                                    onChange={(e) => {
                                        setFormData({ ...formData, username: e.target.value });
                                    }}
                                    type="text"
                                    placeholder="Enter your username"
                                    className="border border-black outline-none p-2 rounded-md mb-4"
                                />

                                <input
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                    }}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="border border-black outline-none p-2 rounded-md mb-4"
                                />

                                {
                                    alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                                        {alert.message}
                                    </div>
                                }

                                <IconButton
                                    icon={<RiLoginCircleLine />}
                                    text="Login"
                                    callback={onSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>);
}