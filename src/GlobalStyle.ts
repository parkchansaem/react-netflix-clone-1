import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing:border-box;
  }
  body{
    color:${(props) => props.theme.white.darker};
    background-color:black;
    box-sizing:border-box;
  }
  a{
    text-decoration:none;
    color:inherit;
  }

`;

export default GlobalStyle;
