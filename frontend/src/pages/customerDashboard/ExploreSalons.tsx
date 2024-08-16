import Card from "../../components/card/Card";
import img from '../../assets/imgUpload.png';
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/constants";

export default function ExploreSalons() {

    const [salons, setSalons] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/api/salon/all`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSalons(data);
            });
    }, []);

    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Explore Salons
            </h1>
            <div className="flex flex-row flex-wrap justify-between">
                {
                    salons.map((salon: any) =>
                        <Card image={salon.image} title={salon.name} price={salon.price} />
                    )
                }
                <Card image={img} title="Cool Salon" price={120} />
            </div>
        </div>
    );
}