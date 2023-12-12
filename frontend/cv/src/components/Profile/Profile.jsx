import React from "react";
import "./Profile.css";
import GetProjects from "../GetProjects/GetProjects";
import GetSkills from "../GetSkills/GetSkills";
import GetEducations from "../GetEducation/GetEducation";
import GetWorkExperiences from "../GetWorkExperiences/GetWorkExperiences";
import GetSocialLinks from "../GetSocialLinks/GetSocialLinks";

function Profile({ userId }) {
  return (
    <div>
      <div className="contentProfile">
        <div className="skillsContent">
          <h3 className="titulo">Skills</h3>
          
          <GetSkills userId={userId} />
      
        </div>
        <div className="educationContent">
          <h3 className="titulo">Education</h3>

          <GetEducations userId={userId} />
        </div>
        <div className="workContent">
          <h3 className="titulo">Work Experience</h3>

          <GetWorkExperiences userId={userId} />
        </div>
        <div className="projectsContent">
          <h3 className="titulo">Projects</h3>

          <GetProjects userId={userId} />
        </div>
        <div className="socialLinkContent">
          <h3 className="titulo">Social Link</h3>

          <GetSocialLinks userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
