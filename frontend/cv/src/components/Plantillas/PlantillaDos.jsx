import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { jwtDecode } from "jwt-decode";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#F4F4F4",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: "#333333", // Color oscuro para el encabezado
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 8,
    color: "#555555", // Color un poco más claro para los subencabezados
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666666", // Color aún más claro para el texto principal
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  column: {
    width: "48%",
    padding: 10,
    backgroundColor: "#FFFFFF", // Fondo blanco para las columnas
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 10,
  },
  emojiImage: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
    textloading: {
    fontSize: 40,
    marginBottom: 8,
    color: "black",
    fontWeight: "bold",
  },
    pageloading: {
    flexDirection: "column",
    backgroundColor: "#e6e6e6",
    padding: 40,
  },
});

const PlantillaDos = () => {
  const [userId, setUserId] = useState();
  const [userEducations, setUserEducations] = useState([]);
  const [userWorks, setUserWorks] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
    const [isPdfReady, setIsPdfReady] = useState(false);

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
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

         if (token) {
          const decoded = jwtDecode(token);
          const userIdToken = decoded.sub;
          setUserId(userIdToken);

          const response = await fetch(
            `http://localhost:3001/api/users`
          );

        if (response.ok) {
          const data = await response.json();

           const userfilter = data.filter(
              (user) => String(user.id) === String(userIdToken)
            );

            console.log("FILTER USERSSSSsssssss AAAAAAAAAAAAAAAAA", userfilter);

          setUsers(userfilter);
          setIsPdfReady(true);
        } else {
          console.error("Error al obtener users:", response.statusText);
        }
      }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    fetchUsers();
  }, []);
console.log("LOSSSS USERSSSSSSSSSSSSSSSSSSSSSS", users);


  return (
   <>
  {isPdfReady ? (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View>
             {users.map((user) => (
              <Text key={user.id} style={styles.text}>
                <Text style={styles.header}>{user.name} {user.last_name}</Text>
                <Text style={styles.header}>{"\n"}</Text>
            <Text style={styles.text}>
              <Image src="https://cdn.icon-icons.com/icons2/656/PNG/512/mail_email_message_electronic_online_web_icon-icons.com_59986.png" style={styles.emojiImage} />
              {user.email}
            </Text>
            <Text style={styles.header}>{"\n"}</Text>
            <Text style={styles.text}>
              <Image src="https://cdn.icon-icons.com/icons2/909/PNG/512/telephone_icon-icons.com_70849.png" style={styles.emojiImage} />
              {user.phone_number}
            </Text>
                </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.subHeader}>Work Experience</Text>
            <View style={styles.divider}></View>
            {userWorks.map((work) => (
              <Text key={work.id} style={styles.text}>
                {work.name} - {work.start_date} / {work.finish_date}
                {"\n"}
                {work.description}
              </Text>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.subHeader}>Education</Text>
            <View style={styles.divider}></View>
            {userEducations.map((education) => (
              <Text key={education.id} style={styles.text}>
                {education.name} - {education.start_date} / {education.finish_date}
                {"\n"}
                {education.institution_name}, {education.location}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.subHeader}>Projects</Text>
            <View style={styles.divider}></View>
            {userProjects.map((project) => (
              <Text key={project.id} style={styles.text}>
                {project.name}
                {"\n"}
                {project.description}
                {"\n"}
                {project.url}
              </Text>
            ))}
          </View>

          <View style={styles.column}>
            <Text style={styles.subHeader}>Skills</Text>
            <View style={styles.divider}></View>
            {userSkills.map((skill) => (
              <Text key={skill.id} style={styles.text}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.subHeader}>Social Links</Text>
            <View style={styles.divider}></View>
            {userLinks.map((userlink) => (
              <Text key={userlink.id} style={styles.text}>
                {userlink.url}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
     ) : (
      <Document>
      <Page size="A4" style={styles.page}>
      <View>
          <Text style={styles.subHeader}>Loading your resume...</Text>
      </View>
      </Page>
    </Document>
      )}
   </>
  );
};

export default PlantillaDos;
