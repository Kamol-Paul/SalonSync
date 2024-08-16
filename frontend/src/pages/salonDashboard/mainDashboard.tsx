import Header from "../../components/header/Header";
import NavigationBar from "../../components/navigationMenu/NavigationMenu";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import bg from '../../assets/logRegBG.svg';
import { useNavigate } from "react-router-dom";
import { removeFromLocalStorage } from "../../utils/localStorage";

export function MainDashboard() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        // logout
        if (pageIndex == 3) {
            removeFromLocalStorage("token");
            removeFromLocalStorage("role");
            navigate("/");
        }
    }, [pageIndex]);

    return (
        <>
            <Header />
            <div className="relative w-[80vw] m-auto">
                <div className="flex flex-row space-x-4">
                    <NavigationBar
                        navMenuContents={[
                            {
                                title: "Salone Info",
                                icon: <FaArrowAltCircleRight className="w-6 h-6" />,
                            },
                            {
                                title: "Appointments",
                                icon: <RiLoginCircleLine className="w-6 h-6" />,
                            },
                            {
                                title: "History",
                                icon: <RiLoginCircleLine className="w-6 h-6" />,
                            },
                            {
                                title: "Logout",
                                icon: <RiLoginCircleLine className="w-6 h-6" />,
                            }
                        ]}
                        setIndex={setPageIndex}
                        index={pageIndex}
                    />
                    <div className="h-[86vh] flex-grow border-[#272727a2] border-2 rounded-xl relative mt-4" style={{
                        background: `url(${bg})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center"
                    }}>
                        {/* Container */}
                        <div className="glass-bg h-full overflow-y-scroll no-scrollbar" style={{
                            backgroundColor: "#aac1ff21"
                        }}>
                            {
                                pageIndex == 0 ?
                                    < > </> :
                                    pageIndex == 1 ?
                                        <></> : <></>
                            }
                        </div>
                    </div>

                </div>
            </div >
        </>

    );
}