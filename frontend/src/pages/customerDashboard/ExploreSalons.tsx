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


export default function ExploreSalons() {

    const [salons, setSalons] = useState([]);
    const allServices = hairstyles.concat(otherServices);

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

    useEffect(() => {
        fetch(`${baseUrl}/api/salon/all`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setSalons(data);
            });
    }, []);


    const SalonIndividual = ({ salonId }: { salonId: number }) => {
        fetch(`${baseUrl}/api/salon/one/{id}?id=${salonId}`)
            .then((res) => res.json())
            .then((data) => {
                setSalon({
                    hasData: true,
                    ...data,
                });
            });
    };

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
                                    <Card image={salon.image} title={salon.name} price={120} callback={() => {
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

                        <div className="flex flex-row w-full space-x-10 mt-8">
                            <div className="w-1/2">
                                <img src={salon?.image} alt="Salon Image" className="rounded-lg" />
                            </div>
                            <div className="w-5/12">
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

                                <div className="flex flex-row">
                                    <IconButton
                                        className="basis-10/12"
                                        direction="right"
                                        icon={<FaCheckCircle />}
                                        text="Set an Appointment"
                                        callback={() => {

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
                                            {/* <IconButton direction="right" icon={<FaSearch />} text="Visit" callback={callback} /> */}
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

                    </>
            }
        </div>
    );
}
// {
//     "id": "66bf5b5d7ee4590e0f2a89fd",
//     "owner": {
//       "id": "66bf5b5d7ee4590e0f2a89fd",
//       "username": "tanimsk_salon",
//       "email": "sktanim5800+salon@gmail.com",
//       "password": null,
//       "phoneNumber": "11760001377",
//       "address": null,
//       "enable": true,
//       "verificationCode": null,
//       "resetPasswordToken": null,
//       "roles": [
//         {
//           "id": "66bceaa90da3dc633c82042e",
//           "name": "ROLE_SALON"
//         }
//       ]
//     },
//     "image": "https://i.ibb.co/vBf06qq/cff65c9a3139.jpg",
//     "name": "My Tanim Salon",
//     "address": "Rajshahi",
//     "servicesList": [
//       {
//         "id": "66c3a991485b974dbca15379",
//         "name": "Special Service",
//         "cost": 230,
//         "image": null
//       },
//       {
//         "id": "66c3a992485b974dbca1537a",
//         "name": "Side-Sweep Edge",
//         "cost": 120,
//         "image": null
//       },
//       {
//         "id": "66c3a992485b974dbca1537b",
//         "name": "Spa Service",
//         "cost": 200,
//         "image": null
//       },
//       {
//         "id": "66c3a992485b974dbca1537c",
//         "name": "Skin Care",
//         "cost": 100,
//         "image": null
//       }
//     ],
//     "averageServicesPrices": 0,
//     "barbers": [
//       {
//         "id": "66c37fa9dffff84d3069c9df",
//         "name": "Tanim",
//         "skill": null,
//         "availability": [
//           "Wednesday",
//           "Tuesday"
//         ]
//       },
//       {
//         "id": "66c38f0b485b974dbca15378",
//         "name": "Tanim Sk Barber",
//         "skill": "Intermediate",
//         "availability": [
//           "Monday",
//           "Thursday",
//           "Friday",
//           "Sunday",
//           "Wednesday",
//           "Tuesday",
//           "Saturday"
//         ]
//       }
//     ]
//   }