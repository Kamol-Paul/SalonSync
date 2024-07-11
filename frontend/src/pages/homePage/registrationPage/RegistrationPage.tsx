import Header from "../../../components/header/Header";
import IconButton from "../../../components/iconButton/IconButton";
import bg from '../../../assets/logRegBG.svg'
import salon from '../../../assets/salon.svg';
import customer from '../../../assets/booking.svg';
import { IoPerson } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";

export default function RegistrationPage() {
    return (
        <div>
            <Header></Header>
            <div style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className="absolute top-0 h-screen w-screen">
            </div>

            <div className="flex h-[80vh] relative">
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
                                <IconButton icon={<FaShop size={20} className="mr-4" />} text="Register your Salon" callback={() => { }} />
                            </div>
                            <div className="border border-black"></div>
                            <div className="flex flex-col">
                                <img className="h-[16rem]" src={customer} alt="Salon Registration" />
                                <IconButton icon={<IoPerson size={20} className="mr-4" />} text="Register as customer" callback={() => { }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>);
}