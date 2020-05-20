import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import "./assets/fonts/ABeeZee-Regular.ttf";

export const GlobalStyle = createGlobalStyle` 
  ${normalize}

  body{
    background-color: lightblue;
    font-family: sans-serif;
  }
`;
