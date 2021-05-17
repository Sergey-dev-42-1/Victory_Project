import {Button, Dialog, DialogActions, DialogContent, Typography} from "@material-ui/core";
import React from "react";

interface Props {
    content: string,
    confirmationWord?: string,
    open : boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmationDialog = ( {content,confirmationWord,open, setOpen} : Props) =>{
    return(
        <Dialog open={open}>
            <DialogContent>
                <Typography variant={"h6"}>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={()=>{setOpen(false)}}
                >
                    {confirmationWord === undefined && "Хорошо"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
