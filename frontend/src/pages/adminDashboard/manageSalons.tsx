import { useEffect } from "react";
import { loadFromLocalStorage } from "../../utils/localStorage";
import { baseUrl } from "../../utils/constants";
import { useState } from "react";



export default function ManageSalons() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        console.log(loadFromLocalStorage("token"));
        fetch(`${baseUrl}/api/admin/get_all_salon`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAppointments(data);
            }).catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Manage Salons
            </h1>
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-gray-600">
                                    {appointments.length !== 0 ? "Active Salons" : "No Salons registered"}
                                </h3>
                            </div>
                        </div>

                    </div>
                    <div className="block w-full overflow-x-auto">
                        {
                            appointments.length !== 0 &&
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Address
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Average Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appointments.map((appointment: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                        {appointment?.name}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {appointment?.address}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {appointment?.averageServicesPrices}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
