import { useQuery } from "@tanstack/react-query";
import HeroSection from "../../components/HeroSection/HeroSection";
import MoviesDisplay from "../../components/MoviesDisplay/MoviesDisplay";
import MoviesGrid from "../../components/MoviesDisplay/MoviesGrid";
import axios from "axios";
import { VideoResponseType } from "../../types/videos";
import { AUTH_KEY } from "../../config";

const LandingPage = () => {
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

  console.log(InitialMovies?.results);

  return (
    <main className=" bg-background">
      <HeroSection
        DisplayMovie={InitialMovies?.results[0]}
        isLoading={isLoading}
      />
      <div className="w-full px-5 mx-auto max-w-screen-2xl mt-14 text-text min-h-screen">
        <MoviesDisplay title="My Popular" />
        <MoviesGrid
          isLoading={isLoading}
          InitialMovies={InitialMovies?.results}
        />
      </div>
    </main>
  );
};

export default LandingPage;
