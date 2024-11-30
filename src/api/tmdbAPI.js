import axios from "axios";

// /movie/popular?language=ko-KR&page=1&region=KR
const BASE_URL = "https://api.themoviedb.org/3";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjNlMGVjNjVmZGU1NTMzNDVkNWI4Y2IzMzg1ZGZhNCIsIm5iZiI6MTczMTcxOTMzMC4yMTYxMzg2LCJzdWIiOiI2NzJmNzFjMmFjOTcwYWFkMmE4ZDcyMmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NGqLyCrHt8a-bQt3bpx0GVBzEVC19A4T5mtCpi9t_Is";
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json", // response데이터를 json객체로 달라고 서버에게 요청
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

export const searchMovie = async (query, page = 1) => {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query: query,
      page: page,
      language: "ko-KR",
      include_adult: false,
      region: "KR",
    },
  });
  return response;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      language: "ko-KR",
    },
  });
  return response;
};

export const getMovieCredits = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
    params: {
      language: "ko-KR",
    },
  });
  return response;
};

// API를 통해 영화목록을 가져오는 함수
export const getMovies = async (category = "popular", page = 1) => {
  const response = await tmdbApi.get(`/movie/${category}`, {
    params: {
      language: "ko-KR",
      page,
      region: "KR",
    },
  });
  return response;
};

export default tmdbApi;
