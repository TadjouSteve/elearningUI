import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SaveComponent from "../../../../composants/SaveComponent";
import { CircularProgress, InputLabel, FormControl, MenuItem, Select, TextField, Button } from "@mui/material";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";

export default function FormCour({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const [filter, setFilter] = useState(null);
   const [update, setUpdate] = useState(false);
   const [showEdit, setShowEdit] = useState(true);

   const { isLoading, data, error } = useFetch(`/admin/modules`, "GET", null, filter, update);
   const requestURL = "/admin/chapitre/";
   const [form, setForm] = useState(initialForm ? initialForm : {});
   console.log("List module == ", data);
   const handleSelectChange = (event) => {
      console.log(" target value ==", event.target.value);
      let module = data.find((module) => module.idModule === event.target.value);
      console.log("module", module);
      //setIdModule(module.id);
      setForm({ ...form, module: module });
   };
   return (
      <>
         <Container fluid>
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
                           <InputLabel id="rubrique-label">Module de formation</InputLabel>
                           <Select
                              label="Rubrique"
                              labelId="rubrique-label"
                              value={form.module?.idModule || ""}
                              onChange={handleSelectChange}
                           >
                              {data &&
                                 data.length &&
                                 data.map((module) => (
                                    <MenuItem key={module.idModule} value={module.idModule}>
                                       {module.titre}
                                    </MenuItem>
                                 ))}
                           </Select>
                        </FormControl>
                     </div>
                  </Row>

                  <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="Titre "
                           placeholder="Ex: Ce titre"
                           fullWidth
                           value={form.titre}
                           onChange={(e) => {
                              setForm({ ...form, titre: e.target.value });
                           }}
                        />
                     </div>
                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="preanbule"
                           placeholder="Ex: this title"
                           fullWidth
                           multiline
                           rows={3}
                           value={form.preanbule}
                           onChange={(e) => {
                              setForm({ ...form, preanbule: e.target.value });
                           }}
                        />
                     </div>

                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="Description "
                           placeholder=" Description"
                           multiline
                           rows={3}
                           fullWidth
                           value={form.description}
                           onChange={(e) => {
                              setForm({ ...form, description: e.target.value });
                           }}
                        />
                     </div>

                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="lien de l'image illustrative"
                           fullWidth
                           value={form.image}
                           onChange={(e) => {
                              setForm({ ...form, image: e.target.value });
                           }}
                        />
                     </div>
                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="lien de la video principale"
                           fullWidth
                           value={form.video}
                           onChange={(e) => {
                              setForm({ ...form, video: e.target.value });
                           }}
                        />
                     </div>

                     <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                        <TextField
                           label="Ordre dans dans le module (positionnement)"
                           fullWidth
                           type="number"
                           value={form.ordre}
                           onChange={(e) => {
                              setForm({ ...form, ordre: e.target.value });
                           }}
                        />
                     </div>
                  </Row>

                  <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
                     {showEdit ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                           <Button
                              onClick={() => {
                                 setShowEdit(false);
                              }}
                              variant="contained"
                              color="warning"
                           >
                              Voir le rendu final
                           </Button>
                           <TextField
                              label="Texte"
                              placeholder="Texte du cour"
                              multiline
                              rows={15}
                              fullWidth
                              value={form.texte}
                              onChange={(e) => {
                                 setForm({ ...form, texte: e.target.value });
                              }}
                           />
                        </div>
                     ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                           <Button
                              onClick={() => {
                                 setShowEdit(true);
                              }}
                              variant="contained"
                              color="success"
                           >
                              Editer le cour
                           </Button>
                           <p
                              dangerouslySetInnerHTML={{ __html: form.texte }}
                              style={{
                                 minHeight: "300px",
                                 border: "2px solid gray",
                                 padding: 5,
                                 paddingLeft: 8,
                                 paddingRight: 8,
                                 minWidth: "60%",
                                 borderRadius: 5,
                              }}
                              className="texteCour"
                           ></p>
                        </div>
                     )}
                  </Row>
               </>
            )}
         </Container>
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
      </>
   );
}
