import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import PlantillaUno from "../Plantillas/PlantillaUno";

import { useParams } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    padding:5,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    padding:5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    padding:5,
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    
  },
  column: {
    width: "90%",
    padding: 10,
  },
  columna: {
    width: "50%",
    backgroundColor: "#F6E8DD", // Color de fondo para la columna izquierda
    minHeight: "100%",
  },
  sectiona: {
    backgroundColor: "#D5B9A4",  // Color de fondo para la sección de Información Personal
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Puedes ajustar el color de la línea según tus preferencias
    marginBottom: 10, // Puedes ajustar la distancia entre la línea y el contenido siguiente
  },
  emojiImage: {
    width: 13, // ajusta el tamaño del emoji según sea necesario
    height: 13,
  },
});

// FETCHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH //





///////////////////////////

const ProfilePDF = () => {

  const { userId } = useParams();

  const [workExperience, setWorkExperience] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/work_experiences');

        if (response.ok) {
          const data = await response.json();
          setWorkExperience(data);
        } else {
          console.error('Error al obtener proyectos:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchWorks();
  }, [])

  const [educations, setEducations] = useState([]);

  useEffect(() => {
      const fetchEducations = async () => {
          try {
              const response = await fetch(`http://localhost:3001/api/educations/`);

              if (response.ok) {
                  const educationsData = await response.json();
                  setEducations(educationsData);
              } else {
                  console.error('Error al obtener educaciones:', response.statusText);
              }
          } catch (error) {
              console.error('Error de red:', error);
          }
      };

      fetchEducations();
  }, []);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
      const fetchProjects = async () => {
          try {
              const response = await fetch('http://localhost:3001/api/projects');

              if (response.ok) {
                  const projectsData = await response.json();
                  setProjects(projectsData);
              } else {
                  console.error('Error al obtener proyectos:', response.statusText);
              }
          } catch (error) {
              console.error('Error de red:', error);
          }
      };

      fetchProjects();
  }, []);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/skills');

        if (response.ok) {
          const skillsData = await response.json();
          setSkills(skillsData);
        } else {
          console.error('Error al obtener habilidades:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchSkills();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${1}`);

        if (response.ok) {
          const data = await response.json();

     
          setUsers(data);

        } else {
          console.error('Error al obtener proyectos:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchWorks();

    console.log(userId)
  }, [userId])



  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Información Personal */}
        <View style={styles.sectiona}>
          <View>
            <Text style={styles.header}>Valery Duarte Brenes</Text>
            <View style={styles.divider}></View>
            <Text style={styles.text}>
            <Image src="https://cdn.icon-icons.com/icons2/656/PNG/512/mail_email_message_electronic_online_web_icon-icons.com_59986.png" style={styles.emojiImage} /> john.doe@example.com
            </Text>
            <Text style={styles.text}>
              <Image src="https://cdn.icon-icons.com/icons2/909/PNG/512/telephone_icon-icons.com_70849.png" style={styles.emojiImage} /> 61639111
              
            </Text>
            {/* Agrega más información personal */}
          </View>
        </View>

        {/* Experiencia Laboral e Educación en Dos Columnas Abajo */}
        <View style={styles.section}>
          {/* Experiencia Laboral a la Izquierda */}
          <View style={styles.columna}>
            {/* <Text style={styles.header}>Work experience</Text>
            <View style={styles.divider}></View>
          <View style={styles.listContainer}>
          {workExperience.map((workexperience) => (
            <Text key={workexperience.id} style={styles.listItem}>
              {`Name: ${workexperience.name}\nDescription: ${workexperience.description}\nStart date: ${workexperience.start_date}\nFinish date: ${workexperience.finish_date}\n\n`}
            </Text>
          ))} 
        </View> */}
         <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.header}>Work experience</Text>
            <View style={styles.divider}></View>
            <Text style={styles.subHeader}>
              Desarrollador de software en XYZ Company
            </Text>
            <Text style={styles.text}>Description: ksjdhffffhfhhfhffhfh</Text>
            <Text style={styles.text}>15/01/2003- 23/11/2023</Text>
            
            {/* Agrega más experiencias laborales */}

            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            {/* <Text style={styles.header}>Projects</Text>
            <View style={styles.listContainer}>
                {projects.map((project) => (
                    <Text key={project.id} style={styles.listItem}>
                    {`Name: ${project.name}\nDescription: ${project.description}\n\n`}
                  </Text>
                ))}
            </View> */}
            <Text style={styles.header}>Projects</Text>
            <View style={styles.divider}></View>
            <Text style={styles.subHeader}>
              ToDoApp
            </Text>
            <Text style={styles.text}>Hacer ToDoXD</Text>
            <Text style={styles.text}>github.com</Text>

            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.header}>Social Links</Text>
             <View style={styles.divider}></View>
            <Text style={styles.text}>Facebook.com</Text>

          </View>

          {/* Educación a la Derecha */}
          <View style={styles.column}>
            <Text style={styles.header}>Education</Text>
            <View style={styles.divider}></View>
            {/* <View style={styles.divider}></View>
            <View style={styles.listContainer}>
                    {educations.map((education) => (
                        <Text key={education.id} style={styles.listItem}>
                            {`Name: ${education.name}\nInstitution: ${education.institution_name}\nLocation: ${education.location}\nStart date: ${education.start_date}\nFinish date: ${education.finish_date}\n\n`}
                        </Text>
                    ))}
                </View> */}
            <Text style={styles.subHeader}>
              Grado en Ingeniería Informática
            </Text>
            <Text style={styles.text}>Universidad ABC 💻 </Text>
            <Text style={styles.text}>Puntarenas</Text>
            <Text style={styles.text}>15/01/2003- 23/11/2023</Text>

            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.text}>{'\n'}</Text>
            <Text style={styles.header}>Skills</Text>
            <View style={styles.divider}></View>
            <Text style={styles.text}>Work under pressure</Text>


            {/* Agrega más información educativa */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProfilePDF;




    // <Document>
    //   <Page size={"A4"}>
    //     <View style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //       maxWidth: '900px',
    //       margin: '0 auto',
    //       padding: '20px',
    //     }}>
    //       <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>

    //         <Image
    //           style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
    //           src="<ruta_a_tu_imagen>" // Reemplaza con la ruta o URL real de la imagen
    //           alt="Profile_Picture"
    //         />
    //         <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>John Doe</Text>
    //         <Text style={{ fontSize: '18px', marginBottom: '10px' }}>Full Stack Developer</Text>
    //         <View className="social-links"></View>
    //       </View>
    //       <View className="contentProfile">
    //         <View className="skills">
    //           <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Skills</Text>
    //           <View>
    //             <Text>
    //               <SkillsPDF />
    //             </Text>
    //           </View>
    //         </View>
    //         <View className="education">
    //           <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Education</Text>
    //           <View>
    //             <Text>
    //               <EducationsPDF />
    //             </Text>
    //           </View>
    //         </View>
    //         <View className="work-experience">
    //           <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Work Experience</Text>
    //           <View>
    //             <Text>
    //               <WorkExperiencesPDF />
    //             </Text>
    //           </View>
    //         </View>
    //         <View className="projects">
    //           <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Projects</Text>
    //           <View>
    //             <Text>
    //               <ProjectsPDF />
    //             </Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </Page>
    // </Document>
