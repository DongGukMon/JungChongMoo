import React from 'react';
import {lightTheme} from '../../styles/theme';

export interface stylePropTypes {
  theme: {
    colors: Record<keyof typeof lightTheme.colors, string>;
  };
  height: number;
  padding: number;
  fontSize: number;
}
