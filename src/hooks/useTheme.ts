import { ThemeContext } from '../context/themeContext';
import { useContext } from 'react';

const useTheme = () => useContext(ThemeContext);

export { useTheme };
