import img1 from "../assets/hairstyles/1.jpg";
import img2 from "../assets/hairstyles/2.jpg";
import img3 from "../assets/hairstyles/3.jpg";
import img4 from "../assets/hairstyles/4.jpg";
import img5 from "../assets/hairstyles/5.jpg";
import img6 from "../assets/hairstyles/6.jpg";
import img7 from "../assets/hairstyles/7.jpg";
import img8 from "../assets/hairstyles/8.jpg";
import img9 from "../assets/skinCare.jpg";
import img10 from "../assets/spaService.jpg";
import img11 from "../assets/specialService.jpg";



export const baseUrl = 'http://localhost:8080';

export const hairstyles = [
    {
        img: img1,
        id: 1,
        name: 'Side-Sweep Edge',
        description: 'A clean cut with side-swept layers that give it a sharp, edgy look.',
    },
    {
        img: img2,
        id: 2,
        name: 'Casual Fringe',
        description: 'A relaxed, tousled look with soft bangs that frame the forehead.',
    },
    {
        img: img3,
        id: 3,
        name: 'Sleek Quiff',
        description: 'A smooth and polished style with volume at the top, giving a sleek, quiffed appearance.',
    },
    {
        img: img4,
        id: 4,
        name: 'Layered Swoop',
        description: 'A layered style with a long swoop that cascades down one side, creating a dynamic, flowing look.',
    },
    {
        img: img5,
        id: 5,
        name: 'Spiky Flair',
        description: 'A bold and dynamic style with sharp, spiky layers that add a lot of texture and movement.',
    },
    {
        img: img6,
        id: 6,
        name: 'Wind-Swept Wave',
        description: 'A voluminous, wind-swept look with exaggerated waves that give it a free-spirited vibe.',
    },
    {
        img: img7,
        id: 7,
        name: 'Feathered Pom.',
        description: 'A modern twist on the classic pompadour, with feathered layers that add height and texture.',
    },
    {
        img: img8,
        id: 8,
        name: 'Wild Cascade',
        description: 'A dramatic and flowing hairstyle with long, layered strands that cascade in a wild and untamed fashion.',
    },
]

export const otherServices = [
    {
        id: 9,
        name: "Skin Care",
        img: img9,
        description: "A variety of skin care services to keep your skin looking fresh and healthy.",
    },
    {
        id: 10,
        name: "Spa Service",
        img: img10,
        description: "Relaxing spa treatments to help you unwind and rejuvenate.",
    },
    {
        id: 11,
        name: "Special Service",
        img: img11,
        description: "Specialized services to meet your unique needs and preferences.",
    },
]