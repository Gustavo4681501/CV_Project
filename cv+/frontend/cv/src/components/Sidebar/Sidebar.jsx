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

        <CDBSidebarContent >
          <CDBSidebarMenu>
        
            <NavLink to={`User/Profile/${currUser.id}/AddProjects`}>
              <CDBSidebarMenuItem icon="table">Add information</CDBSidebarMenuItem>
            </NavLink>




            <NavLink to={`User/Profile/${currUser.id}/Resumes`}>
              <CDBSidebarMenuItem icon="table">
                Create resume
              </CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink to={`User/Profile/${currUser.id}/Vacancies`}>
              <CDBSidebarMenuItem icon="table">
                Vacancies to aply
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink to={`User/Profile/${currUser.id}/ShowMoreUsers`}>
              <CDBSidebarMenuItem icon="table">
                Show more users
              </CDBSidebarMenuItem>
            </NavLink> */}
            
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
