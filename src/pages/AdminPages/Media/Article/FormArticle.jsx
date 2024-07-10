import React, { useState } from "react";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { useFetch } from "../../../../utils/hooks/FetchData";
import SaveComponent from "../../../../composants/SaveComponent";

export default function FormArticle({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const requestURL = "/admin/media/article/";
   const [idModule, setIdModule] = useState(initialForm ? (initialForm.rubrique ? initialForm.rubrique.id : -1) : -1);
   const [form, setForm] = useState(initialForm ? initialForm : {});

   const { isLoading, data, error } = useFetch(`/metadata/rubriques/`, "GET", null);
   //console.log("Meta data == ", data);
   const handleSelectChange = (event) => {
      const rubrique = data.find((rubrique) => rubrique.nom === event.target.value);
      console.log("rubrique", rubrique);
      setIdModule(rubrique.id);
      setForm({ ...form, rubrique: rubrique });
   };

   return (
      <Container fluid>
         {save && (
            <SaveComponent
               setSave={setSave}
               requestURL={requestURL}
               requestBody={form}
               requestMethode={requestMethode ? requestMethode : "POST"}
               requestParam={idModule}
               setErrorServeur={setErrorServeur}
               setError={setError}
               redirected={true}
            />
         )}
         {isLoading ? (
            <div style={{ marginLeft: "40%" }}>
               <CircularProgress size={40} />
            </div>
         ) : error ? (
            <MessageErrorServeur />
         ) : (
            <>
               <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 20, marginTop: 10 }}>
                     <FormControl fullWidth>
                        <InputLabel id="rubrique-label">Rubrique</InputLabel>
                        <Select
                           label="Rubrique"
                           labelId="rubrique-label"
                           value={form.rubrique?.nom || ""}
                           onChange={handleSelectChange}
                        >
                           {data &&
                              data.length &&
                              data.map((rubrique) => (
                                 <MenuItem key={rubrique.id} value={rubrique.nom}>
                                    {rubrique.nom}
                                 </MenuItem>
                              ))}
                        </Select>
                     </FormControl>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                     <Col>
                        <TextField
                           label="Sur titre"
                           placeholder="Ex: Nouvelle entreprise crée au cameroun"
                           fullWidth
                           value={form.surTitre}
                           onChange={(e) => {
                              setForm({ ...form, surTitre: e.target.value });
                           }}
                        />
                     </Col>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                     <Col>
                        <TextField
                           label="Titre de l'article"
                           placeholder="Ex: Nouvelle entreprise crée au cameroun"
                           fullWidth
                           multiline
                           rows={2}
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
                           label="Sous Titre"
                           placeholder="Ex: L'essort des nouvelles entreprise au cameroun"
                           fullWidth
                           multiline
                           rows={5}
                           value={form.sousTitre}
                           onChange={(e) => {
                              setForm({ ...form, sousTitre: e.target.value });
                           }}
                        />
                     </Col>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                     <Col>
                        <TextField
                           label="Contenue textuel de l'article"
                           placeholder="le texte de l'article ici...."
                           multiline
                           rows={20}
                           fullWidth
                           value={form.texte}
                           onChange={(e) => {
                              setForm({ ...form, texte: e.target.value });
                           }}
                        />
                     </Col>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                     <Col>
                        <TextField
                           label="Nom de l'auteur"
                           placeholder="Ex: ..."
                           fullWidth
                           value={form.auteur}
                           onChange={(e) => {
                              setForm({ ...form, auteur: e.target.value });
                           }}
                        />
                     </Col>
                     <Col>
                        <TextField
                           label="Tritre de l'hauteur"
                           placeholder="Ex: 1"
                           fullWidth
                           value={form.titreAuteur}
                           onChange={(e) => {
                              setForm({ ...form, titreAuteur: e.target.value });
                           }}
                        />
                     </Col>
                  </div>
               </Row>
            </>
         )}
      </Container>
   );
}
