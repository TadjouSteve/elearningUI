import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import SaveComponent from "../../../../../composants/SaveComponent";

export default function FormQCM({ initialForm, setErrorServeur, setError, setSave, save, requestMethode }) {
   const [form, setForm] = useState(initialForm ? initialForm : {});
   const requestURL = "/admin/qcm/";
   return (
      <>
         <Container fluid>
            <Row style={{ backgroundColor: "white", borderRadius: 5, margin: 10, padding: 10 }}>
               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TextField
                     label="intitule En Francais "
                     placeholder="Ex: Ce titre"
                     fullWidth
                     value={form.intitule}
                     onChange={(e) => {
                        setForm({ ...form, intitule: e.target.value });
                     }}
                  />
               </div>

               <div style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  <TextField
                     label="intitule En Anglais "
                     placeholder="Ex: Ce titre"
                     fullWidth
                     value={form.intituleEn}
                     onChange={(e) => {
                        setForm({ ...form, intituleEn: e.target.value });
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
            </Row>
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
