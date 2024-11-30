import "../styles/common.css";
import { Wrap, Main } from "../styles/StyledComponents";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function Home() {
  return (
    <Wrap>
      <Menu />
      <Main>
        <Banner></Banner>
      </Main>
      <Footer />
    </Wrap>
  );
}

export default Home;
