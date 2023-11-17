import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ProjectsPDF = () => {
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

    return (
        <Document>
            <Page style={styles.page}>
            <View style={styles.listContainer}>
                {projects.map((project) => (
                    <Text key={project.id} style={styles.listItem}>
                    {`Name: ${project.name}\nDescription: ${project.description}\n\n`}
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



export default ProjectsPDF;