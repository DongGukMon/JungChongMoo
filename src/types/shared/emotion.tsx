import React from 'react';
import {lightTheme} from '../../styles/theme';

export interface StylePropTypes {
  theme: {
    colors: Record<keyof typeof lightTheme.colors, string>;
  };
  height?: number;
  width?: number;
  padding: number;
  fontSize: number;
  marginHorizontal: number;
  isSelected: boolean;
}
