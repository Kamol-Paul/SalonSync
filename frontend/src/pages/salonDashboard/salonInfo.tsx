import { useEffect, useState } from "react";
import imgUpload from "../../assets/imgUpload.png";
import { baseUrl } from "../../utils/constants";

// Service info
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img1 from "../../assets/hairstyles/1.jpg";
import img2 from "../../assets/hairstyles/2.jpg";
import img3 from "../../assets/hairstyles/3.jpg";
import img4 from "../../assets/hairstyles/4.jpg";
import img5 from "../../assets/hairstyles/5.jpg";
import img6 from "../../assets/hairstyles/6.jpg";
import img7 from "../../assets/hairstyles/7.jpg";
import img8 from "../../assets/hairstyles/8.jpg";
import IconButton from "../../components/iconButton/IconButton";
import { IoAddCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { loadFromLocalStorage } from "../../utils/localStorage";

export default function SalonInfo() {
    const [image, setImage] = useState(
        <img src={imgUpload} alt="Upload image" className="w-24" />
    );

    interface SalonInfo {
        image: null | string;
        name: null | string;
        address: null | string;
        servicesList: never[];
        barbers: never[];
    }

    let [salonInfo, setSalonInfo] = useState<SalonInfo>({
        image: null,
        name: null,
        address: null,
        servicesList: [],
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
                setSalonInfo(data);
                if (data?.image !== null) {
                    setImage(<img src={data?.image} alt="Salon Image" className="w-full h-full" />);
                }
            });
    }, []);

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

                    <Swiper
                        className="w-[30rem] h-full"
                        grabCursor={true}
                        slidesPerView={4}

                        spaceBetween={150}
                        pagination={{ clickable: true }}
                        modules={[EffectCreative, Pagination]}

                    >
                        <SwiperSlide>
                            <div style={{
                                background: `url(${img1})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>

                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img2})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img3})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img4})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img5})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img6})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img7})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div style={{
                                background: `url(${img8})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"

                            }} className='w-[10rem] h-[10rem] border border-black bg-contain'></div>
                        </SwiperSlide>

                        <SwiperSlide>

                        </SwiperSlide>
                    </Swiper>

                    <div className="flex flex-row w-full space-x-4">
                        <input
                            type="number"
                            placeholder="Price of selected hairstyle"
                            className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                        />
                        <IconButton
                            className="basis-1/2"
                            icon={<IoAddCircle size={20} />}
                            text="Add"
                            callback={() => { }}
                            direction="right"
                        />
                    </div>

                    {/* More Services */}
                    <input
                        type="number"
                        placeholder="Price of skin care treatment"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <input
                        type="number"
                        placeholder="Price of spa services"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <input
                        type="number"
                        placeholder="Price of special services"
                        className="border border-black outline-none p-2 rounded-md mt-[1rem] h-[2.2rem] placeholder:text-[.8rem] basis-1/2"
                    />

                    <IconButton
                        icon={<FaSave size={20} />}
                        text="Update Information"
                        callback={() => { }}
                        direction="right"
                    />
                </div>
            </div>
        </div>
    );
}