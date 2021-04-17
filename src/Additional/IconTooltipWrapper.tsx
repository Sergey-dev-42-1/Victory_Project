import React from "react";
interface Props {
  tooltipText: string;
  icon: any;
}

const messageMouseOverIcon = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  text: string
) => {
  const icon_container = event.target as Element;

  const iconDescription = document.createElement("div");
  iconDescription.setAttribute("class", "iconDescription");

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

export const IconWrapper = ({ tooltipText, icon }: Props) => {
  return (
    <div
      onMouseOver={(event) => messageMouseOverIcon(event, tooltipText)}
      onMouseOut={(event) => messageLeaveIcon(event)}
      className="controlButton"
    >
      {icon}
    </div>
  );
};
