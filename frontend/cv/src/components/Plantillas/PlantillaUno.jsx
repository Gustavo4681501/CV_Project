import React, { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useParams } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    padding: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  headerA: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333333",
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#555555",
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
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
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
});

const ProfilePDF = () => {
  // ... (código anterior)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectiona}>
          <View>
            <Text style={styles.headerA}>Valery Duarte Brenes</Text>
            <Text style={styles.text}>
              <Image src="https://cdn.icon-icons.com/icons2/656/PNG/512/mail_email_message_electronic_online_web_icon-icons.com_59986.png" style={styles.logoImage} />
              vale@gmail.com
            </Text>
            <Text style={styles.text}>
              <Image src="https://cdn.icon-icons.com/icons2/909/PNG/512/telephone_icon-icons.com_70849.png" style={styles.emojiImage} />
              61639111
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.columna}>
            <Text style={styles.header}>Work Experience</Text>
            <View style={styles.divider}></View>
            <Text style={styles.subHeader}>
              Desarrollador de Software en XYZ Company
            </Text>
            <Text style={styles.text}>Proyectos de desarrollo de software.</Text>
            <Text style={styles.text}>15/01/2003 - 23/11/2023</Text>

            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Projects</Text>
            <View style={styles.divider}></View>
            <Text style={styles.subHeader}>
              ToDoApp
            </Text>
            <Text style={styles.text}>Desarrollo de una aplicación ToDo.</Text>
            <Text style={styles.text}>GitHub: github.com/todoapp</Text>

            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Social Links</Text>
            <View style={styles.divider}></View>
            <Text style={styles.text}>Facebook: facebook.com/johndoe</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.header}>Education</Text>
            <View style={styles.divider}></View>
            <Text style={styles.subHeader}>
              Grado en Ingeniería Informática
            </Text>
            <Text style={styles.text}>Universidad ABC 💻 </Text>
            <Text style={styles.text}>Puntarenas</Text>
            <Text style={styles.text}>15/01/2003 - 23/11/2023</Text>

            <Text style={styles.divider}></Text>

            <Text style={styles.header}>Skills</Text>
            <View style={styles.divider}></View>
            <Text style={styles.text}>Trabajo bajo presión</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProfilePDF;
