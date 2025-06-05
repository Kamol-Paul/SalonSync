import IconButton from "../../components/iconButton/IconButton";
import bg from '../../assets/logRegBG.svg';
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
        <div className="overflow-hidden min-h-screen flex flex-col items-center justify-center p-4"> {/* Ensure full height and centering */}
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="absolute inset-0 h-full w-full z-[-1]"> {/* BG Layer */}
            </div>

            {/* Selection Container */}
            <div className={`flex items-center justify-center w-full transition-all duration-700 ${page !== "" ? "opacity-0 pointer-events-none absolute -top-[100%]" : "opacity-100 relative"}`}>
                <div className="bg-white dark:bg-brand-gray/80 backdrop-blur-md p-8 sm:p-10 rounded-xl shadow-2xl m-auto max-w-3xl w-[90%]">
                    <h1 className="font-heading text-3xl sm:text-4xl text-brand-blue dark:text-white mb-8 sm:mb-10 text-center">
                        Register
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:space-x-10 space-y-6 sm:space-y-0 items-center justify-center">
                        <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-brand-gray/70 transition-colors">
                            <img className="h-[10rem] sm:h-[12rem] mb-4" src={salon} alt="Salon Registration" />
                            <IconButton icon={<FaShop size={20} className="mr-2 sm:mr-4" />} text="Register your Salon" callback={() => { setPage("salon") }} className="w-full sm:w-auto justify-center" />
                        </div>
                        <div className="hidden sm:block border-r border-brand-gray/30 dark:border-brand-gray/60 mx-4 h-48 self-center"></div>
                        <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-brand-gray/70 transition-colors">
                            <img className="h-[10rem] sm:h-[12rem] mb-4" src={customer} alt="Customer Registration" />
                            <IconButton icon={<IoPerson size={20} className="mr-2 sm:mr-4" />} text="Register as Customer" callback={() => { setPage("customer") }} className="w-full sm:w-auto justify-center" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Registration Form Container */}
            <div className={`w-full transition-all duration-700 absolute ${page === "customer" ? "opacity-100 z-10" : "opacity-0 pointer-events-none -top-[100%]"}`}>
                {page === "customer" && <RegistrationCutomer />}
            </div>

            {/* Salon Registration Form Container */}
            <div className={`w-full transition-all duration-700 absolute ${page === "salon" ? "opacity-100 z-10" : "opacity-0 pointer-events-none -top-[100%]"}`}>
                {page === "salon" && <SalonRegistration />}
            </div>
        </div>);
}