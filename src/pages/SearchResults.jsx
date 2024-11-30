// 검색결과
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../features/movies/moviesSlice";

import "../styles/common.css";
import { Wrap, Main } from "../styles/StyledComponents";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import Button from "@mui/material/Button";

function SearchResults() {
  const [searchParams] = useSearchParams(); //query 파라미터 값 가져오기
  const query = searchParams.get("query"); // 검색어
  const [page, setPage] = useState(1); // 페이지 번호 state

  const dispath = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.movies
  );

  // 맨 처음에 검색할때 1페이지 데이터를 가져옴
  useEffect(() => {
    dispath(fetchSearchResults({ query, page: 1 }));
  }, [dispath, query]);

  // page가 변경될때 마다 새로운 결과를 로딩
  // 더보기 버튼 클릭 -> page state가 변경 -> fetchSearchResults(..) 실행
  useEffect(() => {
    //2페이지 부터 실행 (useEffect는 사이트 들어왔을때 무조건 최초로 1번 실행하므로 위에 useEffect와 같이 실행되는 것 방지)
    if (page > 1) {
      dispath(fetchSearchResults({ query, page }));
    }
  }, [page, dispath, query]);

  const loadMore = () => {
    // 더보기 누를때마다 page state 가 1씩 증가
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) {
    return (
      <Wrap>
        <Menu />
        <Main $padding="30px 0">
          <h2>검색중..</h2>
        </Main>
        <Footer />
      </Wrap>
    );
  }

  if (error) {
    return (
      <Wrap>
        <Menu />
        <Main $padding="30px 0">
          <h2>오류발생: {error}</h2>
        </Main>
        <Footer />
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Menu />
      <Main $padding="30px 0">
        {/* 검색 결과에 따른 렌더링 처리 */}
        {searchResults.length > 0 ? (
          <>
            <MovieCard movies={searchResults} />
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
          </>
        ) : (
          <h2>검색 결과가 없습니다.</h2>
        )}
      </Main>
      <Footer />
    </Wrap>
  );
}

export default SearchResults;
