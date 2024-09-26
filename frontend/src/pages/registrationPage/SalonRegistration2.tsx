import IconButton from "../../components/iconButton/IconButton";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";


export function SalonRegistration2({ setPage }: { setPage: any }) {
  return (
    <div className="relative">
      <div className="flex flex-col w-[20rem] space-y-4">

        <h1 className="font-bold">
          Barber Information
        </h1>

        <input
          type="text"
          placeholder="Enter barber name"
          className="border border-black outline-none p-2 rounded-md mb-4"
        />

        <select className="border border-black outline-none p-2 rounded-md mb-4">
          <option value="" selected disabled>Barber Skill</option>
          <option value="hairstyle1">Professional</option>
          <option value="hairstyle2">Intermediate</option>
          <option value="hairstyle3">Beginner</option>
        </select>

        <h1 className="font-bold">
          Barber Availalibity:
        </h1>

        <div className="flex flex-row space-x-3">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
            <div key={index} className="block rounded-md bg-[#3b5997] text-white p-1 text-[0.8rem] cursor-pointer">
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row w-full space-x-1 bottom-0 absolute">
        <IconButton
          className="basis-1/2"
          icon={<FaArrowAltCircleLeft size={20} />}
          text="Back"
          callback={() => { setPage(1) }}
          direction="right"
        />
        <IconButton
          className="basis-1/2"
          icon={<FaArrowAltCircleRight size={20} />}
          text="Next"
          callback={() => { setPage(3) }}
        />
      </div>
    </div>
  );
}