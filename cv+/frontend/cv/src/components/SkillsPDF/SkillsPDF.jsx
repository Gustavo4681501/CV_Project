import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const SkillsPDF = () => {
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

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.listContainer}>
          {skills.map((skill) => (
            <Text key={skill.id} style={styles.listItem}>
              {`${skill.name}\n`}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  listContainer: {
    flexDirection: 'column',
    margin: 10,
  },
  listItem: {
    marginBottom: 5,
  },
});

export default SkillsPDF;
