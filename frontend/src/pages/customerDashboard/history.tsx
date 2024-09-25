import { useEffect } from "react"
import { baseUrl } from "../../utils/constants"
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
import { FaLocationDot } from "react-icons/fa6";


export function History() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/appointment/all-customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        }).then((res) => res.json())
            .then((data) => {
                setReviews(data);
            }).catch((err) => {
                console.log(err);
            });

    }, []);


    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Appointment History
            </h1>

            <div className="mt-10">
                {
                    reviews.length === 0 ?
                        <h1 className="mt-20 text-center text-[#3b5a979e] font-bold text-[1.2rem]">
                            No Appointments Yet
                        </h1> :
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 opacity-90">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Appointment Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Time assigned
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {
                                    reviews.map((review: any) => (
                                        <tr className="hover:bg-gray-50">
                                            <th className="px-6 py-4 font-medium text-gray-900">{review?.status === "" ? "Invalid Appointment" : review?.status}</th>
                                            <th className="px-6 py-4 font-medium text-gray-900">{!review?.time ? "Not assigned" : review?.time}</th>
                                            <td className="px-6 py-4">
                                                <IconButton
                                                    className="basis-4/12"
                                                    direction="right"
                                                    icon={<FaLocationDot />}
                                                    text="Visit"
                                                    callback={() => {
                                                        window.open(`https://www.google.com/maps?q=${review?.latitude},${review?.longitude}`);
                                                    }}
                                                />

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>

        </div>
    )
}