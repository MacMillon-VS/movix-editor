import { useRef, useState } from "react";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { VideosType } from "../../types/videos";

const HeroSection = ({
  DisplayMovie,
  isLoading,
}: {
  DisplayMovie?: VideosType;
  isLoading: boolean;
}) => {
  const [hasAudio, setHasAudio] = useState(true);

  const video = useRef<HTMLVideoElement>(null);
  const toggleaudio = () => {
    if (video.current?.muted) {
      video.current.muted = false;
      setHasAudio(false);
    } else if (video.current) {
      video.current.muted = true;
      setHasAudio(true);
    }
  };

  return (
    <section className=" w-full pt-[97px] flex items-center relative  h-[100vh]">
      <video
        ref={video}
        src={DisplayMovie?.video_url || "/justice_league.mp4"}
        aria-hidden
        className=" absolute h-full object-cover w-full top-0 left-0"
        loop
        autoPlay
        muted
      ></video>
      <div
        aria-hidden
        className=" overlay absolute bottom-0 left-0 w-full h-2/3  bg-gradient-to-t from-background "
      ></div>
      <button
        aria-hidden
        className=" text-white absolute right-6 bottom-6 p-3 rounded-full bg-black bg-opacity-70  z-20"
        onClick={toggleaudio}
      >
        {hasAudio ? <BiSolidVolumeMute /> : <BiSolidVolumeFull />}
      </button>

      <div className="z-20 w-full text-text mx-auto max-w-screen-2xl px-4 xl:px-6">
        <h1 className=" text-5xl capitalize xl:text-7xl mb-3  max-w-[600px] leading-[1.4]  font-semibold ">
          {isLoading ? (
            <div className=" w-[60%] h-[40px] rounded-lg bg-white/30 "></div>
          ) : (
            ""
          )}
          {DisplayMovie?.video_name}
        </h1>
        <p className="max-w-[600px] line-clamp-2 ">
          {isLoading ? (
            <>
              <div className=" w-[80%] h-[10px] rounded-lg mb-2 bg-white/30 "></div>
              <div className=" w-[80%] h-[10px] rounded-lg bg-white/30 "></div>
            </>
          ) : (
            ""
          )}
          {DisplayMovie?.video_description}
        </p>

        <Link to={`/watch/${DisplayMovie?.video_number}`} className="flex">
          <motion.div
            whileTap={{ scale: 0.9, y: 5 }}
            className=" flex justify-center text-xl gap-2 px-4  py-2 border-2 focus-visible:border-accent hover:border-accent rounded-lg mt-3  items-center"
          >
            <div className=" text-accent">
              <AiOutlinePlayCircle />
            </div>
            Watch Now
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
