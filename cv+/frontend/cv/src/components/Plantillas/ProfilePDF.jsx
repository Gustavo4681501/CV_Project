import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { jwtDecode } from "jwt-decode";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10, // Ajusta el espacio interno de la página
  },
  header: {
    fontSize: 20, // Ajusta el tamaño de la fuente
    marginBottom: 8, // Ajusta el espacio después del encabezado
  },
  subHeader: {
    fontSize: 14, // Ajusta el tamaño de la fuente
    marginBottom: 6, // Ajusta el espacio después del subencabezado
  },
  text: {
    fontSize: 10, // Ajusta el tamaño de la fuente
    marginBottom: 3, // Ajusta el espacio después del texto
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10, // Ajusta el espacio antes de la sección
  },
  columna: {
    width: "48%", // Ajusta el ancho según tus preferencias
    backgroundColor: "#F6E8DD",
    minHeight: "100%",
    padding: 8, // Ajusta el espacio interno de cada columna
  },
  sectiona: {
    backgroundColor: "#D5B9A4",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10, // Ajusta el espacio interno de la sección
    marginBottom: 10, // Ajusta el espacio después de la sección
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 5, // Ajusta el espacio después del divisor
  },
  emojiImage: {
    width: 10, // Ajusta el tamaño de la imagen
    height: 10, // Ajusta el tamaño de la imagen
  },
});

const ProfilePDF = () => {
  const [userId, setUserId] = useState();
  const [userEducations, setUserEducations] = useState([]);
  const [userWorks, setUserWorks] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userIdToken = decoded.sub;
        setUserId(userIdToken);
        console.log(userIdToken);
        return userIdToken;
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);
          console.log("userIdToken:", userIdToken);

          const response = await fetch(
            `http://localhost:3001/api/work_experiences`
          );

          if (response.ok) {
            const worksdata = await response.json();

            console.log("WORKS DATA", worksdata, "ES DE TIPO", typeof worksdata);
            const userWorks = worksdata.filter(
              (work) => String(work.user_id) === String(userIdToken)
            );

            console.log("FILTERRRRR:", userWorks);

            setUserWorks(userWorks);
          } else {
            console.error("Error al obtener educaciones:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchWorks();
  }, [userId]);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);

          const response = await fetch(`http://localhost:3001/api/educations`);

          if (response.ok) {
            const educationsData = await response.json();

            const userEducations = educationsData.filter(
              (education) => String(education.user_id) === String(userIdToken)
            );

            console.log("EDUUUU FILTERRRR:", userEducations);

            setUserEducations(userEducations);
          } else {
            console.error(
              "Error al obtener educaciones:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchEducations();
  }, [userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);

          const response = await fetch(`http://localhost:3001/api/projects`);

          if (response.ok) {
            const projectsData = await response.json();

            const userProjects = projectsData.filter(
              (project) => String(project.user_id) === String(userIdToken)
            );

            console.log("EDUUUU FILTERRRR:", userProjects);

            setUserProjects(userProjects);
          } else {
            console.error(
              "Error al obtener educaciones:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchProjects();
  }, [userId]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);

          const response = await fetch(`http://localhost:3001/api/skills`);

          if (response.ok) {
            const skillsData = await response.json();

            const userSkills = skillsData.filter(
              (skill) => String(skill.user_id) === String(userIdToken)
            );

            console.log("EDUUUU FILTERRRR:", userSkills);

            setUserSkills(userSkills);
          } else {
            console.error("Error al obtener skills:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchSkills();
  }, [userId]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);

          const response = await fetch(
            `http://localhost:3001/api/social_links`
          );

          if (response.ok) {
            const linksData = await response.json();

            const userLinks = linksData.filter(
              (link) => String(link.user_id) === String(userIdToken)
            );

            console.log("LINKSSSSS FILTERRRR:", userLinks);

            setUserLinks(userLinks);
          } else {
            console.error(
              "Error al obtener SocialLinks:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchLinks();
  }, [userId]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users`);

        if (response.ok) {
          const data = await response.json();

          setUsers(data);
        } else {
          console.error("Error al obtener users:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchWorks();
  }, []);

  console.log("SOY LA EDUCA", userEducations);
  console.log("SOY EL WORK", userWorks);
  console.log("SOY EL PROJECT", userProjects);
  console.log("SOY SKILL", userSkills);
  console.log("SOY LINKKK", userLinks);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Información Personal */}
        <View style={styles.sectiona}>
          <View>
            <Text style={styles.header}>Valery Duarte Brenes</Text>
            <Text style={styles.text}>
              <Image
                src="https://cdn.icon-icons.com/icons2/656/PNG/512/mail_email_message_electronic_online_web_icon-icons.com_59986.png"
                style={styles.emojiImage}
              />{" "}
              john.doe@example.com
            </Text>
            <Text style={styles.text}>
              <Image
                src="https://cdn.icon-icons.com/icons2/909/PNG/512/telephone_icon-icons.com_70849.png"
                style={styles.emojiImage}
              />{" "}
              61639111
            </Text>
          </View>
        </View>

        {/* Experiencia Laboral y Educación en Dos Columnas Abajo */}
        <View style={styles.section}>
          {/* Experiencia Laboral a la Izquierda */}
          <View style={styles.columna}>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.header}>Work Experience</Text>
            <View style={styles.divider}></View>
            <View>
              {userWorks.map((work) => (
                <Text key={work.id}>
                  <Text style={styles.subHeader}>{work.name}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{work.description}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>
                    {work.start_date} / {work.finish_date}
                  </Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                </Text>
              ))}
            </View>

            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.header}>Projects</Text>
            <View style={styles.divider}></View>
            <View>
              {userProjects.map((project) => (
                <Text key={project.id}>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.subHeader}>{project.name}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{project.description}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{project.url}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  
                </Text>
              ))}
            </View>

            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.header}>Social Links</Text>
            <View style={styles.divider}></View>
            <View>
              {userLinks.map((userlink) => (
                <Text key={userlink.id}>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.subHeader}>{userlink.url}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                </Text>
              ))}
            </View>
          </View>

          {/* Educación a la Izquierda */}
          <View style={styles.columna}>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.header}>Education</Text>
            <View style={styles.divider}></View>
            <View>
              {userEducations.map((education) => (
                <Text key={education.id}>
                  <Text style={styles.subHeader}>{education.name}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{education.institution_name}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{education.location}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>
                    {education.start_date} / {education.finish_date}
                  </Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                </Text>
              ))}
            </View>

            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.text}>{"\n"}</Text>
            <Text style={styles.header}>Skills</Text>
            <View style={styles.divider}></View>
            <View>
              {userSkills.map((skill) => (
                <Text key={skill.id}>
                  <Text style={styles.text}>{skill.name}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                  <Text style={styles.text}>{"\n"}</Text>
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProfilePDF;
