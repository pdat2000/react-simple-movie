import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieCard from "./MovieCard";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
