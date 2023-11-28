import { Link } from "react-router-dom";

import { AiOutlineRight } from "react-icons/ai";
import { VideosType } from "../../types/videos";
import VideoCardSkeleton from "../Skeleton/VideoCardSkeleton";
import MoviesCard from "./MovieCard";

const MoviesGrid = ({
  InitialMovies,
  isLoading,
  title,
}: {
  InitialMovies?: VideosType[];
  isLoading: boolean;
  title?: string;
}) => {
  if (isLoading) {
    return (
      <div className=" py-5">
        <div className=" flex justify-between items-center">
          <h1 className=" text-2xl mb-5 mt-9 ">{title || "Movies"}</h1>
        </div>
        <div className=" max-sm:px-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-stretch gap-10 overflow-y-visible">
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
          <VideoCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className=" py-5">
      <div className=" flex justify-between items-center">
        <h1 className=" text-2xl mb-5 mt-9 ">{title || "Movies"}</h1>
        <Link
          to={`/movies`}
          className="flex justify-center gap-2 hover:text-accent items-center"
        >
          See all <AiOutlineRight />
        </Link>
      </div>
      <div className=" max-sm:px-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-stretch gap-10 overflow-y-visible">
        {InitialMovies?.map((collection, i) => {
          return (
            <div
              key={collection.video_number}
              className="shadow-lg select-none lg:hover:scale-[1.15] transition-all duration-200 w-full overflow-y-visible"
            >
              <div className=" cursor-pointer  rounded-md overflow-hidden">
                <MoviesCard id={i} Movie={collection} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesGrid;
