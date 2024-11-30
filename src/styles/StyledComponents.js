import styled from "styled-components";

//props에서 사용하는 변수는 $를 붙여서 사용(warining 방지)
export const Wrap = styled.div`
  overflow: hidden;
  min-width: ${(props) => props.$minWidth || "1200px"};
`;

export const Main = styled.main`
  width: ${(props) => props.$width || "1200px"};
  margin: 0 auto;
  overflow: hidden;
  padding: ${(props) => props.$padding || 0};
`;
