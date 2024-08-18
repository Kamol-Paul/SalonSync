import { IoAddCircle } from "react-icons/io5";
import IconButton from "../../components/iconButton/IconButton";

export default function BarberInfo() {
    return (
        <>
            {/* Barber Info */}
            <div className="flex flex-col mx-auto w-[30rem] space-y-4 my-10">

                <h1 className="font-bold">
                    Barber Information
                </h1>

                <input
                    type="text"
                    placeholder="Enter barber name"
                    className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <select className="border border-black outline-none p-2 rounded-md mb-4">
                    <option value="" selected disabled>Barber Skill</option>
                    <option value="hairstyle1">Professional</option>
                    <option value="hairstyle2">Intermediate</option>
                    <option value="hairstyle3">Beginner</option>
                </select>

                <h1 className="font-bold">
                    Barber Availalibity:
                </h1>

                <div className="flex flex-row space-x-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                        <div key={index} className="block rounded-md bg-[#3b5997] text-white p-1 text-[0.8rem] cursor-pointer">
                            {day.slice(0, 3)}
                        </div>
                    ))}
                </div>
                <div></div>
                <IconButton

                    icon={<IoAddCircle size={20} />}
                    text="Add Barber"
                    callback={() => { }}
                    direction="right"
                />
            </div>
        </>
    );
}