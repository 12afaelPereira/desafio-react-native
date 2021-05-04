import * as styledComponents from "styled-components/native";
import {ReactNativeThemedStyledComponentsModule} from "styled-components/native";

import {DefaultTheme}  from './theme';

const {
  default: styled,
  css,
  ThemeProvider
} = styledComponents as ReactNativeThemedStyledComponentsModule<DefaultTheme>;

export { css, ThemeProvider };

export default styled;