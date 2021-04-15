import React from "react";
import { Sidebar, sidebarTypes } from "../Main_components/Sidebar";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../state/sidebarSlice";
import { Footer } from "../Main_components/Footer";
export const BasePage = () => {
  const opened = useSelector(selectSidebarOpen);
  return (
    <React.Fragment>
      <div className="mainPageContainer">
        <Sidebar type={sidebarTypes.Org} />
        <main
          className={opened ? "contentContainer dimmed" : "contentContainer"}
        >
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
};
