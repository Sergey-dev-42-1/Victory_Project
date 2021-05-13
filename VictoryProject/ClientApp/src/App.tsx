

import "./static/scss/index.scss";

import {useSelector} from "react-redux";


import {selectDarkTheme} from "./state/themeSlice";

import {Header} from "./Main_components/Header";

import {Register} from "./Main_pages/RegisterPage/Register";
import {BasePage} from "./Main_pages/OrganisatorPages/BasePage";
import {ContestPageManagement} from "./Main_pages/Contest/ContestPageManagment";
import {HttpError} from "./Extra_pages/HTTPErrorPage";

import {ThemeProvider} from "@material-ui/core";

import {defaultTheme, darkTheme} from "./MaterialUI/Themes";


import CssBaseline from "@material-ui/core/CssBaseline";

import {Router} from "@reach/router";
import reportWebVitals from "./reportWebVitals";


export const App = () => {

    return (
            <ThemeProvider theme={useSelector(selectDarkTheme) ? darkTheme : defaultTheme}>
                <CssBaseline/>
                <Header/>
                <Router id="routerWrapper" primary={false} >
                    
                    <BasePage path="/"/>
                    <Register path="/signup"/>
                    <ContestPageManagement path="/contest/:id/*"/>
                    <HttpError path="*" errorType={"HTTP 404"} errorMessage={""}/>
                </Router>
            </ThemeProvider>
    )
}
reportWebVitals();
