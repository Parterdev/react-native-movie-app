import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string,
  secondary: string,
}

interface ContextProps {
  colors: ImageColors,
  prevColors: ImageColors,
  setRootColors: (colors: ImageColors) => void,
  setRootPreviousColors: (colors: ImageColors) => void,
}

//Context
export const GradientContext = createContext({} as ContextProps);


//Provider
export const GradientProvider = ({children}:any) => {
  
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent'
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent'
  });

  const setRootColors = (colors:ImageColors) => {
    setColors(colors);
  }

  const setRootPreviousColors = (prevColors:ImageColors) => {
    setPrevColors(prevColors);
  }


  return (
    <GradientContext.Provider value={{
      colors,
      prevColors,
      setRootColors,
      setRootPreviousColors,
    }}>
      {children}
    </GradientContext.Provider>
  )
}