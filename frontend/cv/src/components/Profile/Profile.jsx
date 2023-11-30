import React from "react";
import "./Profile.css";
import GetProjects from "../GetProjects/GetProjects";
import GetSkills from "../GetSkills/GetSkills";
import GetEducations from "../GetEducation/GetEducation";
import GetWorkExperiences from "../GetWorkExperiences/GetWorkExperiences";
import GetSocialLinks from "../GetSocialLinks/GetSocialLinks";

function Profile() {
  return (
    <div>
    
      <div className="contentProfile d-flex">
        <div className="skills">
          <h3 className="titulo">Skills</h3>
          
              <GetSkills />
         
        </div>
        <div className="education">
          <h3 className="titulo">Education</h3>
         
              <GetEducations />
      
        </div>
        <div className="work-experience">
          <h3 className="titulo">Work Experience</h3>
       
              <GetWorkExperiences />
        
        </div>
        <div className="projects">
          <h3 className="titulo">Projects</h3>
       
              <GetProjects />
     
        </div>
        <div className="projects">
          <h3 className="titulo">Social Link</h3>
     
              <GetSocialLinks />
      
        </div>
      </div>
    </div>
  );
}

export default Profile;
