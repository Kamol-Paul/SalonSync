import { useEffect, useState } from "react";
import imgUpload from "../../assets/imgUpload.png";
import { baseUrl } from "../../utils/constants";
import { uploadToImgbb } from "../../utils/utils";

// Service info
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { hairstyles } from "../../utils/constants";
import IconButton from "../../components/iconButton/IconButton";
import { IoAddCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { loadFromLocalStorage } from "../../utils/localStorage";

export default function SalonInfo() {
    const [image, setImage] = useState(
        <img src={imgUpload} alt="Upload image" className="w-24" />
    );

    interface SalonInfo {
        image: string | null;
        name: string | null;
        address: string | null;
        servicesList: { name: string | undefined; cost: number | null }[];
        barbers: any[];
    };

    let [alert, setAlertBox] = useState({
        isError: false,
        message: ""
    });

    // Hair Styles
    let [hairstylePrice, setHairstylePrice] = useState<number>(0);
    let [hairstyleIndex, setHairstyleIndex] = useState<number>(-1);

    let [salonInfo, setSalonInfo] = useState<SalonInfo>({
        image: null,
        name: null,
        address: null,
        servicesList: [
            {
                name: "Skin Care",
                cost: null
            },
            {
                name: "Spa Service",
                cost: null
            },
            {
                name: "Special Service",
                cost: null
            },
        ],
        barbers: [],
    });

    useEffect(() => {
        // set headers
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
                if (data?.image !== null) {
                    setImage(<img src={data?.image} alt="Salon Image" className="w-full h-full" />);
                }

                // check skin care, spa service, special service are available or not in servicesList of data
                let servicesList = data.servicesList;
                if (!servicesList.find((service: { name: string; }) => service.name === "Skin Care")) {
                    servicesList.push({ name: "Skin Care", cost: null });
                }
                if (!servicesList.find((service: { name: string; }) => service.name === "Spa Service")) {
                    servicesList.push({ name: "Spa Service", cost: null });
                }
                if (!servicesList.find((service: { name: string; }) => service.name === "Special Service")) {
                    servicesList.push({ name: "Special Service", cost: null });
                }
                setSalonInfo(data);
            });
    }, []);


    const updateInfo = () => {
        // set headers
        fetch(`${baseUrl}/api/salon/update`, {
            method: "PUT",
            body: JSON.stringify({
                image: salonInfo.image,
                name: salonInfo.name,
                address: salonInfo.address,
                serviceRequestSet: salonInfo.servicesList
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loadFromLocalStorage("token")}`,
            },
        })
            .then((res) => {
                if (res.status !== 200) {
                    setAlertBox({
                        isError: true,
                        message: "Failed to update salon information"
                    });
                    return;
                }
                setAlertBox({
                    isError: false,
                    message: "Salon information updated successfully"
                });
            })

    }

    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Salon Information
            </h1>


            {/* Salon Info */}
            <div className="flex flex-row space-x-4 justify-center mt-[3rem]">
                <label className="relative mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    const imagePreview = event.target?.result;
                                    setImage(
                                        <img
                                            src={imagePreview as string}
                                            alt="Salon Image"
                                            className="w-full h-full" />
                                    );
                                    uploadToImgbb(imagePreview as string).then((url) => {
                                        if (url === "") return;
                                        setSalonInfo({ ...salonInfo, image: url });
                                    });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <div className="m-auto border-2 border-black w-36 h-32 bg-[#3c5997] flex items-center justify-center rounded-md cursor-pointer">
                        {image}
                    </div>
                </label>

                <div className="flex flex-col">
                    <input
                        onChange={(e) => {
                            setSalonInfo({ ...salonInfo, name: e.target.value });
                        }}
                        value={salonInfo?.name || ""}
                        type="text"
                        placeholder="Enter Your Salon Name"
                        className="border border-black outline-none p-2 rounded-md mb-4 w-[20rem]"
                    />
                    <textarea
                        onChange={(e) => {
                            setSalonInfo({ ...salonInfo, address: e.target.value });
                        }}
                        value={salonInfo?.address || ""}
                        placeholder="Enter Salon Address"
                        className="border border-black outline-none p-2 rounded-md w-[20rem]"
                    />
                </div>
            </div>


            {/* Service Info */}
            <div className="m-auto w-[30rem] my-10">
                <div className="flex flex-col w-[30rem] space-y-4">
                    <h1 className="font-bold">
                        Add Hairstyle and Other Services price:
                    </h1>

                    {/* Salon Info Services list table */}
                    {
                        // if all cost are null or 0 then show no services added
                        salonInfo.servicesList.every(service => service.cost === null || service.cost === 0) ?
                            <div className="text-center text-red-500 font-bold">
                                No Services Added
                            </div>
                            :
                            <div className="flex flex-col mx-auto w-[30rem] space-y-4 my-10">
                                <table className="w-full border border-black">
                                    <thead>
                                        <tr>
                                            <th className="border border-black">Service Name</th>
                                            <th className="border border-black">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salonInfo.servicesList.map((service, index) => {
                                            if (!(service?.cost === null || service?.cost === undefined || service?.cost === 0)) {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border border-black pl-4">{service.name}</td>
                                                        <td className="border border-black pl-4">{service.cost} BDT</td>
                                                    </tr>
                                                );
                                            }
                                            return null;

                                        })}
                                    </tbody>
                                </table>
                            </div>
                    }


                    <Swiper
                        className="w-[30rem] h-full"
                        grabCursor={true}
                        slidesPerView={4}

                        spaceBetween={150}
                        pagination={{ clickable: true }}
                        modules={[EffectCreative, Pagination]}

                    >

                        {
                            hairstyles.map((hairstyle, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        onClick={() => {
                                            setHairstyleIndex(hairstyle.id);
                                        }}
                                        style={{
                                            background: `url(${hairstyle.img})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "cover"
                                        }} className='w-[10rem] h-[10rem] border border-black bg-contain'>
                                        <div className={`bg-black bg-opacity-50 text-white text-center ${hairstyleIndex === hairstyle.id ? "h-full" : ""}`}>
                                            {hairstyle.name}
                                            {hairstyleIndex === hairstyle.id && <div className="text-2xl mt-10">Selected</div>}
                                        </div>
                                    </div>

                                </SwiperSlide>
                            ))
                        }

                        <SwiperSlide>
                        </SwiperSlide>
                    </Swiper>

                    <div className="flex flex-row w-full space-x-4">
                        <input
                            onChange={(e) => { setHairstylePrice(parseInt(e.target.value)) }}
                            value={hairstylePrice == 0 ? "" : hairstylePrice}
                            type="number"
                            placeholder="Price of selected hairstyle"
                            className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                        />
                        <IconButton
                            className="basis-1/2"
                            icon={<IoAddCircle size={20} />}
                            text="Add"
                            callback={() => {
                                if (hairstyleIndex === -1) {
                                    setAlertBox({
                                        isError: true,
                                        message: "Please select a hairstyle"
                                    });
                                    return;
                                }
                                if (hairstylePrice === 0) {
                                    setAlertBox({
                                        isError: true,
                                        message: "Please enter a price"
                                    });
                                    return;
                                }
                                // dont add hairstyle if already added
                                if (salonInfo.servicesList.find(service => service.name === hairstyles.find(hairstyle => hairstyle?.id === hairstyleIndex)?.name)) {
                                    setAlertBox({
                                        isError: true,
                                        message: "Hairstyle already added"
                                    });
                                    window.scrollTo(0, document.body.scrollHeight);
                                    return;
                                }
                                setSalonInfo({
                                    ...salonInfo,
                                    servicesList: [...salonInfo.servicesList, { name: hairstyles.find(hairstyle => hairstyle.id === hairstyleIndex)?.name, cost: hairstylePrice }]
                                });
                                setHairstyleIndex(-1);
                                setHairstylePrice(0);
                                setAlertBox({
                                    isError: false,
                                    message: ""
                                });
                            }}
                            direction="right"
                        />
                    </div>

                    {/* More Services */}
                    <input
                        onChange={(e) => {
                            setSalonInfo({
                                ...salonInfo,
                                servicesList: salonInfo.servicesList.map(service => service.name === "Skin Care" ? { name: service.name, cost: parseInt(e.target.value) } : service)
                            });
                            console.log(salonInfo);
                        }}
                        value={salonInfo.servicesList.find(service => service.name === "Skin Care")?.cost || ""}
                        type="number"
                        placeholder="Price of skin care treatment (BDT)"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <input
                        onChange={(e) => {
                            setSalonInfo({
                                ...salonInfo,
                                servicesList: salonInfo.servicesList.map(service => service.name === "Spa Service" ? { name: service.name, cost: parseInt(e.target.value) } : service)
                            });
                            console.log(salonInfo);
                        }}
                        value={salonInfo.servicesList.find(service => service.name === "Spa Service")?.cost || ""}
                        type="number"
                        placeholder="Price of spa services (BDT)"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <input
                        onChange={(e) => {
                            setSalonInfo({
                                ...salonInfo,
                                servicesList: salonInfo.servicesList.map(service => service.name === "Special Service" ? { name: service.name, cost: parseInt(e.target.value) } : service)
                            });
                            console.log(salonInfo);
                        }}
                        value={salonInfo.servicesList.find(service => service.name === "Special Service")?.cost || ""}
                        type="number"
                        placeholder="Price of special services (BDT)"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <IconButton
                        icon={<FaSave size={20} />}
                        text="Update Information"
                        callback={updateInfo}
                        direction="right"
                    />
                </div>
                {
                    alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1 mt-6`} ref={(el) => { if (el) el.scrollIntoView({ behavior: "smooth" }); }}>
                        {alert.message}
                    </div>
                }
            </div>
        </div>
    );
}