import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from "./components/AccountTypes/UserContext";
import NavbarComponent from "./components/Navbar/Navbar";
import UserAccount from "./pages/UserAccount/UserAccount";
import AboutUs from "./pages/About_us/About_us";
import Principal from "./pages/Principal/Principal";
import Login from "./components/Login/Login";
import CompanyAccount from "./pages/CompanyAccount/CompanyAccount";
import AddSkill from "./components/AddSkill/AddSkill";
import AddProject from "./components/Addproject/AddProject";
import Profile from "./components/Profile/Profile";
import AddWorkExperience from "./components/AddWorkExperience/AddWorkExperience";
import AddSocialLink from "./components/AddSocialLink/AddSocialLink";
import { PDFViewer } from "@react-pdf/renderer";
import NotFound from "./components/NotFound/NotFound";
import ProfilePDF from "./components/ProfilePDF/ProfilePDF";
import NavbarCompany from "./components/NavbarCompany/NavbarCompany";
import PostEducation from "./pages/PostEducation/PostEducation";
import Home from "./pages/Home/Home";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";


const AppContent = () => {
  const { currUser } = useUser();

  return (
    <div>
      {currUser ? (
        <div>
          <p>LOGGED</p>
          <p>Name: {currUser.name}</p>
          <p>Email: {currUser.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}

      <Router>
        <Routes>
          <Route path="/CompanyAccount" element={<CompanyAccount />} />
          <Route path="/UserAccount" element={<UserAccount />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Principal />} />
          <Route path="*" element={<NotFound />} />



          <Route path="/" element={<NavbarComponent />}>
            <Route
              path="/CreateResume"
              element={
                <PDFViewer style={{ width: "100%", height: "90vh" }}>
                  <ProfilePDF />
                </PDFViewer>
              }
            />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/PostEducation" element={<AddProject />} />
            <Route path="/Abotus" element={<AboutUs />} />
            <Route path="/AddWorkExperiences" element={<AddWorkExperience />} />
            <Route path="/AddSocialLinks" element={<AddSocialLink />} />
            <Route path="/AddSkills" element={<AddSkill />} />
            <Route path="/AddEducations" element={<PostEducation />} />
            <Route path="/home/:id" element={<Home />} />
          
          </Route>
        </Routes>
        <Routes>
          <Route path="/CompanyHome" element={<NavbarCompany />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppContent;
