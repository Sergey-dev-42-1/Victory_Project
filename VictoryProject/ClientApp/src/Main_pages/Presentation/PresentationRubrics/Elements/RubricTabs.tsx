import {createStyles, makeStyles, Tab, Tabs} from "@material-ui/core";
import React, {useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";




//Нужен чтобы при обновлении страницы не дропался выбор вкладки в панели
const tabSetter = (path:string) => {
    const route = path.split('/').pop()
    switch (route){
        case "main":
            return 0
        case "terms":
            return 1
        case "results":
            return 2
    }
}

const useStyles = makeStyles((Theme) => (createStyles({
    tabsContainer: {
        //elevaion [3]
        zIndex: 1100,
        boxShadow: "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px",
        backgroundColor: "white",
        color: "black",
        flexGrow: 1,
        width: "100%"
    },
})))
export const RubricTabs = (props : RouteComponentProps) => {
    console.log(props)
    const [naviTab, setNaviTab] = useState(tabSetter(props.location?.pathname!))
    function handleTabChange(event: React.ChangeEvent<{}>, tab: number) {
        setNaviTab(tab)
        switch(tab){
            case 0:
                navigate("./main")
                break

            case 1:
                navigate("./terms")
                break
            case 2:
                navigate("./results")
                break
        }
    }
    const classes = useStyles()
    return (
        <Tabs centered value={naviTab} onChange={handleTabChange} className={classes.tabsContainer}>
            <Tab label="Главная"/>

            <Tab label="Положения"/>
            {/*disabled={tempContestData.status!=="Подведение итогов"}*/}
            <Tab label="Результаты"/>
        </Tabs>
    )
}