import video from './../../assets/heroAnimation.mp4';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img1 from '../../assets/carouselImg1.png';
import img2 from '../../assets/carouselImg2.jpg';

const Hero = () => {
    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <video autoPlay
                muted
                loop className='absolute top-0 left-0 w-full md:w-1/2 h-full object-cover'>
                <source src={video} />
            </video>
            <div className='relative z-10 p-8 w-full md:w-1/2 flex justify-center items-center'>
                <GlassCard title='Welcome to SalonSync!' body={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'l`} />
            </div>
        </div>
    );
};

const GlassCard = ({ title, body }: { title: string, body: string }) => {
    return (
        <div className='rounded-lg glass-bg p-6 md:p-8 shadow-2xl w-full max-w-md'>
            <h1 className="font-heading text-3xl md:text-4xl text-white mb-3">
                {title}
            </h1>
            <p className="font-sans text-base text-slate-200 mb-6">
                {body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="font-sans bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue/70 focus:ring-offset-2 focus:ring-offset-brand-gray/50">
                    Explore Services
                </button>
                <button className="font-sans bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-accent/70 focus:ring-offset-2 focus:ring-offset-brand-gray/50">
                    Book Appointment
                </button>
            </div>

            <Swiper
                effect={"creative"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ["-120%", 0, -500],
                    },
                    next: {
                        shadow: true,
                        translate: ["120%", 0, -500],
                    },
                }}
                // navigation={true}
                pagination={{ clickable: true }}
                modules={[EffectCreative, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <div style={{
                        background: `url(${img1})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"

                    }} className='w-full h-[20rem] rounded-lg'>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        background: `url(${img2})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"

                    }} className='w-full h-[20rem] rounded-lg'></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;
