import NavigationBar from "../../components/navigationMenu/NavigationMenu";
import { RiLoginCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
// import bg from '../../assets/logRegBG.svg'; // Background image removed from content area
import { useNavigate } from "react-router-dom";
import { removeFromLocalStorage } from "../../utils/localStorage";
import ManageSalons from "./manageSalons";
import ManageCustomer from "./manageCustomer";
import { BsShop } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import AdminAppointments from "./appoinments";

export function MainDashboard() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // logout
        if (pageIndex == 3) {
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
                            title: "Manage Salons",
                            icon: <BsShop className="w-6 h-6" />,
                        },
                        {
                            title: "Manage Customers",
                            icon: <IoPeopleCircleOutline className="w-6 h-6" />,
                        },
                        {
                            title: "Appointments",
                            icon: <RiLoginCircleLine className="w-6 h-6" />, // Consider a more appropriate icon
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
                                <ManageSalons /> :
                                pageIndex == 1 ?
                                    <ManageCustomer /> :
                                    pageIndex == 2 ?
                                        <AdminAppointments /> :
                                        <></> // Handles logout case
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}