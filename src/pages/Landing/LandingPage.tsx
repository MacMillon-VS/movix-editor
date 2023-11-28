import { useQueries, useQuery } from "@tanstack/react-query";
import HeroSection from "../../components/HeroSection/HeroSection";
import MoviesDisplay from "../../components/MoviesDisplay/MoviesDisplay";
import MoviesGrid from "../../components/MoviesDisplay/MoviesGrid";
import axios from "axios";
import { HighLightsResponseType, VideoResponseType } from "../../types/videos";

const LandingPage = () => {
  const FetchInitialMovies = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/video/video`
    );

    return data as VideoResponseType;
  };

  const FetchVideoHighlights = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/video/video-highlights`
    );

    return data as HighLightsResponseType;
  };

  const [
    { data: InitialMovies, isLoading },
    { data: InitialHighlights, isLoading: isHighlightsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["initialMovies"],
        queryFn: FetchInitialMovies,
        onError: (err: unknown) => {
          console.log(err);
        },
      },
      {
        queryKey: ["videoHighlights"],
        queryFn: FetchVideoHighlights,
        onError: (err: unknown) => {
          console.log(err);
        },
      },
    ],
  });

  console.log(InitialMovies?.results);
  console.log(InitialHighlights);

  return (
    <main className=" bg-background">
      <HeroSection
        DisplayMovie={InitialMovies?.results[0]}
        isLoading={isLoading}
      />
      <div className="w-full px-5 mx-auto max-w-screen-2xl mt-14 text-text min-h-screen">
        <MoviesDisplay
          title="My Popular"
          InitialHighlights={InitialHighlights?.data}
          isLoading={isHighlightsLoading}
        />
        <MoviesGrid
          isLoading={isLoading}
          InitialMovies={InitialMovies?.results}
        />
      </div>
    </main>
  );
};

export default LandingPage;
