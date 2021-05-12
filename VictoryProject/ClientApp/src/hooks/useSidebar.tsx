import {show, toggle, selectSidebarOpen} from "../state/sidebarSlice"
import {useDispatch, useSelector} from "react-redux";
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