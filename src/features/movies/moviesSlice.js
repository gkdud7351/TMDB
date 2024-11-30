import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SearchResults from "../../pages/SearchResults";
import {
  searchMovie,
  getMovieDetails,
  getMovieCredits,
  getMovies,
} from "../../api/tmdbAPI";

// createAsyncThunk의 async 함수에서 매개변수로 2개 이상의 값을 받으려면 객체 혹은 배열로 전달한다

//인기영화, 현재상영중, 개봉예정 영화 목록
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ category, page }) => {
    const response = await getMovies(category, page);
    return response.data.results;
  }
);

// 영화 검색
export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async ({ query, page }) => {
    const response = await searchMovie(query, page);
    return response.data.results;
  }
);

// 영화 상세정보 가져오기
export const fetchMovieDatails = createAsyncThunk(
  "movies/fetchMovieDatails",
  async (movieId) => {
    const response = await getMovieDetails(movieId);
    return response.data;
  }
);

// 출연 배우, 스태프 정보 가져오기
export const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCredits",
  async (movieId) => {
    const response = await getMovieCredits(movieId);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    loading: false,
    error: null,
    searchResults: [], // 검색한 영화 목록(tmdb서버에서 받아오는 값이 배열일때 초기 state를 빈배열로 준다)
    movieDetails: null, // 영화 상세 정보(tmdb서버에서 받아오는 값이 json객체일때 초기 state를 null로 준다)
    movieCredits: null, // 영화배우, 스태프정보
    movies: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        //페이지가 1페이지일 때(맨처음 검색 했을 때)는 그냥 새로운 state로 업데이트
        if (action.meta.arg.page === 1) {
          state.searchResults = action.payload;
        } else {
          //페이지가 2 이상일 때 기존 데이터 + 새로운 데이터로 state 업데이트
          state.searchResults = [...state.searchResults, ...action.payload];
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieDatails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDatails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload; //response.data
      })
      .addCase(fetchMovieDatails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.movieCredits = action.payload; //response.data
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        //페이지가 1페이지일 때(맨처음 검색 했을 때)는 그냥 새로운 state로 업데이트
        if (action.meta.arg.page === 1) {
          state.movies = action.payload;
        } else {
          //페이지가 2 이상일 때 기존 데이터 + 새로운 데이터로 state 업데이트
          state.movies = [...state.movies, ...action.payload];
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
