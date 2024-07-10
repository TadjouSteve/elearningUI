import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SaveComponent from "../../../../composants/SaveComponent";

export default function FormModule({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const requestURL = "/admin/module/";
   const [form, setForm] = useState(initialForm ? initialForm : {});

   return (
      <>
         <Container fluid>
            {save && (
               <SaveComponent
                  setSave={setSave}
                  requestURL={requestURL}
                  requestBody={form}
                  requestMethode={requestMethode ? requestMethode : "POST"}
                  requestParam={null}
                  setErrorServeur={setErrorServeur}
                  setError={setError}
                  redirected={true}
               />
            )}
            <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Titre du module en francais"
                        placeholder="Ex: Ce titre"
                        fullWidth
                        value={form.titre}
                        onChange={(e) => {
                           setForm({ ...form, titre: e.target.value });
                        }}
                     />
                  </Col>
               </div>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Titre du module en Anglais"
                        placeholder="Ex: this title"
                        fullWidth
                        color="error"
                        value={form.titreEn}
                        onChange={(e) => {
                           setForm({ ...form, titreEn: e.target.value });
                        }}
                     />
                  </Col>
               </div>

               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Description (version Francaise)"
                        placeholder=" ce module est dedie...."
                        multiline
                        rows={4}
                        fullWidth
                        value={form.description}
                        onChange={(e) => {
                           setForm({ ...form, description: e.target.value });
                        }}
                     />
                  </Col>
               </div>

               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Description (version Anglaise)"
                        placeholder=" this module is dedicated for...."
                        multiline
                        rows={4}
                        fullWidth
                        color="error"
                        value={form.descriptionEn}
                        onChange={(e) => {
                           setForm({ ...form, descriptionEn: e.target.value });
                        }}
                     />
                  </Col>
               </div>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="mon de l'image ilustrative"
                        fullWidth
                        value={form.nomImage}
                        onChange={(e) => {
                           setForm({ ...form, nomImage: e.target.value });
                        }}
                     />
                  </Col>
               </div>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Date de deblocage"
                        type="date"
                        fullWidth
                        value={form.dateDeblocage}
                        onChange={(e) => {
                           setForm({ ...form, dateDeblocage: e.target.value });
                        }}
                     />
                  </Col>
               </div>
            </Row>
         </Container>
      </>
   );
}
