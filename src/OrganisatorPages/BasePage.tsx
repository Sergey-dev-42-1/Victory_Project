import React from "react";
import { Contest, ContestCard } from "../Main_components/ContestCard";

import { Sidebar, sidebarTypes } from "../Main_components/Sidebar";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../state/sidebarSlice";
import { Footer } from "../Main_components/Footer";
//TODO: Подстановчный объект, потом удалить
const tempContestData = new Contest(
  "Название",
  "Заметки о конкурсе",
  "Начат",
  new Date(Date.now()),
  new Date(Date.now() + 86400 * 100 * 1),
  new Date(Date.now() + 86400 * 100 * 20),
  new Date(Date.now() + 86400 * 100 * 31)
);
export const BasePage = () => {
  const opened = useSelector(selectSidebarOpen);
  return (
    <div className="mainPageContainer">
      <Sidebar type={sidebarTypes.Org} />
      <main className={opened ? "contentContainer dimmer" : "contentContainer"}>
        <div className="contestManagmentContainer">
          <div className="managmentContainer">
            <div className="managmentContainerFilters"></div>
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
            <ContestCard {...tempContestData} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};
