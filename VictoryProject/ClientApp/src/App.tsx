

import "./static/scss/index.scss";

import {useSelector} from "react-redux";


import {selectDarkTheme} from "./state/themeSlice";

import {Header} from "./Main_components/Header";

import {Register} from "./Main_pages/RegisterPage/Register";
import {OrgBasePage} from "./Main_pages/OrganisatorPages/OrgBasePage";
import {ContestPage} from "./Main_pages/Contest/ContestPage";
import {HttpError} from "./Extra_pages/HTTPErrorPage";

import {ThemeProvider} from "@material-ui/core";

import {defaultTheme, darkTheme} from "./MaterialUI/Themes";


import CssBaseline from "@material-ui/core/CssBaseline";

import {Router} from "@reach/router";
import reportWebVitals from "./reportWebVitals";


export const App = () => {
    //TODO: СМЕНА ТЕМЫ РАБОТАЕТ, но StrictMode несовместим с MUI, поэтому его нужно выключить на деплое
    return (
            <ThemeProvider theme={useSelector(selectDarkTheme) ? darkTheme : defaultTheme}>
                <CssBaseline/>
                <Header/>
                <Router id="routerWrapper" primary={false} >
                    
                    <OrgBasePage path="/"/>
                    <Register path="/signup"/>
                    <ContestPage path="/contest/:id"/>
                    <HttpError path="*" errorType={"HTTP 404"} errorMessage={""}/>
                </Router>
            </ThemeProvider>
    )
}
reportWebVitals();
