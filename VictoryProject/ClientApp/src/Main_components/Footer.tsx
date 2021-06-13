import {Typography} from "@material-ui/core";

interface Props{
    className?: string
}

export const Footer = (props:Props) => {
  return (
    <footer className={"Footer " + (props.className? props.className : "") }>
      <Typography variant={"body2"} style={{color:"white"}} className="footer-text">Victory 2021</Typography>
    </footer>
  );
};
