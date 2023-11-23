/* eslint-disable  */
import { useVideo } from "react-use";

// Icons
import {
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsFullscreen,
  BsFullscreenExit,
  BsPip,
  BsPlayFill,
} from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { SiSubtitleedit } from "react-icons/si";

import { Dispatch, SetStateAction, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { formatTime } from "../../utils/formatTime";

type Props = {
  src: string;
  subtitles?: string;
  currentTime: string;
  setCurrentTime: Dispatch<SetStateAction<string>>;
};

export default function VideoPlayer({
  src,
  subtitles,
  currentTime,
  setCurrentTime,
}: Props) {
  const [video, state, controls, ref] = useVideo(
    <video src={src} className=" w-full h-full">
      <track
        label={"subtile"}
        kind="subtitles"
        srcLang="en"
        src={subtitles}
        className="video"
        default
      />
    </video>
  );

  const timelineRef = useRef<HTMLDivElement>(null);
  const videoref = useRef<HTMLDivElement>(null);
  const [cursorPercentage, setCursorPercentage] = useState(10);
  const [percentage, setpercentage] = useState(
    (state.time / state.duration) * 100
  );
  const [isfullscreen, setisfullscreen] = useState(false);
  const issubtitleactive =
    ref.current?.textTracks[0]?.mode === "showing" && subtitles;
  useEffect(() => {
    setpercentage((state.time / state.duration) * 100);
  }, [state.time]);

  useEffect(() => {
    controls.seek(+currentTime);
  }, [currentTime]);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = timelineElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const timelineWidth = timelineElement.clientWidth;
      const newPercentage = (mouseX / timelineWidth) * 100;

      // Ensure the percentage is within valid bounds
      const clampedPercentage = Math.min(100, Math.max(0, newPercentage));

      // Update the state with the cursor percentage
      setCursorPercentage(clampedPercentage);
    };

    timelineElement.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      timelineElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement && videoref.current) {
      videoref.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
      setisfullscreen(true);
    } else {
      document.exitFullscreen();
      setisfullscreen(false);
    }
  }

  const ToggleVideo = () => {
    if (state.playing) {
      controls.pause();
    } else {
      controls.play();
    }
  };

  const handleTimeChange = () => {
    console.log(cursorPercentage);
    const newTime = (cursorPercentage / 100) * state.duration;
    controls.seek(newTime);
    controls.play();
    setCurrentTime(newTime.toString());
    setpercentage(cursorPercentage);
  };

  const ToggleSubtitle = () => {
    if (ref.current) {
      if (ref.current.textTracks[0].mode === "disabled") {
        ref.current.textTracks[0].mode = "showing";
      } else {
        ref.current.textTracks[0].mode = "disabled";
      }
    }
  };

  return (
    <div className="group flex bg-black  justify-center items-center w-full  h-[30vh] md:h-[50vh] xl:h-[80vh] aspect-video">
      <div className=" relative w-full h-full video_container" ref={videoref}>
        <div onClick={ToggleVideo} className="w-full h-full ">
          {video}
        </div>
        {/* Play Center Button */}
        <div className="z-50 absolute inset-0 touch-none pointer-events-none w-full h-full flex justify-center items-center   ">
          {!state.playing && (
            <div className=" w-20 h-20  flex justify-center items-center rounded-full bg-opacity-50 bg-accent group-hover:bg-secondary">
              <BsPlayFill color="white" size={40} />
            </div>
          )}
        </div>

        <div
          className=" absolute  flex-col controls hidden z-30  w-full h-[70px] bg-opacity-60 gradient_black bottom-0"
          style={!state.paused ? { display: "none" } : { display: "flex" }}
        >
          <div className="timeline-container ">
            <div
              className="timeline"
              ref={timelineRef}
              onClick={handleTimeChange}
            >
              <div
                className="preview"
                style={{ right: `${100 - cursorPercentage}%` }}
              ></div>
              <div
                className="thumb-indicator"
                style={{ left: `${percentage}%` }}
              ></div>
              <div
                className="progress"
                style={{ right: `${100 - percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex-1 justify-between flex h-full  px-4">
            <div className=" flex h-full items-center  ">
              <div className=" w-[35px]">
                {state.paused ? (
                  <div
                    className=" hover:scale-[1.2] transition cursor-pointer"
                    onClick={() => {
                      controls.play();
                    }}
                  >
                    <BsPlayFill size={30} color="white" />
                  </div>
                ) : (
                  <div
                    className=" hover:scale-[1.2] transition cursor-pointer"
                    onClick={() => {
                      controls.pause();
                    }}
                  >
                    <GiPauseButton size={25} color="white" />
                  </div>
                )}
              </div>
              <div className=" flex volumeContainer gap-3">
                {state.muted || state.volume === 0 ? (
                  <div
                    className=" hover:scale-[1.2] transition cursor-pointer"
                    onClick={() => {
                      controls.unmute();
                    }}
                  >
                    <BsFillVolumeMuteFill size={30} color="white" />
                  </div>
                ) : (
                  <div
                    className=" hover:scale-[1.2] transition cursor-pointer"
                    onClick={() => {
                      controls.mute();
                    }}
                  >
                    <BsFillVolumeUpFill size={25} color="white" />
                  </div>
                )}

                <input
                  className="volumeSlider"
                  value={state.volume}
                  type="range"
                  title="Volume"
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) => {
                    controls.volume(parseFloat(e.target.value));
                  }}
                ></input>
              </div>
              <div className=" text-white">
                <span>{formatTime(state.time)}</span> /{" "}
                <span>{formatTime(state.duration)}</span>
              </div>
            </div>

            <div className="h-full flex items-center gap-3 text-white">
              <button
                title="Turn On Subtitle"
                type="button"
                onClick={ToggleSubtitle}
                className=" py-2"
                style={
                  issubtitleactive
                    ? { borderBottom: "3px solid var(--accent)" }
                    : {}
                }
              >
                <SiSubtitleedit
                  size={20}
                  className="text-white cursor-pointer hover:scale-[1.2]"
                />
              </button>
              <div>{ref.current?.playbackRate}</div>
              <div onClick={() => ref.current?.requestPictureInPicture()}>
                <BsPip
                  size={25}
                  className="text-white cursor-pointer hover:scale-[1.2]"
                />
              </div>
              <div
                onClick={toggleFullscreen}
                className="text-white cursor-pointer hover:scale-[1.2]"
              >
                {isfullscreen ? (
                  <BsFullscreenExit size={20} />
                ) : (
                  <BsFullscreen size={20} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}