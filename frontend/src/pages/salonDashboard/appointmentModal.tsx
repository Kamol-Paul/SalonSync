import { useEffect } from "react";
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useState } from "react";
import { baseUrl } from "../../utils/constants";
import IconButton from "../../components/iconButton/IconButton";
import { GiConfirmed } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";


export default function AppointmentModal({ id }: { id: string }) {
    let [appointment, setAppointment] = useState<any>({});
    let [barbers, setBarbers] = useState<any>([]);
    let [appointmentPayload, setAppointmentPayload] = useState<any>({
        id: loadFromLocalStorage("id"),
        appointmentRequestAcceptance: {
            barberId: "",
            date: "",
        }
    });
    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });


    useEffect(() => {
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
                setBarbers(data?.barbers);
            });

        fetch(`${baseUrl}/api/appointment/one/{id}?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAppointment(data);
            });
    }, []);

    const confirmAppointment = () => {
        // validation
        if (!appointmentPayload.appointmentRequestAcceptance.barberId) {
            setAlertBox({
                isError: true,
                message: "Please select a barber"
            });
            return;
        }
        if (!appointmentPayload.appointmentRequestAcceptance.date) {
            setAlertBox({
                isError: true,
                message: "Please select a date"
            });
            return;
        }

        fetch(`${baseUrl}/api/appointment/confirm/{id}?id=${loadFromLocalStorage("id")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
            body: JSON.stringify(appointmentPayload),
        })
            .then((res) => {
                return res.json().then((data) => {
                    return {
                        status: res.status,
                        data: data
                    };
                });
            })
            .then((data) => {
                if (data.status !== 200) {
                    setAlertBox({
                        isError: true,
                        message: "Something went wrong"
                    });
                    return;
                }
                setAlertBox({
                    isError: false,
                    message: "Appointment confirmed"
                });
            });
    }

    return (
        <>
            <div>
                <div className="mt-3">
                    <h2 className="font-semibold">
                        Customer Info
                    </h2>
                    Username: {appointment.userName} <br />
                    Address: {appointment?.userAddress ? appointment?.userAddress : "N/A"} <br />
                    Contact: {appointment?.userContact} <br />

                    <h2 className="font-semibold mt-2">
                        Service Info
                    </h2>
                    Service Requested: {appointment.serviceName} <br />
                    Requested On: {appointment.requestedOn} <br />

                    <div className="mt-2">
                        <h2 className="font-semibold">
                            Assign Barber:
                        </h2>
                        <select className="block w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                            onChange={(e) => {
                                setAppointmentPayload({
                                    ...appointmentPayload,
                                    appointmentRequestAcceptance: {
                                        ...appointmentPayload.appointmentRequestAcceptance,
                                        barberId: e.target.value
                                    }
                                });
                            }}
                        >
                            <option selected disabled>--- Select ---</option>
                            {
                                barbers.map((barber: any) => (
                                    <option value={barber.id}>{barber.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <h2 className="font-semibold mt-2">
                        Schedule:
                    </h2>
                    <input type="datetime-local" name="" id="" className="my-2 block w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm"
                        onChange={(e) => {
                            setAppointmentPayload({
                                ...appointmentPayload,
                                appointmentRequestAcceptance: {
                                    ...appointmentPayload.appointmentRequestAcceptance,
                                    date: new Date(e.target.value).toISOString()
                                }
                            });
                        }}
                    />
                </div>

                {
                    alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                        {alert.message}
                    </div>
                }

                <IconButton
                    className="bg-green-600 hover:bg-green-700 focus:ring-green-300"
                    icon={<GiConfirmed className="font-bold text-[1.2rem] ml-1" />}
                    text="Approve"
                    callback={confirmAppointment}
                    direction="left"
                />
                <IconButton
                    className="bg-red-500 hover:bg-red-700 focus:ring-red-300"
                    icon={<RxCrossCircled className="font-bold text-[1.4rem] ml-1" />}
                    text="Reject"
                    callback={() => {
                    }}
                    direction="left"
                />
            </div>
        </>
    );
}