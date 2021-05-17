import {show, toggle} from "../state/sidebarSlice"
import {useDispatch} from "react-redux";
import React from "react";

export function useSidebar() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(show());
        return () => {
            dispatch(show())
        }
    }, [])
    React.useEffect(() => {
        return () => {
            dispatch(toggle(false))
        }
    }, []);
}