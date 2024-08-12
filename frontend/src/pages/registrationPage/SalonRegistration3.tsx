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
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";

export function SalonRegistration3({ setPage }: { setPage: any }) {
  return (
    <div className="relative">
      <div className="flex flex-col w-[20rem] space-y-4">
        <h1 className="font-bold">
          Select Hairstyle and price:
        </h1>

        <Swiper
          className="w-[20rem] h-full"
          grabCursor={true}
          slidesPerView={3}

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
            callback={() => { setPage(1) }}
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
      </div>

      <div className="flex flex-row w-full space-x-1 bottom-0 absolute">
        <IconButton
          className="basis-1/2"
          icon={<FaArrowAltCircleLeft size={20} />}
          text="Back"
          callback={() => { setPage(2) }}
          direction="right"
        />
        <IconButton
          className="basis-1/2"
          icon={<IoAddCircleOutline size={20} />}
          text="Register"
          callback={() => { }}
        />
      </div>
    </div>
  );
}