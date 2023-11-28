import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/Video/VideoPlayer";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_KEY } from "../../config";
import { VideoResponseType, VideosType } from "../../types/videos";
import MoviesGrid from "../../components/MoviesDisplay/MoviesGrid";
import { useEffect, useState } from "react";
import { jsonToWebVTT } from "../../utils/utils";
import Filesaver from "file-saver";

import SubtitleSearch from "./SubtitleSearch";

const WatchPage = () => {
  const { id } = useParams();
  const [DescriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [
    { data: Video },
    { data: InitialMovies, isLoading: isInitialMovieLoading },
    { data: Subtitles },
  ] = useQueries({
    queries: [
      {
        queryKey: ["video_by_id"],
        queryFn: async () => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/video/video/${id}`,
            {
              headers: {
                Authorization: AUTH_KEY,
              },
            }
          );

          return data as VideosType;
        },
        onError: (err: any) => {
          // alert("Something Went Wrong");
          console.log(err);
        },
      },
      {
        queryKey: ["initial_Movies"],
        queryFn: async () => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/video/video`,
            {
              headers: {
                Authorization: AUTH_KEY,
              },
            }
          );

          return data as VideoResponseType;
        },
        onError: (err: any) => {
          // alert("Something Went Wrong");
          console.log(err);
        },
      },
      {
        queryKey: ["subtitles"],
        queryFn: async () => {
          const { data } = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/video/sub-titles?video_id=${id}`,
            {
              headers: {
                Authorization: AUTH_KEY,
              },
            }
          );

          const subtitle = jsonToWebVTT(data.results);
          console.log(subtitle);
          return subtitle;
        },
        onError: (err: any) => {
          // alert("Something Went Wrong");
          console.log(err);
        },
      },
    ],
  });

  const [currentTime, setCurrentTime] = useState<string>("");

  return (
    <main className="  w-full min-h-screen text-text bg-background">
      <div className=" pt-[93px] mx-auto">
        <VideoPlayer
          subtitles={Subtitles}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          src={Video?.video_url || ""}
        />

        <div className=" max-w-screen-2xl mx-auto py-3 px-5">
          <div className="flex items-center gap-6 mt-3 mb-1 w-full  ">
            <h1 className="text-2xl my-auto  capitalize ">
              {Video?.video_name || " "}
            </h1>

            <div className=" ml-auto flex flex-col ">
              <div className="space-x-3 ">
                <a
                  target="_blank"
                  href={Video?.video_url}
                  rel="noopener"
                  className="bg-primary px-3 py-1 text-black inline-block rounded-sm font-medium"
                >
                  Download Video
                </a>

                <button
                  onClick={() =>
                    Filesaver.saveAs(Subtitles as string, "subtitle.txt")
                  }
                  className=" bg-transparent border border-primary  px-3 py-1  rounded-sm font-medium"
                >
                  Download Subtitle
                </button>
              </div>
              <div className=" mt-2 w-full ">
                <SubtitleSearch Videoid={id} setCurrentTime={setCurrentTime} />
              </div>
            </div>
          </div>
          {/* <p className=" my-1 text-accent">
            Uploaded{" "}
            {formatTimeDifference(
              Video?.created_at || DateTime.now().toString()
            )}
          </p> */}
          {/* <p className=" mt-3 ">{Video.video_event}</p> */}
          <p
            className={`max-w-[50%] cursor-pointer transition-all ${
              !DescriptionExpanded ? "line-clamp-2" : ""
            }`}
            onClick={() => {
              setDescriptionExpanded((prev) => !prev);
            }}
          >
            {Video?.video_description || ""}
          </p>
        </div>
        <div className="max-w-screen-2xl  mx-auto py-3 px-5">
          <h2 className=" text-lg mb-2">More Details</h2>

          <div className=" w-[400px]">
            <div className="border-solid flex border-[1px] px-3 py-2">
              <span className=" w-1/2">Released On: </span>
              <span className=" text-gray-400">{Video?.video_date}</span>
            </div>
            <div className="border-solid border-[1px] w-full flex px-3 py-2">
              <span className=" w-1/2 ">Video Tags: </span>
              <span className=" text-gray-400  ">{Video?.video_tags}</span>
            </div>
            <div className="border-solid border-[1px] flex px-3 py-2">
              <span className=" w-1/2">Video Minister: </span>
              <span className=" text-gray-400">{Video?.video_minister}</span>
            </div>
            <div className="border-solid border-[1px] flex px-3 py-2">
              <span className=" w-1/2">Video Event: </span>
              <span className=" text-gray-400">{Video?.video_event}</span>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto py-3 px-5">
          <MoviesGrid
            title="You may also Like"
            InitialMovies={InitialMovies?.results}
            isLoading={isInitialMovieLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default WatchPage;
