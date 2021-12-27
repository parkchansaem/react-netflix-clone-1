import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    color:${(props) => props.theme.white.darker};
    background-color:black;
  }
  a{
    text-decoration:none;
    color:inherit;
  }

`;

export default GlobalStyle;
