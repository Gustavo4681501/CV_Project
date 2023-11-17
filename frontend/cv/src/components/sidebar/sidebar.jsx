import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
            <NavLink to="/Profile">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/AddProjects">
              <CDBSidebarMenuItem icon="table">Add projects</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/AddSkills">
              <CDBSidebarMenuItem icon="table">Add skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/PostEducation">
              <CDBSidebarMenuItem icon="table">
                Add Educations
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/AddWorkExperiences">
              <CDBSidebarMenuItem icon="table">
                Add work experiences
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/AddSocialLinks">
              <CDBSidebarMenuItem icon="table">
                Add social links
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;

