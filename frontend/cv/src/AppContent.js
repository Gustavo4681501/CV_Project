import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar/Navbar";
import UserAccount from "./pages/User/User";
import AboutUs from "./pages/About_us/About_us";
import Principal from "./pages/Principal/Principal";
import Login from "./components/Login/Login";
import Company from "./pages/Company/Company";
import AddSkill from "./components/AddSkill/AddSkill";
import AddProject from "./components/Addproject/AddProject";
import Profile from "./components/Profile/Profile";
import AddWorkExperience from "./components/AddWorkExperience/AddWorkExperience";
import AddSocialLink from "./components/AddSocialLink/AddSocialLink";
import { PDFViewer } from "@react-pdf/renderer";
import NotFound from "./components/NotFound/NotFound";
import ProfilePDF from "./components/Plantillas/PlantillaUno";
import NavbarCompany from "./components/NavbarCompany/NavbarCompany";
// import PostEducation from "./pages/PostEducation/PostEducation";
// import CreateVacancy from "./components/CreateVacancy/CreateVacancy";
import Home from "./pages/Home/Home";
import CompanyHome from "./components/CompanyProfile/CompanyProfile";
// import AddRequirement from "./components/AddRequirement/AddRequirement";
import ShowVacancies from "./components/ShowVacancies/ShowVacancies";
import CreateJobVacancy from "./components/CreateJobVacancy/CreateJobVacancy";
import PlantillaUno from "./components/Plantillas/PlantillaUno";
import ShowVacancyRequirements from "./components/ShowVacancyRequirements/ShowVacancyRequirements";
import AddEducation from "./components/AddEducation/AddEducation";
// import { useCompany } from "./components/AccountTypes/CompanyContext";
// import { useUser } from "./components/AccountTypes/UserContext";
import ShowMyVacancies from "./components/ShowMyVacancies/ShowMyVacancies";
import PlantillaDos from "./components/Plantillas/PlantillaDos";
import PlantillaTres from "./components/Plantillas/PlantillaTres";
import EditProfile from "./components/EditProfile/EditProfile";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import CreateResume from "./components/CreateResume/CreateResume";
import ShowMoreUsers from "./components/ShowMoreUsers/ShowMoreUsers";
import ShowProfileUser from "./components/ShowProfileUser/ShowProfileUser";
import ShowApplicants from "./components/ShowApplicants/ShowApplicants";
import MyComments from "./components/MyComments/MyComments";
import Back from "./components/Back/Back";

const AppContent = () => {
  // const { currUser } = useUser();
  // const { currCompany } = useCompany();

  return (
    <div>
      {/* {currUser ? (
        <div>
          <p>LOGGED USER</p>
          <p>Name: {currUser.name}</p>
          <p>Email: {currUser.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}

      {currCompany ? (
        <div>
          <p>LOGGED COMPANY</p>
          <p>Name: {currCompany.name}</p>
          <p>Email: {currCompany.email}</p>
        </div>
      ) : (
        <p>No compan logged in</p>
      )} */}

      <Router>
        <Routes>
          <Route path="/Company" element={<Company />} />
          <Route path="/User" element={<UserAccount />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Principal />}></Route>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<NavbarComponent />}>
            <Route
              path="User/Profile/:id/CreateResume1"
              element={
                <>
                  <Back />
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <PlantillaUno />
                  </PDFViewer>
                </>
              }
            />

            <Route
              path="User/Profile/:id/CreateResume2"
              element={
                <>
                  <Back />
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <PlantillaDos />
                  </PDFViewer>
                </>
              }
            />

            <Route
              path="User/Profile/:id/CreateResume3"
              element={
                <>
                  <Back />
                  <PDFViewer style={{ width: "100%", height: "90vh" }}>
                    <PlantillaTres />
                  </PDFViewer>
                </>
              }
            />

            <Route
              path="User/Profile/:id/PostEducation"
              element={<AddProject />}
            />
            <Route path="/Abotus" element={<AboutUs />} />
            <Route
              path="User/Profile/:id/AddWorkExperiences"
              element={<AddWorkExperience />}
            />
            <Route path="User/Profile/:id/Home" element={<Home />} />
            <Route
              path="User/Profile/:id/AddSocialLinks"
              element={<AddSocialLink />}
            />
            <Route
              path="User/Profile/:id/Profile"
              element={<EditProfile />}
            />
            <Route
              path="User/Profile/:id/AddProjects"
              element={<AddProject />}
            />
            <Route path="User/Profile/:id/AddSkills" element={<AddSkill />} />
            <Route path="User/Profile/:id/Resumes" element={<CreateResume />} />
            <Route
              path="User/Profile/:id/AddProjects"
              element={<AddProject />}
            />
            <Route
              path="User/Profile/:id/AddEducations"
              element={<AddEducation />}
            />
            <Route
              path="User/Profile/:id/Vacancies"
              element={<ShowVacancies />}
            />
            <Route
              path="User/Profile/:id/Vacancies/:id/Requirements"
              element={<ShowVacancyRequirements />}
            />
            <Route
              path="User/Profile/:id/ShowMoreUsers"
              element={<ShowMoreUsers />}
            />
            <Route
              path="User/Profile/:id/ShowMoreUsers/ShowProfileUser/:userId"
              element={<ShowProfileUser />}
            />

            <Route
              path="User/Profile/:id/MyComments"
              element={<MyComments />}
            />

            <Route path="User/Profile/:id/" element={<Home />} />
          </Route>
          <Route path="/" element={<NavbarCompany />}>
            <Route path="Company/Profile/:id/Profile" element={<Profile />} />
            <Route
              path="Company/Profile/:id/CreateJobVacancy"
              element={<CreateJobVacancy />}
            />
            <Route
              path="Company/Profile/:id/ShowMyVacancies"
              element={<ShowMyVacancies />}
            />
            <Route
              path="Company/Profile/:id/ShowMyVacancies/:id/Requirements"
              element={<ShowVacancyRequirements />}
            />

            <Route
              path="Company/Profile/:id/ShowMyVacancies/:id/Applicants"
              element={<ShowApplicants />}
            />

            <Route
              path="Company/Profile/:id/ShowMoreUsers"
              element={<ShowMoreUsers />}
            />
            <Route
              path="Company/Profile/:id/ShowMoreUsers/ShowProfileUser/:userId"
              element={<ShowProfileUser />}
            />

            <Route
              path="Company/Profile/:id"
              element={<CompanyProfile />}
            ></Route>
            <Route path="Company/Profile/:id/Home" element={<CompanyHome />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppContent;
