import { useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
import imgUpload from "../../assets/imgUpload.png";
import salonReg from "../../assets/salonReg.svg";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { SalonRegistration2 } from "./SalonRegistration2";
import { SalonRegistration3 } from "./SalonRegistration3";


export function SalonRegistration() {
  const [page, setPage] = useState(1);

  const [image, setImage] = useState(
    <img src={imgUpload} alt="Upload image" className="w-24" />
  );


  return (
    <div
      className="rounded-sm glass-bg p-6 m-auto border border-black max-w-[960px]"
      style={{
        backgroundColor: "rgb(87 112 182 / 32%)",
      }}
    >
      <h1
        className="text-[#d18d32] text-[2rem] font-bold mb-10"
        style={{
          textShadow:
            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
        }}
      >
        Salon Registration
      </h1>
      <div className="flex flex-row space-x-10 justify-around">
        <div className="flex flex-col w-[20rem]">
          <img
            className="h-[30rem] bg-white rounded-xl w-[20rem] bg-opacity-50"
            src={salonReg}
            alt="Salon Registration" />
        </div>

        <div className="border border-black"></div>
        {
          page === 1 ?
            <div>
              <div className="flex flex-col w-[20rem]">
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

                <input
                  type="text"
                  placeholder="Enter your salon name"
                  className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <input
                  type="text"
                  placeholder="Enter your salon address"
                  className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border border-black outline-none p-2 rounded-md mb-4"
                />

                <IconButton
                  icon={<FaArrowAltCircleRight />}
                  text="Next"
                  callback={() => { setPage(2) }}
                />
              </div>
            </div> : page === 2 ? <SalonRegistration2 setPage={setPage} /> :
              page === 3 ? <SalonRegistration3 setPage={setPage} /> : null
        }
      </div>
    </div>
  );
}


