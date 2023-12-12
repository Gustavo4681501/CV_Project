import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useCompany } from "../AccountTypes/CompanyContext";

const SidebarCompany = () => {
  const { currCompany } = useCompany();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }} className="sidebar">
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
        className={isSidebarOpen ? "active" : ""}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to={`/Company/Profile/${currCompany.id}`}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`/Company/Profile/${currCompany.id}/CreateJobVacancy`}>
              <CDBSidebarMenuItem icon="table">Add Job Vacancy</CDBSidebarMenuItem>
            </NavLink>

          

            <NavLink to={`/Company/Profile/${currCompany.id}/ShowMyVacancies`}>
              <CDBSidebarMenuItem icon="chart-line">
              Show my vacancies
              </CDBSidebarMenuItem>
            </NavLink>

           

            <NavLink to={`Company/Profile/${currCompany.id}/ShowMoreUsers`}>
              <CDBSidebarMenuItem icon="exclamation-circle">
                Show more users
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SidebarCompany;