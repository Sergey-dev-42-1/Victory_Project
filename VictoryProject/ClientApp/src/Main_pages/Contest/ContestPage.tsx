import React from "react";

import {Contest} from "../../Additional/Types";

import {useHeader as hideHeader} from "../../hooks/useHeader";

import {RouteComponentProps} from "@reach/router";
import { createStyles, Fab, Grid, makeStyles,  ThemeProvider} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {hide, selectHeaderHide} from "../../state/headerSlice";
import {selectSidebarOpen} from "../../state/sidebarSlice";
import {useDispatch, useSelector} from "react-redux";

import {ContestHeader} from "./Elements/ContestHeader"
import {ContestRubrics} from "./Elements/ContestRubrics";
import {ContestFooter} from "./Elements/ContestFooter";
import {createMuiTheme} from "@material-ui/core/";

import {useSidebar} from "../../hooks/useSidebar";
import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";

import {darkTheme} from "../../MaterialUI/Themes";
import {selectDarkTheme} from "../../state/themeSlice";

interface Props
    extends RouteComponentProps<{ location: { state: { contest: Contest } } }> {
    contest?: Contest;
}

const newTheme = createMuiTheme({
    
    palette: {
        primary: {
            main: "#4caf50",
            contrastText: '#ffffff',
           
        },
        secondary:{
            main: "#3d5afe",
        },
    }
})

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
    content: {

        height: "90%",
    },
    Fab: {
        
        position: "fixed",
        alignSelf: "flex-end",
        margin: "10px 0"
    }
})))

export const ContestPage = ({location}: Props) => {
    useSidebar()
    hideHeader()

    const dispatch = useDispatch()
    const classes = useStyles()
    
    const themeType = useSelector(selectDarkTheme)
    const sidebar = useSelector(selectSidebarOpen)
    const headerHidden = useSelector(selectHeaderHide)
    
    const handleToggleHeader = () => {
        dispatch(hide(!headerHidden));
    }
    
    const contest = location!.state.contest;
    
    return (
        //Для кастомизации, нужно доставать из темы свойства и делать отдельный ThemeProvider
        <ThemeProvider theme={themeType? darkTheme : newTheme}>

            <Sidebar  type={sidebarTypes.Org}/>
            
            <Grid color={"primary"}   className={classes.contestPage}>
                <Fab color={"secondary"} onClick={() => {
                    handleToggleHeader()
                }} className={classes.Fab} disabled={sidebar}> {headerHidden ? <ExpandMoreIcon/> :
                    <ExpandLessIcon/>}</Fab>

                <Grid color={"primary"}  className={classes.pageBody}>
                    <ContestHeader  contest={contest}/>
                    <Grid  color={"primary"}  container style={{flexGrow: 1}}>
                        <ContestRubrics/>
                        <Grid  item xs={12} md={10} className={classes.content}>
                            
                        </Grid>
                        <ContestFooter />
                    </Grid>
                    
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
