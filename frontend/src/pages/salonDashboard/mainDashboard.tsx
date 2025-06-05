import NavigationBar from "../../components/navigationMenu/NavigationMenu";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
// import bg from '../../assets/logRegBG.svg'; // Background image removed from content area
import { useNavigate } from "react-router-dom";
import { removeFromLocalStorage } from "../../utils/localStorage";
import SalonInfo from "./salonInfo";
import BarberInfo from "./barberInfo";
import SalonAppointments from "./appointments";
import { MdInsertComment } from "react-icons/md";
import { PiCallBellBold } from "react-icons/pi";
import { RiInformation2Line } from "react-icons/ri";
import { Reviews } from "./reviews";



export function MainDashboard() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // logout
        if (pageIndex == 4) { // Assuming 4 is the logout index
            removeFromLocalStorage("token");
            removeFromLocalStorage("role");
            removeFromLocalStorage("id");
            navigate("/");
        }
    }, [pageIndex, navigate]); // Added navigate to dependency array

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-brand-gray/95">
            <div className="flex flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-x-4 sm:space-x-6">
                <NavigationBar
                    navMenuContents={[
                        {
                            title: "Salon Info",
                            icon: <FaArrowAltCircleRight className="w-6 h-6" />, // Consider a more appropriate icon
                        },
                        {
                            title: "Barber Info",
                            icon: <RiInformation2Line className="w-6 h-6" />,
                        },
                        {
                            title: "Appointments",
                            icon: <PiCallBellBold className="w-6 h-6" />,
                        },
                        {
                            title: "Reviews",
                            icon: <MdInsertComment className="w-6 h-6" />,
                        },
                        {
                            title: "Logout",
                            icon: <RiLoginCircleLine className="w-6 h-6" />, // Consider a more appropriate icon
                        }
                    ]}
                    setIndex={setPageIndex}
                    index={pageIndex}
                />
                <div className="flex-1 bg-white dark:bg-brand-gray p-4 sm:p-6 rounded-xl shadow-xl">
                    {/* Container */}
                    <div className="h-full overflow-y-auto no-scrollbar">
                        {
                            pageIndex == 0 ?
                                <SalonInfo /> :
                                pageIndex == 1 ?
                                    <BarberInfo /> :
                                    pageIndex == 2 ?
                                        <SalonAppointments /> :
                                        pageIndex == 3 ?
                                            <Reviews /> :
                                            <></> // Handles logout case
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}