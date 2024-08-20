import { IoAddCircle } from "react-icons/io5";
import IconButton from "../../components/iconButton/IconButton";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/constants";
import { loadFromLocalStorage } from "../../utils/localStorage";

export default function BarberInfo() {
    let [barberList, setBarberList] = useState<any[]>([]);
    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });

    let [barberName, setBarberName] = useState("");
    let [barberSkill, setBarberSkill] = useState("");
    let [barberAvailability, setBarberAvailability] = useState<string[]>([]);

    useEffect(() => {
        getBarberList();
    }, []);

    const getBarberList = () => {
        fetch(`${baseUrl}/api/salon/one/{id}?id=${loadFromLocalStorage("id")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setBarberList(data["barbers"]);
            });
    };

    const addBarber = () => {
        if (!barberName || !barberSkill || barberAvailability.length === 0) {
            setAlertBox({
                isError: true,
                message: "All fields are required"
            });
            return;
        }

        fetch(`${baseUrl}/api/salon/add_barber`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
            body: JSON.stringify({
                name: barberName,
                skill: barberSkill,
                availability: barberAvailability,
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    setAlertBox({
                        isError: true,
                        message: "Failed to add barber"
                    });
                    return;
                }
            })
            .then(() => {
                setAlertBox({
                    isError: false,
                    message: "Barber added successfully"
                });
                getBarberList();
            });
    }


    return (
        <>
            {/* Barber Info */}
            <div className="flex flex-col mx-auto w-[30rem] space-y-4 my-10">
                <h1 className="font-bold">
                    Barber Information
                </h1>

                <input
                    onChange={(e) => setBarberName(e.target.value)}
                    value={barberName}
                    type="text"
                    placeholder="Enter barber name"
                    className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <select className="border border-black outline-none p-2 rounded-md mb-4" onChange={(e) => setBarberSkill(e.target.value)}>
                    <option value="" selected disabled>Barber Skill</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                </select>

                <h1 className="font-bold">
                    Barber Availalibity:
                </h1>

                <div className="flex flex-row space-x-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                        <div onClick={
                            () => {
                                if (barberAvailability.includes(day)) {
                                    setBarberAvailability(barberAvailability.filter((item) => item !== day));
                                } else {
                                    setBarberAvailability([...barberAvailability, day]);
                                }
                            }
                        } key={index} className={`px-3 select-none block rounded-md ${barberAvailability.includes(day) ? `bg-black font-bold` : `bg-[#3b5997]`} text-white p-1 text-[0.8rem] cursor-pointer`}>
                            {day.slice(0, 3)}
                        </div>
                    ))}
                </div>
                <div></div>
                <IconButton
                    icon={<IoAddCircle size={20} />}
                    text="Add Barber"
                    callback={addBarber}
                    direction="right"
                />
                <div></div>
                {
                    alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                        {alert.message}
                    </div>
                }
            </div>


            {/* Available Barbers Table */}
            {
                barberList.length === 0 ? <div className="text-center text-red-500 font-bold">
                    No barbers available
                </div>
                    :
                    <div className="flex flex-col mx-auto w-[30rem] space-y-4 my-10">
                        <h1 className="font-bold">
                            Available Barbers
                        </h1>
                        <table className="w-full border border-black">
                            <thead>
                                <tr>
                                    <th className="border border-black">Name</th>
                                    <th className="border border-black">Skill</th>
                                    <th className="border border-black">Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barberList.map((barber, index) => (
                                    <tr key={index}>
                                        <td className="border border-black px-2">{barber?.name}</td>
                                        <td className="border border-black px-2" >{barber?.skill}</td>
                                        <td className="border border-black px-2">{barber?.availability.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </>
    );
}