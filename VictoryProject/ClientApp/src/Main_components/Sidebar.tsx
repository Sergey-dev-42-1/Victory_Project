import {useDispatch, useSelector} from "react-redux";
import {selectSidebarOpen, toggle} from "../state/sidebarSlice";
import React, {useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import * as sidebarComps from "../Additional/SidebarCompositions";
import {Modal} from "@material-ui/core";

export enum sidebarTypes {
    Org,
    Exp,
    Par,
}

interface Props {
    type: sidebarTypes;
}

export const Sidebar = ({type}: Props) => {
    const opened = useSelector(selectSidebarOpen);
    const dispatch = useDispatch();
    useEffect(() => {
        if (opened) {
            document.body.style.overflowY = 'hidden'

        } else {
            document.body.style.overflowY = ''
        }

    }, [opened])
    return (
        <React.Fragment>
            <Modal
                onClick={()=>{dispatch(toggle(!opened))}}
                style={{zIndex:1000}}
                open={opened}
            >{<React.Fragment/>}
            </Modal>
            <CSSTransition in={opened} timeout={800} classNames="sidebarTransitions">


                <div className="sidebarContainer">
                    <div className="controlsContainer">
                        {type.valueOf() === sidebarTypes.Org && (
                            <sidebarComps.MainComposition/>
                        )}
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    );
};
