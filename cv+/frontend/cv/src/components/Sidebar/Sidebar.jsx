import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useUser } from "../AccountTypes/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currUser } = useUser();

  return (
    <div style={{ display: "flex", height: "100vh" }} className="sidebar">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader
          prefix={
            <i
              className="fa fa-bars fa-large"
              onClick={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
            ></i>
          }
        >
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
            <NavLink to={`User/Profile/${currUser.id}/Profile`}>
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/EditProfile`}>
              <CDBSidebarMenuItem icon="table">Edit Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/AddProjects`}>
              <CDBSidebarMenuItem icon="table">Add projects</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/AddSkills`}>
              <CDBSidebarMenuItem icon="table">Add skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/AddEducations`}>
              <CDBSidebarMenuItem icon="table">
                Add Educations
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/AddWorkExperiences`}>
              <CDBSidebarMenuItem icon="table">
                Add work experiences
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/AddSocialLinks`}>
              <CDBSidebarMenuItem icon="table">
                Add social links
              </CDBSidebarMenuItem>
            </NavLink>
               <NavLink to={`User/Profile/${currUser.id}/Resumes`}>
              <CDBSidebarMenuItem icon="table">
                Create resume
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/Vacancies`}>
              <CDBSidebarMenuItem icon="table">
                Vacancies to aply
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to={`User/Profile/${currUser.id}/ShowMoreUsers`}>
              <CDBSidebarMenuItem icon="table">
                Show more users
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
