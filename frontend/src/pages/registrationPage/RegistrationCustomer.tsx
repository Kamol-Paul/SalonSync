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
                Customer Registration
            </h1>
            <div className="flex flex-row space-x-10 justify-around">
                <div className="flex flex-col w-[20rem]">
                    <img
                        className="h-[25rem] bg-white rounded-xl w-[20rem] bg-opacity-50"
                        src={customerReg}
                        alt="Salon Registration" />
                </div>

                <div className="border border-black"></div>

                <div>
                    <div className="flex flex-col w-[20rem]">
                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter your name"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, address: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter your address"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, phoneNumber: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter your phone number"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter your email"
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

                        {/* warning div */}
                        {
                            alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                                {alert.message}
                            </div>
                        }

                        <IconButton
                            icon={<FaArrowAltCircleRight />}
                            text="Register"
                            callback={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


