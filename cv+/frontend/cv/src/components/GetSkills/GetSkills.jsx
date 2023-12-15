import React, { useState, useEffect } from "react";
import "../GetsCss/GetsCss.css";
import { useUser } from "../AccountTypes/UserContext";
import { useCompany } from "../AccountTypes/CompanyContext";

const GetSkills = ({ userId }) => {
  // Using custom hooks to get current user and company
  const { currUser } = useUser();
  const { currCompany } = useCompany();

  // States for storing data and managing the interface
  const [skills, setSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch skills when the component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/skills");

        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error("Error fetching skills:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Set user ID based on the passed prop or current user's ID
  const id = userId ? userId : currUser.id;

  // Filter skills belonging to the current user
  const userSkills = skills.filter(
    (skill) => skill.user_id.toString() === id.toString()
  );

  // Handle editing of a skill
  const handleEditSkill = (skillId) => {
    const skillToEdit = userSkills.find((skill) => skill.id === skillId);
    setEditedSkillName(skillToEdit.name);
    setEditingSkillId(skillId);
  };

  // Handle saving an edited skill
  const handleSaveSkill = async (skillId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/skills/${skillId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editedSkillName,
          }),
        }
      );
      
      if (response.ok) {
        const updatedSkills = skills.map((skill) => {
          if (skill.id === skillId) {
            return {
              ...skill,
              name: editedSkillName,
            };
          }
          return skill;
        });

        setSkills(updatedSkills);
        setEditingSkillId(null);
      } else {
        throw new Error("Failed to update skill");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Handle deleting a skill
  const handleDeleteSkill = async (skillId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/skills/${skillId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedSkills = skills.filter((skill) => skill.id !== skillId);
        setSkills(updatedSkills);
      } else {
        throw new Error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="containergets">
      {/* Show loader if isLoading is true */}
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        // Map through skills of the current user
        userSkills.map((skill) => (
          <div key={skill.id} className="Itemget">
            {/* Display the skill name */}
            <p className="letraget">Name: {skill.name}</p>

            {/* Show edit and delete buttons if user has permissions */}
            {currCompany ? (
              id.toString() === ""
            ) : id.toString() === currUser.id.toString() ? (
              <>
                {editingSkillId === skill.id ? (
                  <>
                    <input
                      type="text"
                      value={editedSkillName}
                      onChange={(e) => setEditedSkillName(e.target.value)}
                      className="inputget"
                    />
                    <button
                      onClick={() => handleSaveSkill(skill.id)}
                      className="buttonget"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSkillId(null)}
                      className="buttonget"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditSkill(skill.id)}
                      className="buttonEditget"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="buttonEliminarget"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default GetSkills;
