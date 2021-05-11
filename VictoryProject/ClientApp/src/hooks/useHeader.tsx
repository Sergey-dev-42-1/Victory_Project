import {hide, selectHeaderHide} from "../state/headerSlice";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {show, toggle} from "../state/sidebarSlice";
//Хук прячет хедер при использовании(до изъятия компонента)
//Нужен для того, чтобы при заходе на страницу конкурса участником, элементы интерфейса не были видны
export function useHeader(){
    const hidden = useSelector(selectHeaderHide)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(hide(true));
        return () => {
            dispatch(hide(false))
        }
    }, [])
}