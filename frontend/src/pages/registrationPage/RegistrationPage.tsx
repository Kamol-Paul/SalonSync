import Header from "../../components/header/Header";
import IconButton from "../../components/iconButton/IconButton";
import bg from '../../assets/logRegBG.svg'
import salon from '../../assets/salon.svg';
import customer from '../../assets/booking.svg';
import { IoPerson } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { useState } from "react";

import RegistrationCutomer from "./RegistrationCustomer";
import { SalonRegistration } from "./SalonRegistration";

export default function RegistrationPage() {
    const [page, setPage] = useState("");

    return (
        <div className="overflow-hidden h-screen">
            <Header></Header>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="absolute top-0 h-screen w-screen">
            </div>


            <div className={`flex h-[80vh] relative ${page !== "" ? "top-[-40rem]" : "top-[0rem]"} duration-700 transition-all`}>
                <div className="m-auto">
                    {/* Card */}
                    <div className='rounded-sm glass-bg p-6 max-w-[960px] m-auto border border-black' style={{
                        backgroundColor: "rgb(87 112 182 / 32%)"
                    }}>
                        <h1 className="text-[#d18d32] text-[2rem] font-bold mb-10" style={{
                            textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black"
                        }}>
                            Register
                        </h1>
                        <div className="flex flex-row space-x-10">
                            <div className="flex flex-col">
                                <img className="h-[16rem]" src={salon} alt="Salon Registration" />
                                <IconButton icon={<FaShop size={20} className="mr-4" />} text="Register your Salon" callback={() => { setPage("salon") }} />
                            </div>
                            <div className="border border-black"></div>
                            <div className="flex flex-col">
                                <img className="h-[16rem]" src={customer} alt="Salon Registration" />
                                <IconButton icon={<IoPerson size={20} className="mr-4" />} text="Register as customer" callback={() => { setPage("customer") }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={`relative ${page === "customer" ? "flex h-[80vh] top-[-38rem]" : "top-[100rem]"} duration-700 transition-all`}>
                <RegistrationCutomer />
            </div>

            <div className={`relative ${page === "salon" ? "flex h-[80vh] top-[-71rem]" : "top-[100rem]"} duration-700 transition-all`}>
                <SalonRegistration />
            </div>
        </div>);
}