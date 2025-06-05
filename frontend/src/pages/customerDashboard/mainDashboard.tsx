import NavigationBar from "../../components/navigationMenu/NavigationMenu";
import { RiLoginCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import ExploreSalons from "./ExploreSalons";
// import bg from '../../assets/logRegBG.svg'; // Background image removed from content area
import { useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { removeFromLocalStorage } from "../../utils/localStorage";
import { MdOutlineReviews } from "react-icons/md";
import { MyReviews } from "./myReviews";
import { History } from "./history";

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
                            title: "Explore Salons",
                            icon: <MdOutlineExplore className="w-6 h-6" />,
                        },
                        {
                            title: "History",
                            icon: <RiLoginCircleLine className="w-6 h-6" />, // Consider a more appropriate icon for History
                        },
                        {
                            title: "My Reviews",
                            icon: <MdOutlineReviews className="w-6 h-6" />,
                        },
                        {
                            title: "Logout",
                            icon: <RiLoginCircleLine className="w-6 h-6" />, // Consider a more appropriate icon for Logout
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
                                <ExploreSalons /> :
                                pageIndex == 1 ?
                                    <History /> :
                                    pageIndex == 2 ?
                                        <MyReviews /> :
                                        <></> // Handles logout case, which navigates away
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}