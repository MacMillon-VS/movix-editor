import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDebounce } from "react-use";
import { AUTH_KEY } from "../../config";
import { SubtitleSearchResponseType } from "../../types/videos";
import { convertToSeconds } from "../../utils/formatTime";
import { IoIosHelpCircleOutline } from "react-icons/io";

const SubtitleSearch = ({
  setCurrentTime,
  Videoid,
}: {
  setCurrentTime: React.Dispatch<React.SetStateAction<string>>;
  Videoid?: string;
}) => {
  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedValue, setdebouncedValue] = useState("");

  const {
    data: SearchedArray,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["search_subtitles"],
    queryFn: async () => {
      if (!debouncedValue) return [];
      const { data }: { data: SubtitleSearchResponseType } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/video/sub-titles?search=${debouncedValue}`,
        {
          headers: {
            Authorization: AUTH_KEY,
          },
        }
      );

      const Filtereddata = data?.results?.filter((item) => {
        return Videoid === item?.video_id?.toString();
      });
      if (!Filtereddata) return [];
      return Filtereddata;
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: false,
  });

  useDebounce(
    () => {
      setdebouncedValue(searchTerm);
      refetch();
    },
    300,
    [searchTerm]
  );

  return (
    <div className=" flex flex-col relative ">
      <input
        className={`outline-none bg-transparent transition-all px-3 w-full duration-200 border-[1px] relative rounded-lg flex border-gray-500  py-2 justify-center items-center  `}
        placeholder="Search Movies..."
        type="search"
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
      <div className=" absolute top-14 w-full    ">
        {debouncedValue ? (
          <ol className="px-2">
            <span></span>
            <div className="flex gap-3 w-full text-gray-400 mb-2 py-1 border-b  justify-between ">
              <span className="max-w-[200px] line-clamp-1 ">
                {SearchedArray?.length! < 1
                  ? "No Matching Subtitle"
                  : "Subtitles Found"}
              </span>
              <span className=" min-w-[93px]  ">Time</span>
            </div>

            {isLoading ? "Loading...." : null}
            {isFetching ? "Loading..." : null}
            {SearchedArray?.map((item) => (
              <li key={item.id} className="flex gap-3 w-full  justify-between ">
                <span className="max-w-[200px] line-clamp-1 ">
                  {item.sub_title}
                </span>
                <button
                  className="text-accent hover:text-accent/60"
                  onClick={() => {
                    setCurrentTime(convertToSeconds(item.start_time));
                  }}
                >
                  {item.start_time}
                </button>
              </li>
            ))}

            <span className="flex items-center leading-[1] gap-1 mt-2 text-gray-400">
              <IoIosHelpCircleOutline className=" my-auto  " size={18} />{" "}
              <span>Click time to Seek</span>
            </span>
          </ol>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SubtitleSearch;
