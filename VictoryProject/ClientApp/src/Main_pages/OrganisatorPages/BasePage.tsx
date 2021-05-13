import * as React from "react";

import {Contest, UserRoles} from "../../Additional/Types";
import {ContestCard} from "./Elements/ContestCard";
import {Sidebar, sidebarTypes} from "../../Main_components/Sidebar";
import {CreateContestModal} from "../../Forms/CreateContestModal";
import {Footer} from "../../Main_components/Footer";


import {useSidebar} from "../../hooks/useSidebar"
import {RouteComponentProps} from "@reach/router";

import {Dialog} from "@material-ui/core";

import {receive, selectContests} from "../../state/contestSlice"
import {useDispatch, useSelector} from "react-redux";


const tempContestData = (id:string) => {return( new Contest(
    id,
    "Название",
    "Заметки о конкурсе",
    "Начат",
    (Math.floor(Math.random()*3)) as UserRoles,
    new Date(Date.now()),
    new Date(Date.now() + 86400 * 1000),
    new Date(Date.now() + 86400 * 1000 * 20),
    new Date(Date.now() + 86400 * 1000 * 31)
))};

const generateTempData: Contest[] = [tempContestData("1"),tempContestData("2"),tempContestData("3"),tempContestData("4"),tempContestData("5")]

const options = ["Архивировать конкурс", "Удалить конкурс"];

export const BasePage = (props: RouteComponentProps) => {

    useSidebar()
    
    const [createNew, setCreateNew] = React.useState(false);
    
    const dispatch = useDispatch()
    
    
    dispatch(receive(generateTempData))
    
    const contests = useSelector(selectContests)
    const handleCloseCreate = () => {
        setCreateNew(false)
    }

    return (

        <React.Fragment>

            <Dialog onClose={handleCloseCreate} aria-labelledby="simple-dialog-title" open={createNew}>
                <CreateContestModal close={handleCloseCreate}/>
            </Dialog>

            <div className="mainPageContainer">
                <Sidebar type={sidebarTypes.Org}/>
                <main className="contentContainer">
                    <div className="contestManagementContainer">
                        <div className="contestControls">
                            <div
                                onClick={() => {
                                    setCreateNew(true);
                                }}
                                className="option"
                            >
                                Создать новый конкурс
                            </div>
                            {options.map((element, index) => {
                                return (
                                    <span key={index} className="option">
                    {element}
                  </span>
                                );
                            })}
                        </div>
                        <div className="managementContainer">
                            <div className="managementContainerFilters">
                                Компоненты управления
                            </div>
                            {contests.map( (item) =>{
                                return <ContestCard key={item.id} contest={item} id={item.id.toString()}/>
                            })}
                        </div>
                    </div>
                    <Footer/>
                </main>
            </div>
        </React.Fragment>
    );
};
