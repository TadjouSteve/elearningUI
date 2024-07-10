import { TextField } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SaveComponent from "../../../../composants/SaveComponent";

export const FormRubrique = ({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) => {
   const requestURL = "/admin/media/rubrique/";
   const [form, setForm] = useState(initialForm ? initialForm : {});

   const setNom = (e) => {
      setForm({ ...form, nom: e.target.value });
   };

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
                        label="Nom de la Rubrique"
                        placeholder="Ex: Afrique"
                        fullWidth
                        value={form.nom}
                        onChange={(e) => setNom(e)}
                     />
                  </Col>
               </div>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Categorie"
                        placeholder="Ex: ..."
                        fullWidth
                        value={form.categorie}
                        onChange={(e) => {
                           setForm({ ...form, categorie: e.target.value });
                        }}
                     />
                  </Col>
                  <Col>
                     <TextField
                        label="Niveau d'ordre"
                        placeholder="Ex: 1"
                        fullWidth
                        type="number"
                        value={form.ordre}
                        onChange={(e) => {
                           setForm({ ...form, ordre: e.target.value });
                        }}
                     />
                  </Col>
               </div>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <Col>
                     <TextField
                        label="Description"
                        placeholder=" cette rubrique est pour...."
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
            </Row>
         </Container>
      </>
   );
};
