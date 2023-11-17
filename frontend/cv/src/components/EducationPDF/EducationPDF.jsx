import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const EducationsPDF = () => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/educations');

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

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.listContainer}>
                    {educations.map((education) => (
                        <Text key={education.id} style={styles.listItem}>
                            {`Name: ${education.name}\nInstitution: ${education.institution_name}\nLocation: ${education.location}\nStart date: ${education.start_date}\nFinish date: ${education.finish_date}\n\n`}
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

export default EducationsPDF;
