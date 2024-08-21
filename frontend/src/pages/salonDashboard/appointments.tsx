import { useEffect } from "react"
import { baseUrl } from "../../utils/constants";
import { loadFromLocalStorage } from "../../utils/localStorage";

export default function SalonAppointments() {

    useEffect(() => {
        fetch(`${baseUrl}/api/appointment/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });

    }, []);

    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Appointments
            </h1>
        </div>
    )
}
