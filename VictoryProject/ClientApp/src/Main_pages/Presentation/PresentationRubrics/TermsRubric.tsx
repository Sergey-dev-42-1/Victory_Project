import {RouteComponentProps} from "@reach/router";
import {Container, createStyles, Grid, makeStyles, Paper} from "@material-ui/core/";
import {ContestPresentationContext} from "../PresentationPage";
import React, {useContext} from "react";
import {ContentState, convertFromRaw, EditorState} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import {react} from "@babel/types";


const useStyles = makeStyles((Theme) => createStyles({
    container: {
        padding:0,
        paddingLeft:0,
        paddingRight:0,
        display: "flex",
        flexGrow: 1
    },
    termsPaper: {
        flexGrow: 1
    },
    center: {
        justifyContent: "center"
    },
    main: {},
    editorToolbar: {
        display: "none",
        zIndex: 1
    },
    editor: {
        zIndex: 1,
        overflow: "clip",
    },
}))

export const TermsRubric = (props: RouteComponentProps) => {

    const classes = useStyles();
    const getContents = window.localStorage.getItem("savedJSONContent") ? window.localStorage.getItem("savedJSONContent") : "";
    const contents: ContentState = convertFromRaw(JSON.parse(getContents ? getContents : ""))
    return (
        <React.Fragment>

            <main className={classes.container}>
                <Paper square className={classes.termsPaper}>
                    <Grid spacing={2} container style={{padding: "20px"}}>
                        <Grid container className={classes.center}>
                            <Editor
                                editorState={EditorState.createWithContent(contents)}
                                toolbarClassName={classes.editorToolbar}
                                editorClassName={classes.editor}
                                wrapperClassName={classes.editor}
                                readOnly
                                localization={{
                                    locale: 'ru',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </React.Fragment>
    )
}