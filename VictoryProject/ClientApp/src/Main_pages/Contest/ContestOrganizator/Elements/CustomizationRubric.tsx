import {RouteComponentProps} from "@reach/router";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, {useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/";
import {createStyles, Grid, Tab, Tabs, Toolbar} from "@material-ui/core";
import {ColorCustomization} from "./CustomizationRubricElements/ColorCustomization";
import {FormsCustomization} from "./CustomizationRubricElements/FormsCustomization";
import {ContentCustomization} from "./CustomizationRubricElements/ContentCustomization";

const useStyles = makeStyles((Theme) => createStyles({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: Theme.palette.secondary.dark,
        color: Theme.palette.getContrastText(Theme.palette.secondary.dark),
    },
    tabs: {
        flexGrow: 1,
    },
}))

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}


interface LinkTabProps {
    label?: string;
    href?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            {...props}
        />
    );
}


interface Props extends RouteComponentProps {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const CustomizationRubric = (props: Props) => {

    const [tab, setTab] = useState(0);
    
    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };
    
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Grid className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Tabs value={tab} className={classes.tabs} onChange={handleChangeTab}>
                        <LinkTab label="Цвета"/>
                        <LinkTab label="Формы"/>
                        <LinkTab label="Текст и оформление"/>
                    </Tabs>
                </Toolbar>
                <TabPanel value={tab} index={0}>
                    <ColorCustomization setTheme={props.setTheme}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <FormsCustomization/>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <ContentCustomization/>
                </TabPanel>
            </Grid>
        </React.Fragment>
    )
}

