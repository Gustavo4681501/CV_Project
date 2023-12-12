import React, { useState, useEffect } from "react";
import "./GetSkills.css";
import { useUser } from "../AccountTypes/UserContext";

const GetSkills = ({ userId }) => {
  const { currUser } = useUser();

  const [skills, setSkills] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/skills");

        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error("Error al obtener skills:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const id = userId? userId : currUser.id ;

  const userSkills = skills.filter(
    (skill) => skill.user_id.toString() === id.toString()
  );

  const handleEditSkill = (skillId) => {
    const skillToEdit = userSkills.find((skill) => skill.id === skillId);
    setEditedSkillName(skillToEdit.name);
    setEditingSkillId(skillId);
  };

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
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        userSkills.map((skill) => (
          <div key={skill.id} className="Itemget">
            <p className="letraget">Name: {skill.name}</p>
            {id.toString() === currUser.id.toString() ? (
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
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingSkillId(null)}
                      className="buttonget"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditSkill(skill.id)}
                      className="buttonEditget"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="buttonEliminarget"
                    >
                      Eliminar
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
