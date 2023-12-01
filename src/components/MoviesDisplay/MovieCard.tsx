import { Link } from "react-router-dom";
import { VideosType } from "../../types/videos";
import VideoCardSkeleton from "../Skeleton/VideoCardSkeleton";
import { thumbnail } from "../../constants/Informations";

type Props = {
  id: number;

  Movie?: VideosType;
};

const MoviesCard = ({ Movie }: Props) => {
  if (!Movie) {
    return <VideoCardSkeleton />;
  }

  const Tags = Movie.video_tags.slice(0, 3).map((item, index) => {
    if (index === Movie?.video_tags?.length - 1) {
      return <>{item}</>;
    } else {
      return <>{item} · </>;
    }
  });

  return (
    <Link className=" w-full h-full " to={`/watch/${Movie?.video_number}`}>
      <img
        alt="Movie Name"
        loading="lazy"
        className=" object-cover  w-[260px] h-[400px] bg-white   transition-all duration-500 "
        src={
          `${import.meta.env.VITE_BACKEND_URL}${Movie.thumbnail}` ?? thumbnail
        }
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.src = thumbnail;
        }}
      />
      <h2 className=" text-text text-xl font-semibold mt-3 line-clamp-2">
        {Movie?.video_name}
      </h2>
      <p className="text-gray-400">{Tags}</p>
    </Link>
  );
};

export default MoviesCard;
