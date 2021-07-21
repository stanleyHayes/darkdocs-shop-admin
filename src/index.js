import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {grey} from "@material-ui/core/colors";

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, IBM Plex Serif'
    },
    shape: {
        borderRadius: 32
    },
    palette: {
        background: {
            default: 'rgba(229,229,229,0.65)',
            paper: '#ffffff'
        },
        primary: {
            light: grey['100'],
            main: grey['300'],
            dark: grey['400']
        }
    }
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your information, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
