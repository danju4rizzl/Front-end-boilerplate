import { SyntheticEvent } from 'react';

export const stopPropagation = (e: SyntheticEvent) => e.stopPropagation();
export const preventDefault = (e: SyntheticEvent) => e.preventDefault();

export const stopPreventDefault = (e: SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
