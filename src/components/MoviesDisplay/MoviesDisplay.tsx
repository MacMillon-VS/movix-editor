import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error Types Error from swiper
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import "swiper/css/navigation";
import PopularMoviesCard from "./PopularMoviesCard";
import { HighLightsResponseType } from "../../types/videos";

const MoviesDisplay = ({
  InitialHighlights,

  title,
}: {
  InitialHighlights?: HighLightsResponseType["data"];
  isLoading: boolean;
  title?: string;
}) => {
  if (!InitialHighlights) {
    return <>Issue in getting data</>;
  }

  return (
    <>
      <div className=" py-5">
        <div className=" flex justify-between items-center">
          <h1 className=" text-2xl mb-5 mt-9 ">{title || "Movies"}</h1>
          <Link
            to={`/${title}`}
            className="flex justify-center gap-2 hover:text-accent items-center"
          >
            See all <AiOutlineRight />
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          freeMode
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={30}
          className=" cursor-grab overflow-y-visible"
        >
          {InitialHighlights.map((collection, i) => {
            return (
              <SwiperSlide
                key={collection.id}
                className="shadow-lg select-none hover:scale-[1.15] transition-all duration-200 w-[200px]  xl:w-[230px] overflow-y-visible"
              >
                {/* initial={i < 10 ? { scale: 0, opacity: 0 } : {}}
                    whileInView={i < 10 ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: i * 0.07,
                      bounce: 0.4,
                      stiffness: 3000,
                      duration: 0.2,
                    }}
                    // whileHover={{scale:1.2}}
                    viewport={{ once: true }} */}
                <div className=" cursor-pointer  rounded-md overflow-hidden">
                  <PopularMoviesCard Movie={collection} id={i} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default MoviesDisplay;
