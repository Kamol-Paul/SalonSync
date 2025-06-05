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
                        <h1 className="font-heading text-2xl sm:text-3xl text-text-primary dark:text-slate-100 mb-6 text-center sm:text-left">
                            Explore Salons
                        </h1>
                        <div className="flex flex-row flex-wrap justify-start gap-4"> {/* Changed justify-between to justify-start and added gap */}
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
                        <h1 className="font-heading text-2xl sm:text-3xl text-text-primary dark:text-slate-100 mb-6 text-center sm:text-left">
                            Salon Information
                        </h1>

                        <div className="flex flex-col lg:flex-row w-full lg:space-x-10 mt-8"> {/* Adjusted space-x for lg only */}
                            <div className="w-full lg:w-1/2 min-w-[20rem]"> {/* Adjusted width for responsiveness */}
                                <img src={salon?.image} alt="Salon Image" className="rounded-lg shadow-lg" /> {/* Added shadow */}
                            </div>
                            <div className="w-full lg:w-5/12 max-lg:mt-10 min-w-[15rem]"> {/* Adjusted width for responsiveness */}
                                <h1 className="font-heading text-xl sm:text-2xl text-text-primary dark:text-slate-100 mb-4">{salon?.name}</h1>
                                <p className="font-sans text-sm text-text-secondary dark:text-slate-300 mb-1 flex items-center">
                                    <FaLocationDot className="text-brand-blue mr-2 flex-shrink-0" />
                                    {salon?.address}
                                </p>
                                <p className="font-sans text-sm text-text-secondary dark:text-slate-300 mb-1 flex items-center">
                                    <MdCall className="text-brand-blue mr-2 flex-shrink-0" />
                                    {salon?.owner?.phoneNumber}
                                </p>
                                <p className="font-sans text-sm text-text-secondary dark:text-slate-300 mb-1 flex items-center">
                                    <MdPeople className="text-brand-blue mr-2 flex-shrink-0" />
                                    Total Barbers: {pad(salon?.barbers.length, 2)}
                                </p>
                                <p className="font-sans text-sm text-text-secondary dark:text-slate-300 mb-1 flex items-center">
                                    <GrServicePlay className="text-brand-blue mr-2 flex-shrink-0" />
                                    Total Services Given: {pad(salon?.servicesList?.length, 2)}
                                </p>

                                <div className="flex flex-col sm:flex-row mt-6 space-y-3 sm:space-y-0 sm:space-x-3"> {/* Adjusted for responsiveness */}
                                    <IconButton
                                        className="flex-grow sm:flex-grow-0 sm:basis-auto" // Adjusted for responsiveness
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
                                        className="flex-grow sm:flex-grow-0 sm:basis-auto" // Adjusted for responsiveness
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
                            <h1 className="font-heading text-xl text-text-primary dark:text-slate-100 my-6">
                                Services Offered:
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {
                                    salon?.servicesList.map((service: any) =>
                                        <div key={service.id} className="bg-white dark:bg-brand-gray/80 rounded-lg shadow-md p-4" title={allServices.find((s) => s.name === service?.name)?.description}>
                                            <div className="h-32 sm:h-40 w-full bg-cover bg-center rounded-md mb-3" style={{
                                                backgroundImage: `url(${allServices.find((s) => s.name === service?.name)?.img || "https://placehold.co/150x150?text=Service"})` // Added placeholder
                                            }}></div>
                                            <h2 className="font-sans font-semibold text-text-primary dark:text-slate-200">
                                                {service?.name}
                                            </h2>
                                            <p className="font-sans text-xs text-text-secondary dark:text-slate-300 mt-1">
                                                Price: ৳{service?.cost} Taka
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Barber information section */}
                        <div>
                            <h1 className="font-heading text-xl text-text-primary dark:text-slate-100 my-6">
                                Barber Information:
                            </h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {
                                    salon?.barbers.length === 0 &&
                                    <p className="font-sans text-text-secondary dark:text-slate-300 col-span-full text-center">
                                        No barbers added yet.
                                    </p>
                                }
                                {
                                    salon?.barbers.map((barber: any) =>
                                        <div key={barber.id} className="bg-white dark:bg-brand-gray/80 rounded-lg shadow-md p-4">
                                            <h2 className="font-sans font-semibold text-text-primary dark:text-slate-200">
                                                {barber?.name}
                                            </h2>
                                            <p className="font-sans text-xs text-text-secondary dark:text-slate-300 mt-1">
                                                Skill: {barber?.skill || "Not Specified"}
                                            </p>
                                            <p className="font-sans text-xs text-text-secondary dark:text-slate-300 mt-2 mb-1">
                                                Availability:
                                            </p>
                                            <div className="flex flex-row flex-wrap gap-1">
                                                {
                                                    barber?.availability.map((day: string, index: number) =>
                                                        <span key={index} className="px-2 py-0.5 select-none rounded-full bg-brand-accent/20 text-brand-accent text-[0.65rem] font-medium">
                                                            {day.slice(0, 3)}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h1 className="font-heading text-xl text-text-primary dark:text-slate-100 my-6">
                                Reviews:
                            </h1>
                            <div className="overflow-x-auto pb-4"> {/* Added pb-4 for scrollbar visibility if needed */}
                                <div className="flex flex-row space-x-4">
                                    {
                                        reviews.length === 0 && !salon.hasData && /* Show only if salon data hasn't loaded or no reviews */
                                        <p className="font-sans text-text-secondary dark:text-slate-300 text-center w-full">
                                            No reviews yet for this salon.
                                        </p>
                                    }
                                    {
                                        reviews.length !== 0 &&
                                        reviews?.map((review: any) =>
                                            <div key={review.id} className="bg-white dark:bg-brand-gray/80 rounded-lg shadow-md p-4 min-w-[250px] sm:min-w-[300px] flex-shrink-0">
                                                <div className="flex items-center mb-2">
                                                    <IoPersonCircleSharp className="text-3xl text-text-secondary dark:text-slate-400 mr-2" />
                                                    <h3 className="font-sans font-semibold text-sm text-text-primary dark:text-slate-200">
                                                        {review?.customerName}
                                                    </h3>
                                                </div>
                                                <p className="font-sans text-xs text-text-secondary dark:text-slate-300 mb-1 italic">
                                                    "{review?.reviewText.length > 100 ? review?.reviewText.slice(0, 100) + "..." : review?.reviewText}"
                                                </p>
                                                <p className="font-sans text-[0.65rem] text-text-secondary/70 dark:text-slate-400/70 mt-2 text-right">
                                                    {new Date(
                                                        review?.date
                                                    ).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true, day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Write a review section */}
                        <div>
                            { reviews.length === 0 && salon.hasData && /* Show only if salon data has loaded and no reviews */
                                <p className="font-sans text-text-secondary dark:text-slate-300 text-center w-full my-4">
                                    Be the first to review this salon!
                                </p>
                            }
                            <h1 className="font-heading text-xl text-text-primary dark:text-slate-100 my-6 flex items-center">
                                <FaUserPen className="mr-3" /> Write a review:
                            </h1>
                            <div className="bg-white dark:bg-brand-gray/80 rounded-lg shadow-md p-4 sm:p-6">
                                <textarea
                                    className="font-sans w-full h-24 p-3 border rounded-lg bg-slate-50 dark:bg-brand-gray/70 border-brand-gray/30 dark:border-brand-gray/60 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-text-secondary/70 dark:placeholder:text-slate-400 text-text-primary dark:text-slate-100 mb-4"
                                    placeholder="Share your experience..."
                                    value={review}
                                    onChange={(e) => { setReview(e.target.value); }}
                                />
                                {
                                    alert.message && <div className={`text-center text-sm rounded-lg p-3 mb-4 font-sans ${alert.isError ? 'bg-red-100 dark:bg-red-500/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-500/30 border border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300'}`}>
                                        {alert.message}
                                    </div>
                                }
                                <IconButton callback={writeReview} className="w-full sm:w-auto justify-center" direction="left" icon={<FaUserPen className="ml-2" />} text="Submit Review" />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}