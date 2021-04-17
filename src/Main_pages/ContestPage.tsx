import React from "react";
import { Sidebar, sidebarTypes } from "../Main_components/Sidebar";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../state/sidebarSlice";
import { Footer } from "../Main_components/Footer";
export const ContestPage = () => {
  return (
    <div className="mainPageContainer">
      <Sidebar type={sidebarTypes.Org} />
      <div className="contentContainer"></div>
    </div>
  );
};
