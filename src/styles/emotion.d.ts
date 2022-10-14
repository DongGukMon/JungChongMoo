import '@emotion/react'
import {lightTheme} from './theme'

type ThemeTpye = typeof lightTheme

declare module '@emotion/react' {
  export interface Theme extends ThemeTpye {}
}