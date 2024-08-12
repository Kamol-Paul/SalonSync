import IconButton from "../../components/iconButton/IconButton";
import customerReg from "../../assets/customerReg.svg";
import { FaArrowAltCircleRight } from "react-icons/fa";



export default function RegistrationCutomer() {

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
                            type="text"
                            placeholder="Enter your name"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            placeholder="Enter your address"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border border-black outline-none p-2 rounded-md mb-4"
                        />

                        <IconButton
                            icon={<FaArrowAltCircleRight />}
                            text="Register"
                            callback={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


