import { useEffect } from 'react';
import {RouteComponentProps} from "@reach/router";


function ScrollToTop(props : RouteComponentProps) {
    useEffect(() => {

        window.scrollTo(0,0)
        return () => {
            window.scrollTo(0,0)
        }
    }, [props.location?.pathname]);
}

export default ScrollToTop