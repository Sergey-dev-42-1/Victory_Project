import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../state/sidebarSlice";
import React from "react";
import { CSSTransition } from "react-transition-group";
import * as sidebarComps from "../Additional/SidebarCompositions";

export enum sidebarTypes {
  Org,
  Exp,
  Par,
}

interface Props {
  type: sidebarTypes;
}

export const Sidebar = ({ type }: Props) => {
  const opened = useSelector(selectSidebarOpen);
  return (
    <React.Fragment>
      <CSSTransition in={opened} timeout={800} classNames="sidebarTransitions">
        <div className="sidebarContainer">
          <div className="controlsContainer">
            {type.valueOf() === sidebarTypes.Org && (
              <sidebarComps.OrgComposition buttons={sidebarComps.Orgbuttons} />
            )}
          </div>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};
