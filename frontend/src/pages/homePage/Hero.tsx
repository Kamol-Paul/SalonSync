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
        <div className='relative h-screen w-[80vw] m-auto'>
            <video autoPlay
                muted
                loop className='absolute inset-0 max-w-[960px] h-screen object-cover object-left'>
                <source src={video} />
            </video>
            <div className='relative top-[30%] w-[26rem] float-right translate-y-[-30%]'>
                <GlassCard title='Welcome to SalonSync!' body={`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'l`} />
            </div>
        </div>
    );
};

const GlassCard = ({ title, body }: { title: string, body: string }) => {
    return (
        <div className='rounded-sm glass-bg p-6'>
            <h1 className="text-white text-[1.5rem]">
                {title}
            </h1>
            <p className="text-white text-[.8rem] mb-4">
                {body}
            </p>

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
