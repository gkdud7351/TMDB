// 인기영화, 현재상영 중인 영화, 개봉예정 영화
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";

import "../styles/common.css";
import { Wrap, Main } from "../styles/StyledComponents";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import Button from "@mui/material/Button";

function MovieCategory({ category }) {
  const dispath = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [page, setPage] = useState({
    popular: 1,
    now_playing: 1,
    upcoming: 1,
  });
  /* 최초로 메뉴 클릭시 MovieCategory 컴포넌트 렌더링(마운트)
  이후 메뉴 클릭시 MovieCategory 컴포넌트 재렌더링 X (라우터를 사용한 경우 같은
  컴포넌트 사용시 props가 바뀌어도 재렌더링 X)
  
  -> 메인페이지에 있다가 최초로 메뉴를 클릭했을 때는 MovieCategory 컴포넌트가
  최초로 렌더링이 되면서 1번 useEffect와 2번 useEffect를 모두 실행한다.

  -> 1번 useEffect에서 page가 바뀜, 2번 useEffect에서 API콜을 한다.
  그런데 1번 useEffect 실행시 page state가 바뀌었기 때문에 2번 useEffect가 한번 더 실행되며
  API콜이 한 번 더 발생한다.

  -> 이후 다른 메뉴 클릭시 category props는 바뀌지만 컴포넌트가 재렌더링이 되지 않으므로
  API콜이 한 번 더 발생하지 않는다. 

  -> 다만 해당 카테고리의 page state가 1로 바뀌면서 2번 useEffect가 한 번 실행된다.

  -> 따라서 useRef를 사용해 최초로 메뉴 클릭시에만 1번 useEffect를 실행하지 않도록 만들어준다.
  (어차피 최초로 메뉴 클릭시 page state는 모두 1)

  */

  const isFirstLoad = useRef(true);

  // category가 바뀔 때마다(메뉴 눌렀을 때) 해당 page state를 1로 변경(초기화)
  // 1번 useEffect
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setPage((prevPage) => ({
      ...prevPage,
      [category]: 1,
    }));
  }, [category]);

  // 2번 useEffect
  useEffect(() => {
    dispath(fetchMovies({ category: category, page: page[category] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispath, page]);

  const loadMore = useCallback(() => {
    setPage((prevPage) => ({
      ...prevPage,
      [category]: prevPage[category] + 1, // prevPage.category + 1
    }));
  }, [category]);

  if (loading && page == 1) {
    return (
      <Wrap>
        <Menu></Menu>
        <Main>
          <h2>Loading...</h2>
        </Main>
        <Footer></Footer>
      </Wrap>
    );
  }

  if (error) {
    return (
      <Wrap>
        <Menu></Menu>
        <Main>
          <h2>Error:{error}</h2>
        </Main>
        <Footer></Footer>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Menu />
      <Main $padding="30px 0">
        <MovieCard movies={movies} />
        <Button
          variant="outlined"
          sx={{
            margin: "20px auto",
            display: "block",
            width: "500px",
          }}
          onClick={loadMore}
        >
          더보기
        </Button>
      </Main>
      <Footer />
    </Wrap>
  );
}

export default MovieCategory;
