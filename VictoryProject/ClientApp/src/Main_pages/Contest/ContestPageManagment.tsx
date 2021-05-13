import React from "react";

import {Contest} from "../../Additional/Types";

import {useHeader as hideHeader} from "../../hooks/useHeader";
import {useSidebar} from "../../hooks/useSidebar";

import {Redirect, RouteComponentProps} from "@reach/router";
import {createStyles, Fab, Grid, makeStyles, ThemeProvider, Tooltip} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {hide, selectHeaderHide} from "../../state/headerSlice";
import {selectSidebarOpen} from "../../state/sidebarSlice";
import {selectContest} from"../../state/contestSlice"
import {RootState} from"../../state/store"
import {useDispatch, useSelector} from "react-redux";

import {ContestHeader} from "./Elements/ContestHeader"
import {ContestRubricsOrganizator} from "./Elements/ContestRubricsOrganizator";
import {ContestPagesOrganizator} from "./Elements/ContestPagesOrganizator";
import {ContestRubricsExpert} from "./ContestExpert/ContestRubricsExpert"
import {ContestPagesExpert} from "./ContestExpert/ContestPagesExpert"
import {ContestRubricsParticipant} from "./ContestParticipant/ContestRubricsParticipant"
import {ContestPagesParticipant} from "./ContestParticipant/ContestPagesParticipant"

import {ContestFooter} from "./Elements/ContestFooter";

import {ContestContext} from "./Context/contestContext";

import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";

import {createMuiTheme} from "@material-ui/core/";
import {darkTheme} from "../../MaterialUI/Themes";
import {selectDarkTheme} from "../../state/themeSlice";

import {ruRU} from "@material-ui/data-grid";

import {UserRoles} from "../../Additional/Types"
import {HttpError} from "../../Extra_pages/HTTPErrorPage";

interface Props
    extends RouteComponentProps {
    id?: string;
}

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

const useStyles = makeStyles(() => (createStyles({
    contestPage: {
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
    },
    pageBody: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    Fab: {

        position: "fixed",
        alignSelf: "flex-end",
        margin: "10px 0"
    }
})))

export const ContestPageManagement = (props: Props) => {
    useSidebar()
    hideHeader()

    const dispatch = useDispatch()
    const classes = useStyles()

    const contest = useSelector((state: RootState)=> selectContest(state,props.id!))
    const themeType = useSelector(selectDarkTheme)
    const sidebar = useSelector(selectSidebarOpen)
    const headerHidden = useSelector(selectHeaderHide)


    const handleToggleHeader = () => {
        dispatch(hide(!headerHidden));
    }


    

    return (
        //Для кастомизации, нужно доставать из темы свойства и делать отдельный ThemeProvider
        <React.Fragment>
            {contest && <React.Fragment>
            <Sidebar type={sidebarTypes.Org}/>
                <ThemeProvider theme={themeType ? darkTheme : newTheme}>

                <ContestContext.Provider value={contest!}>

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
                <ContestHeader/>
                <Grid color={"primary"} container style={{flexGrow: 1}}>
            {contest!.role === UserRoles.organistor &&
                <React.Fragment>
                <ContestRubricsOrganizator/>
                <ContestPagesOrganizator/>
                </React.Fragment>
            }
            {contest!.role === UserRoles.expert &&
                <React.Fragment>
                <ContestRubricsExpert/>
                <ContestPagesExpert/>
                </React.Fragment>
            }
            {contest!.role === UserRoles.participant &&
                <React.Fragment>
                <ContestRubricsParticipant/>
                <ContestPagesParticipant/>
                </React.Fragment>
            }
                <ContestFooter/>
                </Grid>
                </Grid>

                </Grid>

                </ContestContext.Provider>

                </ThemeProvider>
            </React.Fragment>
            }
            {!contest && <HttpError errorType={"HTTP 404"} errorMessage={"Выбранный вами конкурс не найден(возможно вы пытались перейти через адресную строку, аяяй)"}/>}
        </React.Fragment>
    );
}
