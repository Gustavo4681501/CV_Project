import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const WorkExperiencesPDF = () => {
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
  }, []);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.listContainer}>
          {workExperience.map((workexperience) => (
            <Text key={workexperience.id} style={styles.listItem}>
              {`Name: ${workexperience.name}\nDescription: ${workexperience.description}\nStart date: ${workexperience.start_date}\nFinish date: ${workexperience.finish_date}\n\n`}
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

export default WorkExperiencesPDF;
