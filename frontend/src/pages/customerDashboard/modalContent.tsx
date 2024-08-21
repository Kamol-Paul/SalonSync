import { loadFromLocalStorage } from "../../utils/localStorage";
import { baseUrl } from "../../utils/constants";
import IconButton from "../../components/iconButton/IconButton";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import WebcamDemo from "./webcamDemo";

export default function ModalContent({ salon }: { salon: any }) {

    let [selectedService, setSelectedService] = useState("");
    let [faceDetection, setFaceDetection] = useState(false);
    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });

    const setAppointment = (serviceId: string) => {
        fetch(`${baseUrl}/api/appointment/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
            body: JSON.stringify({
                "salonId": salon?.id,
                "serviceId": serviceId,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setAlertBox({
                        isError: false,
                        message: "Appointment Request Sent!"
                    });
                } else {
                    setAlertBox({
                        isError: true,
                        message: "Appointment Failed!"
                    });
                }
            });

    };

    return (
        <div className="p-6">
            {
                faceDetection ?
                    <WebcamDemo /> :
                    <div className="border border-black w-[6.5rem] p-2 rounded-md cursor-pointer" onClick={() => {
                        setFaceDetection(true);
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4.5 4a.75.75 0 01-.75-.75V.75a.75.75 0 011.5 0v2.5A.75.75 0 014.5 4z"></path>
                            <path d="M5.75 2.75h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 010 1.5zM22 6.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 011.5 0v2.5a.75.75 0 01-.75.75z"></path>
                            <path d="M23.25 5.25h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 010 1.5zm-1 10a.75.75 0 01-.613-.318l-2.5-3.55A3.36 3.36 0 0016.4 9.96a3.36 3.36 0 00-1.799.524c-1.541.988-3.657.991-5.206-.002a3.339 3.339 0 00-4.532.9l-2.5 3.55A.748.748 0 011 14.5c0-1.354.127-2.982.377-4.84a7.729 7.729 0 011.618-3.759.749.749 0 111.171.937 6.235 6.235 0 00-1.303 3.025 47.913 47.913 0 00-.237 2.089l1.011-1.435a4.834 4.834 0 016.566-1.301c1.067.685 2.528.684 3.592.001A4.88 4.88 0 0116.4 8.46c1.57 0 3.051.769 3.962 2.057l1.023 1.453a25.473 25.473 0 00-.42-2.838.75.75 0 011.469-.305c.376 1.812.566 3.72.566 5.673a.75.75 0 01-.75.75zM8.459 4.53a.75.75 0 01-.074-1.496c.226-.023.44-.034.665-.034h2.57a6.928 6.928 0 002.971-.659A7.024 7.024 0 0017.016.497c.369-.382.827-.546 1.29-.488.463.057.865.324 1.103.733l.341.619a.75.75 0 11-1.318.716l-.326-.593c-.734.921-1.75 1.695-2.88 2.216-1.126.53-2.341.8-3.606.8H9.05c-.174 0-.34.009-.515.026a.656.656 0 01-.076.004z"></path>
                            <path d="M14.221 24H9.779a8.38 8.38 0 01-5.751-2.274 8.36 8.36 0 01-2.495-4.486l-.519-2.593a.749.749 0 111.47-.294l.519 2.593a6.87 6.87 0 002.05 3.685A6.888 6.888 0 009.779 22.5h4.442c1.762 0 3.44-.664 4.726-1.869a6.869 6.869 0 002.049-3.685l.519-2.593a.75.75 0 011.47.294l-.519 2.593a8.365 8.365 0 01-2.494 4.486A8.38 8.38 0 0114.221 24z"></path>
                            <circle cx="7.5" cy="14.5" r="1.5"></circle>
                            <circle cx="16.5" cy="14.5" r="1.5"></circle>
                            <path d="M12 20.992c-.931 0-1.862-.394-2.749-1.182a.75.75 0 11.997-1.121c1.211 1.077 2.292 1.077 3.503 0a.75.75 0 11.997 1.121c-.886.788-1.817 1.182-2.748 1.182z"></path>
                        </svg>
                        <p className=" mt-2 text-[0.4rem] text-justify" style={{ "lineHeight": "8px" }}>
                            Get automatic haircut suggestions based on your face shape
                        </p>
                    </div>
            }


            <h1 className="font-semibold mt-8">Select Service:</h1>
            {/* select option */}
            <select className="block w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer" onChange={
                (e) => {
                    setSelectedService(e.target.value);
                }
            }>
                <option className="text-gray-700" selected disabled>
                    --- Select Service ---
                </option>
                {salon?.servicesList.map((service: any) => (
                    <option key={service.id} value={service.id} className="text-gray-700">
                        {service.name} ({service.cost} BDT)
                    </option>
                ))}
            </select>

            {
                alert.message && <div className={`mt-5 text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                    {alert.message}
                </div>
            }

            <IconButton
                className="w-full"
                direction="right"
                icon={<FaCheckCircle />}
                text="Pay and Confirm Appointment"
                callback={() => {
                    setAppointment(selectedService);
                }}
            />


        </div>
    );
}