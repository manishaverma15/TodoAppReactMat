import React, { createContext, useReducer } from 'react';
import { ThemeActionEnum } from '../../enums/display-theme.enum';

interface DarkThemeAction {
    type: ThemeActionEnum.DARK_THEME
}

interface LightThemeAction {
    type: ThemeActionEnum.LIGHT_THEME
}

export type ThemeAction = LightThemeAction | DarkThemeAction;

export interface ThemeInterface {
    primary: string;
    secondary: string;
}

const themes: { darkTheme: ThemeInterface, lightTheme: ThemeInterface } = {
    darkTheme: {
        primary: '#CD9B9B',
        secondary: '#002884'
    },
    lightTheme: {
        primary: '#CFAFAF',
        secondary: '#ba000d'
    }

}

const themeReducer = (theme: ThemeInterface, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActionEnum.DARK_THEME:
            return themes.darkTheme

        case ThemeActionEnum.LIGHT_THEME:
            return themes.lightTheme

        default:
            return theme;
    }
}

export interface ThemeContextInterface {
    theme: ThemeInterface;
    dispatch: React.Dispatch<ThemeAction>;
}

const initialState: ThemeContextInterface = {
    theme: themes.lightTheme,
    dispatch: () => { },
}

const ThemeContext = createContext<ThemeContextInterface>(initialState);

const ThemeProvider = (props: any) => {
    const [theme, dispatch] = useReducer(themeReducer, themes.lightTheme);

    return <ThemeContext.Provider value={{ theme, dispatch }}>
        {props.children}
    </ThemeContext.Provider>
}

export { ThemeProvider, ThemeContext };