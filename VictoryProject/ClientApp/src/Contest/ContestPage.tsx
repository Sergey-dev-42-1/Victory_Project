import React from "react";
import { Sidebar, sidebarTypes } from "../Main_components/Sidebar";

import { Contest } from "../Additional/Types";
import { RouteComponentProps } from "@reach/router";
interface Props
  extends RouteComponentProps<{ location: { state: { contest: Contest } } }> {
  contest?: Contest;
}

export const ContestPage = ({ location }: Props) => {
  const contest = location!.state.contest;
  return (
    <div className="contestPage">
      <div className="mainPageContainer">
        <Sidebar type={sidebarTypes.Org} />
        <main className="contentContainer">
          <header className="contestHeader">{contest.name}</header>
          <footer className="contestFooter">
            Название организации проводящей конкурс
          </footer>
        </main>
      </div>
    </div>
  );
};
