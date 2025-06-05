import IconButton from "../iconButton/IconButton";
import { FaSearch } from "react-icons/fa";

export default function Card({ image, price, title, callback }: { image: string, price: number, title: string, callback: () => void }) {
    return (
        <div className="flex flex-col bg-white dark:bg-brand-gray/80 shadow-lg rounded-xl p-4 mt-2 mb-2 hover:shadow-xl transition-shadow duration-200">
            <div className="h-40 w-40 bg-cover bg-center rounded-md" style={{
                backgroundImage: `url(${image ? image : "https://placehold.co/150x150?text=Information+not+updated"})`
            }}></div>
            <span className="font-heading text-text-primary dark:text-slate-100 mt-2">
                {title}
            </span>
            <span className="font-sans text-xs text-text-secondary dark:text-slate-300 mt-1">
                Average Price: <br />
                ৳{price} Taka
            </span>
            <IconButton direction="right" icon={<FaSearch />} text="Visit" callback={callback} disabled={
                image ? false : true
            }/>
        </div>
    );
}