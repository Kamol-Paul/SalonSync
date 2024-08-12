import Card from "../../components/card/Card";

import img from '../../assets/imgUpload.png'

export default function ExploreSalons() {
    return (
        <div>
            <h1 className="text-center font-bold text-[1.5rem] text-[#d18d32]" style={{
                textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }} >
                Explore Salons
            </h1>
            <div className="flex flex-row flex-wrap justify-between space-y-4">                
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                <Card image={img} title="Cool Salon" price={120} />
                
            </div> 
        </div>
    );
}