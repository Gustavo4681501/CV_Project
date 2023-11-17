import React from "react";
import "./Profile.css";
import GetProjects from "../GetProjects/GetProjects";
import GetSkills from "../GetSkills/GetSkills";
import GetEducations from "../GetEducation/GetEducation";
import GetWorkExperiences from "../GetWorkExperiences/GetWorkExperiences";

function Profile() {
  return (
    <div className="ProfileWeb">
      <div className="profile">
        <img
          className="profile-pic"
          src="https://via.placeholder.com/150"
          alt="Profile_Picture"
        />
        <h1>John Doe</h1>
        <h2>Full Stack Developer</h2>
        <div className="social-links"></div>
      </div>
      <div className="contentProfile d-flex">
        <div className="skills">
          <h3>Skills</h3>
          <ul>
            <li>
              <GetSkills />
            </li>
          </ul>
        </div>
        <div className="education">
          <h3>Education</h3>
          <ul>
            <li>
              <GetEducations />
            </li>
          </ul>
        </div>
        <div className="work-experience">
          <h3>Work Experience</h3>
          <ul>
            <li>
              <GetWorkExperiences />
            </li>
          </ul>
        </div>
        <div className="projects">
          <h3>Projects</h3>
          <ul>
            <li>
              <GetProjects />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;