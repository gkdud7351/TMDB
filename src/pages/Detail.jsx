// 영화 상세 페이지
import "../styles/common.css";
import { Wrap, Main } from "../styles/StyledComponents";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MovieDetail from "../components/MovieDetail";
import CreditsSlider from "../components/slider/CreditsSlider";

function Detail() {
  return (
    <Wrap>
      <Menu />
      <Main $padding="30px 0">
        <MovieDetail />
        <CreditsSlider />
      </Main>
      <Footer />
    </Wrap>
  );
}

export default Detail;
