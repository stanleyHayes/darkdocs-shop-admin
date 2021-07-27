import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider, Zoom} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {grey} from "@material-ui/core/colors";
import {SnackbarProvider} from "notistack";

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, IBM Plex Serif'
    },
    shape: {
        borderRadius: 32
    },
    palette: {
        background: {
            default: '#E5E5E5',
            paper: '#ffffff'
        },
        primary: {
            light: grey['100'],
            main: grey['300'],
            dark: grey['400']
        },
        secondary: {
            main: '#374151'
        },
        text: {
            primary: grey['800'],
            secondary: grey['800'],
            disabled: grey['700'],
            hint: grey['600']
        },
        action: {
            active: "#374151"
        }
    }
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        TransitionComponent={Zoom}
                    >
                        <App/>
                    </SnackbarProvider>
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
