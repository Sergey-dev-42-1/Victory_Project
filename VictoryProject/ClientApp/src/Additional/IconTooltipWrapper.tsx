import React from "react";
interface Props {
  onClick?:  React.MouseEventHandler<HTMLDivElement>;
  tooltipText: string;
  icon: any;
  classes?: string[];
}

const messageMouseOverIcon = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  text: string
) => {
  const icon_container = event.target as Element;

  const iconDescription = document.createElement("div");
  iconDescription.setAttribute("class", "iconDescription");
  // var rect = icon_container.getBoundingClientRect();
  // iconDescription.setAttribute("style", `top:${1000000} left:${rect.left}`);
  iconDescription.innerText = text;
  icon_container.before(iconDescription);
};

const messageLeaveIcon = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  var targeted = event.target as Element;
  var iconDescription = targeted.parentElement!.getElementsByClassName(
    "iconDescription"
  );

  if (iconDescription) {
    targeted.parentElement!.removeChild(iconDescription[0] as Element);
  }
};

export const IconWrapper = ({onClick ,tooltipText, icon, classes }:Props) => {
  return (
    <div onClick={onClick}
      onMouseOver={(event) => messageMouseOverIcon(event, tooltipText)}
      onMouseOut={(event) => messageLeaveIcon(event)}
      className={classes ? classes.reduce((accumulated, current)=>{return accumulated + current + " "}) : ""}
    >
      {icon}
    </div>
  );
};
