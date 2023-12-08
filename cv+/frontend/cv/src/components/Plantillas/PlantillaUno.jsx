import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { jwtDecode } from "jwt-decode";
import AddEducation1 from "../AddEducation/AddEducation";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
    padding: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  headerA: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555555",
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "black",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  column: {
    width: "48%",
  },
  columna: {
    width: "48%",
    backgroundColor: "#ffffff",
    minHeight: "100%",
    padding: 20,
    borderRadius: 5,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectiona: {
    backgroundColor: "#7C7979", 
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10,
  },
  emojiImage: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  logoImage: {
    width: 10,
    height: 10,
    borderRadius: 30,
    marginRight: 10,
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


const ProfilePDF = () => {
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
        setUserId(userIdToken)
        console.log(userIdToken);
        return userIdToken      
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
  
          const response = await fetch(`http://localhost:3001/api/work_experiences`);
  
          if (response.ok) {
            const worksdata = await response.json();
          
          console.log(userId)
          console.log("WORKS DATA",worksdata,"ES DE TIPO",typeof worksdata)
          const userWorks = worksdata.filter(work => String(work.user_id) === String(userIdToken) );
          
          console.log("FILTERRRRR:", userWorks);
  
          setUserWorks(userWorks)
              
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

        const userEducations = educationsData.filter(education => String(education.user_id) === String(userIdToken) );
   
      console.log("EDUUUU FILTERRRR:", userEducations);

          setUserEducations(userEducations)
            
        } else {
          console.error("Error al obtener educaciones:", response.statusText);
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

        const userProjects = projectsData.filter(project => String(project.user_id) === String(userIdToken) );
   
      console.log("EDUUUU FILTERRRR:", userProjects);

          setUserProjects(userProjects)
            
        } else {
          console.error("Error al obtener educaciones:", response.statusText);
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

        const userSkills = skillsData.filter(skill => String(skill.user_id) === String(userIdToken) );
   
      console.log("EDUUUU FILTERRRR:", userSkills);

          setUserSkills(userSkills)
            
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
 

        const response = await fetch(`http://localhost:3001/api/social_links`);

        if (response.ok) {
          const linksData = await response.json();

        const userLinks = linksData.filter(link => String(link.user_id) === String(userIdToken) );
   
      console.log("LINKSSSSS FILTERRRR:", userLinks);

          setUserLinks(userLinks)
            
        } else {
          console.error("Error al obtener SocialLinks:", response.statusText);
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

 
console.log("SOY LA EDUCA",userEducations);
console.log("SOY EL WORK", userWorks);
console.log("SOY EL PROJECT", userProjects);
console.log("SOY SKILL", userSkills);
console.log("SOY LINKKK", userLinks);

  return (
    <>
  {isPdfReady ? (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectiona}>
          <View>
             {users.map((user) => (
              <Text key={user.id} style={styles.text}>
                <Text style={styles.headerA}>{user.name} {user.last_name}</Text>
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

        <View style={styles.section}>
          <View style={styles.columna}>
          
            <Text style={styles.header}>Work Experience</Text>
            <View>
                  {userWorks.map((work) => (
                    <Text key={work.id}>
                    <Text style={styles.text}>{"\n"}</Text>
                      <Text style={styles.subHeader}>{work.name}</Text>
                      <Text style={styles.text}>{"\n"}</Text>
                      
                      <Text style={styles.text}>{work.description}</Text>
                      <Text style={styles.text}>{"\n"}</Text>
                      <Text style={styles.text}>{work.start_date}</Text>
                      <Text style={styles.text}>{" / "}</Text>
                      <Text style={styles.text}>{work.finish_date}</Text>
                      <Text style={styles.divider}></Text>
                    </Text>
                  ))}
                </View>
           
            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Projects</Text>
            <View>
                {userProjects.map((project) => (
                  <Text key={project.id}>
                  <Text style={styles.text}>{"\n"}</Text>
                    <Text style={styles.subHeader}>{project.name}</Text>
                    <Text style={styles.text}>{"\n"}</Text>
                    <Text style={styles.text}>{project.description}</Text>
                    <Text style={styles.text}>{"\n"}</Text>
                    <Text style={styles.text}>{project.url}</Text>
                   
                  </Text>
                ))}
              </View>

            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Social Links</Text>
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

          <View style={styles.column}>
            <Text style={styles.header}>Education</Text>
             <View>
                  {userEducations.map((education) => (
                    <Text key={education.id}>
                     <Text style={styles.text}>{"\n"}</Text>
                      <Text style={styles.subHeader}>{education.name}</Text>
                      <Text style={styles.text}>{"\n"}</Text>
                     
                      <Text style={styles.text}>{education.institution_name}</Text>
                      <Text style={styles.text}>{"\n"}</Text>
                      <Text style={styles.text}>{education.location}</Text>
                      <Text style={styles.text}>{"\n"}</Text>
                      <Text style={styles.text}>{education.start_date}</Text>
                      <Text style={styles.text}>{" / "}</Text>
                      <Text style={styles.text}>{education.finish_date}</Text>
                    </Text>
                  ))}
                </View>

            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Skills</Text>
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
    ) : (
      <Document>
      <Page size="A4" style={styles.page}>
      <View>
          <Text style={styles.headerA}>Loading your resume...</Text>
      </View>
      </Page>
    </Document>
      )}
   </>
  );
};

export default ProfilePDF;
