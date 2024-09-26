import IconButton from "../iconButton/IconButton";
import { FaSearch } from "react-icons/fa";

export default function Card({ image, price, title, callback }: { image: string, price: number, title: string, callback: () => void }) {
    return (
        <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-2 mb-2">
            <div className="h-40 w-40 bg-cover bg-center rounded-md" style={{
                backgroundImage: `url(${image ? image : "https://placehold.co/150x150?text=Information+not+updated"})`
            }}></div>
            <span className="font-bold mt-2">
                {title}
            </span>
            <span className="text-xs mt-1">
                Average Price: <br />
                ৳{price} Taka
            </span>
            <IconButton direction="right" icon={<FaSearch />} text="Visit" callback={callback} disabled={
                image ? false : true
            }/>
        </div>
    );
}