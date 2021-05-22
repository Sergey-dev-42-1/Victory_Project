import {navigate, RouteComponentProps, Router} from "@reach/router";
import {useSidebar} from "../../hooks/useSidebar";
import {useHeader} from "../../hooks/useHeader";
import {createMuiTheme, createStyles, Fab, Grid, makeStyles, ThemeProvider, Tooltip} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/ReduxHooks";
import {hide, selectHeaderHide} from "../../state/headerSlice";
import {selectSidebarOpen} from "../../state/sidebarSlice";
import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";
import {darkTheme} from "../../MaterialUI/Themes";
import {tempContestData} from "../Contest/Context/contestContext";
import {ContestPresentationHeader} from "./Elements/PresentationHeader";
import {ContestPresentationFooter} from "./Elements/PresentationFooter";
import {HttpError} from "../../Extra_pages/HTTPErrorPage";
import {ruRU} from "@material-ui/data-grid";

import {selectDarkTheme} from "../../state/themeSlice";
import {Tab, Tabs} from "@material-ui/core/";
import {MainRubric} from "./PresentationRubrics/MainRubric";
import {NewsRubric} from "./PresentationRubrics/NewsRubric";
import {TermsRubric} from "./PresentationRubrics/TermsRubric";
import {ResultsRubric} from "./PresentationRubrics/ResultsRubric";
import useScrollReset from "../../hooks/useScrollReset";

const useStyles = makeStyles((Theme) => (createStyles({
    contestPage: {

        display: "flex",
        flexFlow: "column",
        flexGrow: 1,

    },
    pageBody: {
        width: "80%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    contentArea: {
        flexGrow: 1,
        alignContent: "space-between"
    },

    Fab: {
        zIndex: 1100,
        position: "fixed",
        alignSelf: "flex-end",
        margin: "10px 0"
    }
})))

const newTheme = createMuiTheme({

        palette: {
            primary: {
                main: "#4caf50",
                contrastText: '#ffffff',

            },
            secondary: {
                main: "#3d5afe",
            },
        }
    }, ruRU
);

let tempContest = tempContestData



export const ContestPresentationContext = React.createContext({...tempContestData});
export const PresentationPage = (props: RouteComponentProps) => {

    useSidebar()
    useHeader()
    //По умолчанию, при переходе по ссылкам, Router пролистывает страницу до отображенного элемента, хук это выключает
    useScrollReset(props)

    const classes = useStyles()
    const headerHidden = useAppSelector(selectHeaderHide)
    const sidebar = useAppSelector(selectSidebarOpen)
    const themeType = useAppSelector(selectDarkTheme)
    const dispatch = useAppDispatch()



    function handleToggleHeader() {
        headerHidden ? dispatch(hide(false)) : dispatch(hide(true))
    }

    

    return (
        //Для кастомизации, нужно доставать из темы свойства и делать отдельный ThemeProvider
        <React.Fragment>
            {tempContest && <React.Fragment>
                <Sidebar type={sidebarTypes.Org}/>
                <ThemeProvider theme={themeType ? darkTheme : newTheme}>

                    <ContestPresentationContext.Provider value={tempContestData}>

                        <Grid color={"primary"} className={classes.contestPage}>

                            <Tooltip title={"Элементы управления"}>
                                <Fab color={"secondary"} onClick={() => {
                                    handleToggleHeader()
                                }}
                                     className={classes.Fab} disabled={sidebar}>

                                    {headerHidden ? <ExpandMoreIcon/> : <ExpandLessIcon/>}

                                </Fab>
                            </Tooltip>

                            <Grid color={"primary"} className={classes.pageBody}>
                                <ContestPresentationHeader {...props}/>
                                <Grid color={"primary"} container className={classes.contentArea}>
                                        <Router id="routerWrapper">
                                            <MainRubric path={'/main'} />
                                            <NewsRubric path={'/news'} />
                                            <TermsRubric path={'/terms'} />
                                            <ResultsRubric path={'/results'} />
                                        </Router>
                                    <ContestPresentationFooter/>
                                </Grid>
                            </Grid>

                        </Grid>

                    </ContestPresentationContext.Provider>

                </ThemeProvider>
            </React.Fragment>
            }
            {!tempContest && <HttpError errorType={"HTTP 404"}
                                        errorMessage={"Выбранный вами конкурс не найден(возможно вы пытались перейти через адресную строку, аяяй)"}/>}
        </React.Fragment>
    )
} 