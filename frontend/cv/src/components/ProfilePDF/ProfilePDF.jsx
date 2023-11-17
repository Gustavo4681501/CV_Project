import React from "react";
import SkillsPDF from "../SkillsPDF/SkillsPDF";
import WorkExperiencesPDF from "../WorkExperiencesPDF/WorkExperiencesPDF";
import ProjectsPDF from "../ProjectPDF/ProjectPDF";
import EducationsPDF from "../EducationPDF/EducationPDF";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";



function ProfilePDF() {
  return (
    <Document>
      <Page size={"A4"}>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '20px',
        }}>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          
            <Image
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              src="<ruta_a_tu_imagen>" // Reemplaza con la ruta o URL real de la imagen
              alt="Profile_Picture"
            />
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>John Doe</Text>
            <Text style={{ fontSize: '18px', marginBottom: '10px' }}>Full Stack Developer</Text>
            <View className="social-links"></View>
          </View>
          <View className="contentProfile">
            <View className="skills">
              <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Skills</Text>
              <View>
                <Text>
                  <SkillsPDF />
                </Text>
              </View>
            </View>
            <View className="education">
              <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Education</Text>
              <View>
                <Text>
                  <EducationsPDF />
                </Text>
              </View>
            </View>
            <View className="work-experience">
              <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Work Experience</Text>
              <View>
                <Text>
                  <WorkExperiencesPDF />
                </Text>
              </View>
            </View>
            <View className="projects">
              <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Projects</Text>
              <View>
                <Text>
                  <ProjectsPDF />
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ProfilePDF;