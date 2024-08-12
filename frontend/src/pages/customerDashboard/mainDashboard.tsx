import Header from "../../components/header/Header";
import NavigationBar from "../../components/navigationMenu/NavigationMenu";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import ExploreSalons from "./ExploreSalons";
import bg from '../../assets/logRegBG.svg';

export default function MainDashboard() {
    const [pageIndex, setPageIndex] = useState(0);

    return (
        <>
            <Header />
            <div className="relative w-[80vw] m-auto">
                <div className="flex flex-row space-x-4">
                    <NavigationBar
                        navMenuContents={[
                            {
                                title: "Explore Salons",
                                icon: <FaArrowAltCircleRight className="w-6 h-6" />,
                            },
                            {
                                title: "History",
                                icon: <RiLoginCircleLine className="w-6 h-6" />,
                            },
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
                        <div className="glass-bg h-full overflow-y-scroll" style={{
                            backgroundColor: "#aac1ff21"
                        }}>
                            {
                                pageIndex == 0 ?
                                    <ExploreSalons /> :
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