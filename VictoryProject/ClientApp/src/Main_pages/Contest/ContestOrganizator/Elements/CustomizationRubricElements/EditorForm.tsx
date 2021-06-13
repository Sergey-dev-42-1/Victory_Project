import React, {useState} from "react";
import {ContentState, convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {makeStyles} from "@material-ui/core/";
import {Button, createStyles} from "@material-ui/core";
import {Editor} from "react-draft-wysiwyg";

const  useStyles = makeStyles((Theme)=>
    createStyles({
        editorToolbar:{
            position:"sticky",
            zIndex:1100,
            top:0
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
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    React.useEffect(()=>{
        if(getContents!.length > 0){
            const contents : ContentState = convertFromRaw(JSON.parse(getContents ? getContents : ""))
            setEditorState((EditorState.createWithContent(contents)))
        }
    }, [])
    
        
  
    function handleContentSave() {
        window.localStorage.setItem("savedJSONContent", JSON.stringify(convertToRaw((editorState.getCurrentContent()))))
        setFormOpened({MainForm:false,TermsForm:false})
    }
    const onEditorStateChange = (editorState:EditorState) =>{
        setEditorState(editorState)
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
