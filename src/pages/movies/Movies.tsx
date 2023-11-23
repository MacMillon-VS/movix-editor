import { useQuery } from "@tanstack/react-query";
import MoviesGrid from "../../components/MoviesDisplay/MoviesGrid";
import { AUTH_KEY } from "../../config";
import { VideoResponseType } from "../../types/videos";
import axios from "axios";

const MoviesPage = () => {
  const { data: InitialMovies, isLoading } = useQuery({
    queryKey: ["initialMovies"],
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
    onError: (err) => {
      // alert("Something Went Wrong");
      console.log(err);
    },
  });
  return (
    <main className=" bg-background min-h-screen pt-[97px] text-text ">
      <div className="max-w-screen-2xl mx-auto px-8 mt-4">
        <MoviesGrid
          InitialMovies={InitialMovies?.results}
          isLoading={isLoading}
          title="Movies"
        />
      </div>
    </main>
  );
};

export default MoviesPage;
