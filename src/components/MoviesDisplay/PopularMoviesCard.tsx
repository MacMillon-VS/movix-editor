import { Link } from "react-router-dom";
import { VideosType } from "../../types/videos";
import VideoCardSkeleton from "../Skeleton/VideoCardSkeleton";

type Props = {
  id: number;
  image: string;
  Movie: VideosType;
};

const PopularMoviesCard = ({ image, Movie }: Props) => {
  if (!Movie) {
    return <VideoCardSkeleton />;
  }
  return (
    <Link className=" w-full h-full " to={`/watch/${Movie?.video_number}`}>
      <img
        alt="Movie Name"
        loading="lazy"
        className=" object-cover  w-full bg-white   transition-all duration-500 "
        src={image}
      />
      <h2 className=" text-text text-xl font-semibold mt-3 line-clamp-2">
        {Movie?.video_name}
      </h2>
      <p className="text-gray-400">{Movie?.video_tags}</p>
    </Link>
  );
};

export default PopularMoviesCard;
