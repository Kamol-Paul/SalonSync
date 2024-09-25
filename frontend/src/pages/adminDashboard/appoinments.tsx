import { useEffect } from "react"
import { baseUrl } from "../../utils/constants";
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
// import { useDispatch } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";

export default function AdminAppointments() {
    let [appointments, setAppointments] = useState<any[]>([]);
    let [filter, setFilter] = useState<string>("new-posted");
    // let dispatch = useDispatch();

    useEffect(() => {
        fetch(`${baseUrl}/api/appointment/all-admin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let filteredData: any[] = [];
                data.map((appointment: any) => {
                    if (appointment.status === filter) {
                        filteredData.push(appointment);
                    }
                })
                setAppointments(filteredData);
            });

    }, [filter]);

    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Appointments
            </h1>

            {/* table of appointments */}


            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-gray-600">
                                    Recent Appointments
                                </h3>
                            </div>
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1 space-x-0 text-right">
                                <div className="flex flex-row space-x-2">
                                    <IconButton
                                        className="scale-75 mt-0 border-none"
                                        icon={""}
                                        text="Requested"
                                        callback={() => {
                                            setFilter("new-posted");
                                        }}
                                        direction="right"
                                    />
                                    <IconButton
                                        className="scale-75 mt-0 border-none"
                                        icon={""}
                                        text="Approved"
                                        callback={() => {
                                            setFilter("accept-waiting-for-call");
                                        }}
                                        direction="right"
                                    />
                                    <IconButton
                                        className="scale-75 mt-0 border-none"
                                        icon={""}
                                        text="Rejected"
                                        callback={() => {
                                            setFilter("rejected");
                                        }}
                                        direction="right"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Customer Location
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Status
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.length > 0 ?
                                        appointments.map((appointment, index) => (
                                            <tr key={index}>
                                                <th className="float-left">
                                                    {/* {appointment?.userName} */}
                                                    <IconButton
                                                        className="scale-75 mt-[6px] ml-[1rem]"
                                                        direction="right"
                                                        icon={<FaLocationDot />}
                                                        text="Visit"
                                                        callback={() => {
                                                            window.open(`https://www.google.com/maps?q=${appointment?.latitude},${appointment?.longitude}`);
                                                        }}
                                                    />
                                                </th>
                                                {/* <td className="border border-[#d18d32]">{appointment.date}</td> */}
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {appointment?.status}
                                                </td>

                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan={4} className="font-bold mx-auto text-center py-8 text-gray-600">
                                                Empty
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


// {
//     "id": "66c5fc6fd48f0c19290d1cfc",
//     "userId": "66bf5b207ee4590e0f2a89fc",
//     "salonId": "66bf5b5d7ee4590e0f2a89fd",
//     "serviceId": null,
//     "barberId": null,
//     "status": "new-posted",
//     "time": null,
//     "serviceName": "Spa Service",
//     "userName": "tanimsk",
//     "salonName": "My Tanim Salon"
// },