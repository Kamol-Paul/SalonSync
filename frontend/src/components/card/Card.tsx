import IconButton from "../iconButton/IconButton";
import { FaSearch } from "react-icons/fa";

export default function Card({ image, price, title }: { image: string, price: number, title: string }) {
    return (
        <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-3 mb-3">
            <div className="h-40 w-40 bg-cover bg-center" style={{
                backgroundImage: `url(${image})`
            }}></div>
            <span className="font-bold">
                {title}
            </span>
            <span>
                Average Price: ৳{price} Taka
            </span>
            <IconButton direction="right" icon={<FaSearch />} text="Visit" callback={() => { }} />
        </div>
    );
}