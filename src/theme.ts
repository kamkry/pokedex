import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  interface Theme {
    text: string;
    textAccent: string;
    select: string;
    focus: string;
    background: string;
    backgroundAccent: string;
  }
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}

export const lightTheme: DefaultTheme = {
  text: '#000000',
  textAccent: '#3d3d3d',
  select: 'rgb(234,234,234)',
  focus: '#a1deff',
  background: '#ffffff',
  backgroundAccent: '#bcdae8',
};

export const darkTheme: DefaultTheme = {
  text: '#ffffff',
  textAccent: '#d2d2d2',
  select: 'rgb(200,200,200)',
  focus: '#a1deff',
  background: '#343434',
  backgroundAccent: '#060606',
};
