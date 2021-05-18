import {useContext, useState} from "react";
import {ContestPresentationContext} from "../../../Presentation/PresentationPage";
import {ContentState, convertFromRaw, EditorState} from "draft-js";
import {makeStyles} from "@material-ui/core/";
import {Button, createStyles, Grid} from "@material-ui/core";
import {Editor} from "react-draft-wysiwyg";
import React from "react";
const  useStyles = makeStyles((Theme)=>
    createStyles({
        editorToolbar:{
            
        },
        editorWrapper:{
            
        },
        editor:{
            
        }
    })
)
interface Props {
    setFormOpened: React.Dispatch<React.SetStateAction<{MainForm: boolean, TermsForm: boolean}>>
}
export const EditorForm = ({setFormOpened}:Props)=>{

    const classes = useStyles();
    const getContents = window.localStorage.getItem("savedJSONContent") ? window.localStorage.getItem("savedJSONContent") : "";
    console.log(getContents!.length)
    const contents: ContentState = convertFromRaw(JSON.parse(getContents ? getContents : ""))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contents))
    const onEditorStateChange = (editorState:EditorState) =>{
        setEditorState(editorState)
    }

    function handleContentSave() {
        setFormOpened({MainForm:false,TermsForm:false})
    }

    return(
        <React.Fragment>
            <Editor
                editorState={editorState}
                toolbarClassName={classes.editorToolbar}
                wrapperClassName={classes.editorWrapper}
                editorClassName={classes.editor}
                onEditorStateChange={onEditorStateChange}
                localization={{
                    locale: 'ru',
                }}/>
            <Button onClick={handleContentSave} variant={"contained"} color={"secondary"}>Сохранить</Button>
        </React.Fragment>
    )
}
