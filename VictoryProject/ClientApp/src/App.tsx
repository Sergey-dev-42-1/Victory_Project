import "./static/scss/index.scss";

import {Header} from "./Main_components/Header";

import {Register} from "./Main_pages/RegisterPage/Register";
import {BasePage} from "./Main_pages/OrganisatorPages/BasePage";
import {ContestPageManagement} from "./Main_pages/Contest/ContestPageManagment";
import {HttpError} from "./Extra_pages/HTTPErrorPage";
import {PresentationPage} from "./Main_pages/Presentation/PresentationPage"

import {ThemeProvider} from "@material-ui/core";


import CssBaseline from "@material-ui/core/CssBaseline";

import {Router} from "@reach/router";
import reportWebVitals from "./reportWebVitals";
import React, {useState} from "react";

import {selectDarkTheme} from "./state/themeSlice";
import {darkTheme, defaultTheme} from "./MaterialUI/Themes";
import {useSelector} from "react-redux";
import {BrowseContests} from "./Main_pages/BrowseContests/BrowseContests";

export const UserContext = React.createContext({
    user: {username: ""},
    setUser: (value: any) => {
    }
});
export const App = () => {

    let username = window.localStorage.getItem("username")
    const [user, setUser] = useState({username: username ? username : ""})
    const contextValue = {user, setUser}

    console.log(username)
    //window.localStorage.removeItem("username")


    return (
        <UserContext.Provider value={contextValue}>
            <ThemeProvider theme={useSelector(selectDarkTheme) ? darkTheme : defaultTheme}>
                <CssBaseline/>
                <Header/>
                <Router id="routerWrapper" primary={false}>
                    {(username !== "" && username !== null) &&
                    <React.Fragment>
                        <BasePage path="/"/>
                        <ContestPageManagement path="/contest/:id/*"/>
                    </React.Fragment>
                    }
                        {(username === "" || username === null) &&
                    <React.Fragment>
                        <Register path="/signup"/>
                    </React.Fragment>
                        }
                        <BrowseContests path="/main"/>
                    <PresentationPage path="/contest/:id/presentation/*"/>
                    <HttpError path={"*"} errorType={"404"} errorMessage={"Запрошенная страница не существует"}/>
                </Router>
            </ThemeProvider>
        </UserContext.Provider>
    )
}
reportWebVitals();
