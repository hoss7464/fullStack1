import styled from "styled-components";
import { ThemeColors } from "../../Core-UI/Theme";

export const ProfileContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 700px;
background-color: ${ThemeColors.background};
`

export const ProfileTextWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export const ProfileTextWrapper2 = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 1rem;
`

export const ProfileText = styled.p`
font-size: 16px;
font-weight: 600;

`