import * as React from "react";

import { ContestCard } from "../Main_components/ContestCard";
import { Contest } from "../Additional/Types";
import { Sidebar, sidebarTypes } from "../Main_components/Sidebar";
import { CreateContestModal } from "../Forms/CreateContestModal";
import { Footer } from "../Main_components/Footer";

import { useSelector, useDispatch } from "react-redux";
import { selectSidebarOpen, toggle } from "../state/sidebarSlice";
import { RouteComponentProps } from "@reach/router";
import { CSSTransition } from "react-transition-group";
import {Dialog} from "@material-ui/core";

//TODO: Подстановчный объект, потом удалить

const tempContestData = new Contest(
  "Название",
  "Заметки о конкурсе",
  "Начат",
  new Date(Date.now()),
  new Date(Date.now() + 86400 * 1000),
  new Date(Date.now() + 86400 * 1000 * 20),
  new Date(Date.now() + 86400 * 1000 * 31)
);

const options = ["Архивировать конкурс", "Удалить конкурс"];

export const OrgBasePage = (props: RouteComponentProps) => {
  
  const opened = useSelector(selectSidebarOpen);
  const dispatch = useDispatch();
  const [createNew, setCreateNew] = React.useState(false);

  const handleCloseCreate = () => {setCreateNew(false)}
  
  return (
      
    <React.Fragment>
      {opened && (
        <React.Fragment>
          <div
            onClick={() => {
              dispatch(toggle());
            }}
            className="modalShowControls"
          />
        </React.Fragment>
          
      )}
      
      
      <Dialog onClose={handleCloseCreate} aria-labelledby="simple-dialog-title" open={createNew}>
          <CreateContestModal close={handleCloseCreate}/>
      </Dialog>

      <div className="mainPageContainer">
        <Sidebar type={sidebarTypes.Org} />
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
              <ContestCard contest={tempContestData} id="1" />
              <ContestCard contest={tempContestData} id="2" />
              <ContestCard contest={tempContestData} id="1" />
              <ContestCard contest={tempContestData} id="2" />
              <ContestCard contest={tempContestData} id="1" />
              <ContestCard contest={tempContestData} id="2" />
              <ContestCard contest={tempContestData} id="1" />
              <ContestCard contest={tempContestData} id="2" />
              {/* <ContestCard {...tempContestData} />
              <ContestCard {...tempContestData} />
              <ContestCard {...tempContestData} />
              <ContestCard {...tempContestData} />
              <ContestCard {...tempContestData} /> */}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
};
