import {IconButton, InputAdornment} from "@material-ui/core";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import React from "react";

export const passwordAdornment = (passwordVisibility: boolean, passwordVisibilityChange: () => void) => {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={passwordVisibilityChange}
            >
                {passwordVisibility ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        </InputAdornment>
    )
}