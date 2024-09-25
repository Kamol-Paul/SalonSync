import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/constants";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { GrServicePlay } from "react-icons/gr";
import { pad } from "../../utils/utils";
import IconButton from "../../components/iconButton/IconButton";
import { hairstyles, otherServices } from "../../utils/constants";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import ModalContent from "./modalContent";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { loadFromLocalStorage } from "../../utils/localStorage";


export default function ExploreSalons() {
    const dispatch = useDispatch();
    const [salons, setSalons] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState("");
    const allServices = hairstyles.concat(otherServices);
    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });
    const [latlon, setLatLon] = useState({ lat: 0, lon: 0 });

    // salon Info
    interface Service {
        id: string;
        name: string;
        cost: number;
        image: string | null;
    }

    interface Barber {
        id: string;
        name: string;
        skill: string | null;
        availability: string[];
    }

    interface SalonOwner {
        id: string;
        username: string;
        email: string;
        password: string | null;
        phoneNumber: string;
        address: string | null;
        enable: boolean;
        verificationCode: string | null;
        resetPasswordToken: string | null;
        roles: {
            id: string;
            name: string;
        }[];
    }

    interface Salon {
        id: string;
        owner: SalonOwner;
        image: string;
        name: string;
        address: string;
        servicesList: Service[];
        averageServicesPrices: number;
        barbers: Barber[];
    }

    interface SalonExtended extends Salon {
        hasData: boolean;
    }

    const [salon, setSalon] = useState<SalonExtended>({
        hasData: false,
        id: "",
        owner: {
            id: "",
            username: "",
            email: "",
            password: null,
            phoneNumber: "",
            address: null,
            enable: false,
            verificationCode: null,
            resetPasswordToken: null,
            roles: []
        },
        image: "",
        name: "",
        address: "",
        servicesList: [],
        averageServicesPrices: 0,
        barbers: []
    });

    const getReveiews = (salonId: String): void => {
        fetch(`${baseUrl}/api/customer/get_review/{id}?id=${salonId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${loadFromLocalStorage("token")}`,
                }
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReviews(data);
            });
    }

    useEffect(() => {
        // set lat lon

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        function showPosition(position: any) {
            setLatLon({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });

            console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
        }


        fetch(`${baseUrl}/api/salon/all`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setSalons(data);
            });
    }, []);


    const SalonIndividual = ({ salonId }: { salonId: String }) => {
        fetch(`${baseUrl}/api/salon/one/{id}?id=${salonId}`)
            .then((res) => res.json())
            .then((data) => {
                setSalon({
                    hasData: true,
                    ...data,
                });
                getReveiews(salonId);
            });
    };

    const writeReview = () => {
        if (review === "") {
            setAlertBox({
                isError: true,
                message: "Review cannot be empty!"
            });
            return;
        }

        fetch(`${baseUrl}/api/customer/give_review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
            body: JSON.stringify({
                reviewText: review,
                salonId: salon.id,
                customerId: loadFromLocalStorage("id")
            })
        })
            .then((res) => res.json())
            .then((_data) => {
                setAlertBox({
                    isError: false,
                    message: "Review Submitted!"
                });
                setReview("");
                getReveiews(salon.id);
            });
    }

    return (
        <div>
            {
                !salon.hasData ?
                    <>
                        <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                            textShadow:
                                "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }} >
                            Explore Salons
                        </h1>
                        <div className="flex flex-row flex-wrap justify-between">
                            {
                                salons.map((salon: any) =>
                                    <Card image={salon.image} title={salon.name} price={salon?.averageServicesPrices === 0 || salon?.averageServicesPrices === null ? "N/A" : salon?.averageServicesPrices} callback={() => {
                                        SalonIndividual({ salonId: salon.id });
                                    }} />
                                )
                            }
                        </div>
                    </>
                    :
                    <>
                        <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                            textShadow:
                                "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }} >
                            Salon Information
                        </h1>

                        <div className="flex flex-col lg:flex-row w-full space-x-10 mt-8">
                            <div className="w-1/2 min-w-[20rem]">
                                <img src={salon?.image} alt="Salon Image" className="rounded-lg" />
                            </div>
                            <div className="w-5/12 max-lg:mt-10 min-w-[15rem]">
                                <h1 className="font-bold text-2xl mb-6">{salon?.name}</h1>
                                <p>
                                    <FaLocationDot className="inline text-[#3b5899] mr-2" />
                                    {salon?.address}
                                </p>
                                <p className="mt-1">
                                    <MdCall className="inline text-[#3b5899] mr-2" />
                                    {salon?.owner?.phoneNumber}
                                </p>
                                <p className="mt-1">
                                    <MdPeople className="inline text-[#3b5899] mr-2" />
                                    Total Barbers: {pad(salon?.barbers.length, 2)}
                                </p>
                                <p className="mt-1">
                                    <GrServicePlay className="inline text-[#3b5899] mr-2" />
                                    Total Services Given: {pad(salon?.servicesList?.length, 2)}
                                </p>

                                <div className="flex flex-col lg:flex-row">
                                    <IconButton
                                        className="basis-10/12"
                                        direction="right"
                                        icon={<FaCheckCircle />}
                                        text="Set an Appointment"
                                        callback={() => {
                                            dispatch({
                                                type: 'SHOW_MODAL', payload: {
                                                    title: "Set an Appointment",
                                                    body: <ModalContent salon={salon} latlon={latlon} />,
                                                }
                                            });
                                        }}
                                    />
                                    <IconButton
                                        className="basis-4/12"
                                        direction="right"
                                        icon={<FaLocationDot />}
                                        text="Visit"
                                        callback={() => {
                                            window.open(`https://www.google.com/maps/search/?api=1&query=${salon?.address}`);
                                        }}
                                    />
                                </div>


                            </div>
                        </div>

                        {/* Service offered section */}
                        <div>
                            <h1 className="font-bold text-2xl my-6">
                                Services Offered:
                            </h1>
                            <div className="flex flex-row flex-wrap justify-between">
                                {
                                    salon?.servicesList.map((service: any) =>
                                        <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-2 mb-2" title={allServices.find((s) => s.name === service?.name)?.description}>
                                            <div className="h-40 w-40 bg-cover bg-center rounded-md" style={{
                                                backgroundImage: `url(${allServices.find((s) => s.name === service?.name)?.img || ""
                                                    })`
                                            }}></div>
                                            <span className="font-bold mt-1">
                                                {service?.name}
                                            </span>
                                            <span className="text-xs mt-1">
                                                Service Price: ৳{service?.cost} Taka
                                            </span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Barber information section */}
                        <div>
                            <h1 className="font-bold text-2xl my-6">
                                Barber Information:
                            </h1>
                            <div className="flex flex-row flex-wrap">
                                {
                                    salon?.barbers.length === 0 &&
                                    <div className="text-[#3b5a979e] text-lg mt-2 font-bold">
                                        No barbers added yet
                                    </div>
                                }

                                {
                                    salon?.barbers.map((barber: any) =>
                                        <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-2 mb-2 w-40 mr-5">
                                            <span className="font-bold">
                                                {barber?.name}
                                            </span>
                                            <span className="text-xs mt-2">
                                                Skill Level: <br />
                                                <span className="font-semibold">
                                                    {barber?.skill || "Not Specified"}
                                                </span>
                                            </span>

                                            <span className="text-xs my-2">
                                                Availability: <br />
                                            </span>
                                            <div className="flex flex-row flex-wrap">
                                                {
                                                    barber?.availability.map((day: string, index: number) =>
                                                        <div key={index} className={`mr-1 px-1 select-none mb-2 block rounded-md bg-[#3b5997] text-white p-[0.1rem] text-[0.5rem] cursor-pointer`}>
                                                            {day.slice(0, 3)}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Reviews */}
                        {/* Barber information section */}
                        <div>
                            <h1 className="font-bold text-2xl my-6 ">
                                Reviews:
                            </h1>
                            <div className="overflow-x-scroll w-[50rem]">
                                <div className="flex flex-row">
                                    {
                                        reviews.length !== 0 &&
                                        reviews?.map((review: any) =>
                                            <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-2 mb-2 w-auto mr-5 relative">
                                                <span className="font-bold text-gray-500 text-[2rem] flex flex-row">
                                                    <IoPersonCircleSharp />
                                                    <span className="text-[0.8rem] text-black mt-1 ml-2">
                                                        {review?.customerName}
                                                    </span>
                                                </span>
                                                <span className="text-xs my-2">
                                                    {review?.reviewText.length > 50 ? review?.reviewText.slice(0, 50) + "..." : review?.reviewText}
                                                </span>

                                                <span className="text-gray-500 text-[0.5rem] absolute bottom-[0.4rem]">
                                                    {new Date(
                                                        review?.date
                                                    ).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true, day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div>
                            {
                                reviews.length === 0 &&
                                <div className="text-[#3b5a979e] text-lg mt-2 font-bold">
                                    No reviews
                                </div>
                            }
                            <h1 className="font-bold text-2xl my-6 flex flex-row">
                                <FaUserPen className="mt-[0.35rem] mr-3" /> Write a review:
                            </h1>
                            <div>
                                <div className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg w-full">
                                    <span className="font-bold text-gray-500 text-[2rem]">

                                    </span>
                                    <span className="text-xs my-2 w-full px-5">
                                        <textarea className="w-full h-24 p-2 rounded-md border-gray-400 border border-1 outline-none" placeholder="Write your review here..." value={
                                            review
                                        } onChange={(e) => {
                                            setReview(e.target.value);
                                        }} />
                                        {
                                            alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1 mt-3`}>
                                                {alert.message}
                                            </div>
                                        }
                                        <IconButton callback={writeReview} className="mt-2" direction="left" icon={<FaUserPen className="ml-2" />} text="Write a review" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}