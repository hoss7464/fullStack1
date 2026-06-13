import styled from "styled-components";
import { ThemeColors } from "./Theme";

export const MainContainer = styled.div`
 display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color:${ThemeColors.background} ;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding-left: 8px;
    padding-right: 8px;
  }
  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media only screen and (min-width: 769px) and (max-width: 992px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media only screen and (min-width: 993px) and (max-width: 1079px) {
    padding-left: 56px;
    padding-right: 56px;
  }
  @media only screen and (min-width: 1080px) and (max-width: 1920px) {
    padding-left: 72px;
    padding-right: 72px;
  }
  @media only screen and (min-width: 1921px) {
    padding-left: 120px;
    padding-right: 120px;
  }
`;

