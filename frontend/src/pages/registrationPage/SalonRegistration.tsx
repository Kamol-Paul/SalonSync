import { useState } from "react";
import IconButton from "../../components/iconButton/IconButton";
// import imgUpload from "../../assets/imgUpload.png";
// import { SalonRegistration2 } from "./SalonRegistration2";
// import { SalonRegistration3 } from "./SalonRegistration3";
import salonReg from "../../assets/salonReg.svg";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { baseUrl } from "../../utils/constants";


export function SalonRegistration() {
  // const [page, setPage] = useState(1);
  // const [image, setImage] = useState(
  //   <img src={imgUpload} alt="Upload image" className="w-24" />
  // );


  let [formData, setFormData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    roles: [
      "salon"
    ]
  });

  let [alert, setAlertBox] = useState({
    isError: false,
    message: ""
  });

  const onSubmit = () => {
    console.log(formData);

    setAlertBox({
      isError: false,
      message: "Please wait..."
    });

    // check if all fields are filled
    if (
      !formData.username ||
      !formData.address ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password
    ) {
      setAlertBox({
        isError: true,
        message: "All fields are required"
      });
      return;
    }

    if (formData.phoneNumber.length !== 11) {
      setAlertBox({
        isError: true,
        message: "Phone number should be of 11 digits"
      });
      return;
    }

    if (formData.password.length < 6) {
      setAlertBox({
        isError: true,
        message: "Password should be of atleast 6 characters"
      });
      return;
    }

    fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
            message: data.data.message
          });
          return;
        }
        console.log(data);
        setAlertBox({
          isError: false,
          message: "Verification email sent. Please verify your email."
        });
        // storeInLocalStorage("customer-token", data["key"]);
        // navigate("/doctor");
      });
  };


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
            className="h-[25rem] bg-white rounded-xl w-[20rem] bg-opacity-50"
            src={salonReg}
            alt="Salon Registration" />
        </div>

        <div className="border border-black"></div>

        <div>
          <div className="flex flex-col w-[20rem]">
            {/* <label className="relative mb-4">
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
            </label> */}

            <input
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              type="text"
              placeholder="Enter your name"
              className="border border-black outline-none p-2 rounded-md mb-4"
            />

            <input
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
              }}
              type="text"
              placeholder="Enter your address"
              className="border border-black outline-none p-2 rounded-md mb-4"
            />

            <input
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
              }}
              type="text"
              placeholder="Enter your phone number"
              className="border border-black outline-none p-2 rounded-md mb-4"
            />

            <input
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              type="text"
              placeholder="Enter your email"
              className="border border-black outline-none p-2 rounded-md mb-4"
            />

            <input
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              type="password"
              placeholder="Enter your password"
              className="border border-black outline-none p-2 rounded-md mb-4"
            />

            {/* warning div */}
            {
              alert.message && <div className={`text-center ${alert.isError ? "text-white" : "text-green-500"} text-sm ${alert.isError ? "bg-red-500" : "bg-lime-200"} me-2 rounded-md p-1`}>
                {alert.message}
              </div>
            }

            <IconButton
              icon={<FaArrowAltCircleRight />}
              text="Register"
              callback={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


