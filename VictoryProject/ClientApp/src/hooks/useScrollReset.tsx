import { useEffect } from 'react';
import {RouteComponentProps} from "@reach/router";


function ScrollToTop(props : RouteComponentProps) {
    useEffect(() => {
        
        window.scrollTo({top:0,left:0,behavior:"smooth"})
        return () => {
            window.scrollTo({top:0,left:0,behavior:"smooth"})
        }
    }, [props.location]);
}

export default ScrollToTop