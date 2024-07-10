import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { Container, Row, Table } from "react-bootstrap";
import { Button, CircularProgress } from "@mui/material";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { chapitre } from "../../../../../utils/data";

export default function ShowCourAdmin() {
   const { idChapitre } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/cour/${idChapitre}`, "GET", null, null, update);

   const handleModifierClick = () => {
      // Logique pour gérer le clic sur le bouton "Modifier"
      navigation(`/cour/alter/${idChapitre}`);
   };
   return (
      <>
         <div
            className="headerPage"
            style={{
               backgroundColor: "#17bd08cc",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}
         >
            <div
               id="Links"
               style={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: "500",
                  color: "white",
               }}
            >
               <span>
                  Cour <span>{data && data.chapitre ? `${data.chapitre.titre}` : null}</span>
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/cours"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Cours{" "}
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/cour/" + idChapitre} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     {data && data.chapitre ? `${data.chapitre.titre}` : null}{" "}
                  </Link>
               </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
               <Button variant="contained" onClick={handleModifierClick} color="success">
                  Modifier
               </Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation(-1);
                  }}
                  color="error"
               >
                  Bloquer
               </Button>
            </div>
         </div>
         <Container fluid style={{ margin: 0, padding: 0 }}>
            {/* Your component content goes here */}
            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  <InformationGeneral formChapitre={data} />
                  <ListBlock chapitre={data?.chapitre} />
                  <ListQCM listQcm={data?.chapitre.qcms} />
               </>
            )}
         </Container>{" "}
      </>
   );
}

const InformationGeneral = ({ formChapitre }) => {
   //console.log("formViewChapitre == ", formChapitre);
   let chapitre = formChapitre ? formChapitre.chapitre : {};
   let chapitreEn = formChapitre ? formChapitre.chapitreEn : {};

   return (
      <>
         <Row style={{ margin: 10, padding: 5 }}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 5,
               }}
            >
               <span>
                  <span style={{ fontWeight: 600 }}>Module de Formation : </span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "brown" }} onClick={() => {}}>
                     {" "}
                     {chapitre.module?.titre}
                  </span>
               </span>
            </div>
         </Row>
         <Row style={{ margin: 10, padding: 5 }}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 5,
               }}
            >
               <div name="info_static" style={{ display: "flex", flexDirection: "column", flex: 1, padding: 5 }}>
                  <span>
                     <span style={{ fontWeight: 600 }}>Titre : </span>
                     <span style={{ fontSize: 18, fontWeight: 700 }}> {chapitre.titre}</span>
                  </span>

                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Description : </span>
                     {chapitre.description}
                  </span>

                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Preanbule : </span>
                     {chapitre.preanbule}
                  </span>

                  <span style={{ marginTop: 3 }}>
                     <span style={{ fontWeight: 600 }}>Date de Creation : </span>
                     {new Date(chapitre.dateAjout).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                     })}
                  </span>

                  <span style={{ marginTop: 10, color: "green" }}>
                     <span style={{ fontWeight: 500 }}>url de l'image desciptive : </span>
                     {chapitre.image}
                  </span>

                  <span style={{ marginTop: 2, color: "green" }}>
                     <span style={{ fontWeight: 500 }}>lien de la video de presentation : </span>
                     {chapitre.video}
                  </span>
               </div>

               <div
                  name="Texte principale"
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     //flex: 1,
                     borderTop: "solid 4px black",
                     padding: 5,
                     paddingTop: 10,
                  }}
               >
                  <div>
                     <spam style={{ fontWeight: 700, color: "gray" }}>Texte Principal</spam>
                  </div>
                  <div>
                     <p
                        dangerouslySetInnerHTML={{ __html: chapitre.texte }}
                        style={{ whiteSpace: "pre-wrap", textAlign: "justify", marginTop: 10 }}
                     ></p>
                  </div>
               </div>
            </div>
         </Row>
      </>
   );
};

const ListBlock = ({ chapitre }) => {
   console.log("chapitre == ", chapitre);
   let blocs = chapitre && chapitre.blocs ? chapitre.blocs : [];

   return (
      <>
         <Row style={{ margin: 10, padding: 5 }}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 5,
               }}
            >
               <h3>liste des sections presents dans ce cour</h3>
               {blocs?.length === 0 ? (
                  <span style={{ fontSize: 17 }}>Ce coours ne contient aucune section...!</span>
               ) : (
                  <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                     <thead
                        className="header"
                        style={{
                           position: "sticky",
                           top: 0,
                           background: "white",
                        }}
                     >
                        <tr>
                           <th>N°</th>
                           <th>Titre</th>
                           <th>video ?</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {blocs.map((bloc, index) => (
                           <tr key={bloc.id} style={{ height: "40px" }}>
                              <td>{index + 1}</td>
                              <td>{bloc.titre}</td>
                              <td>
                                 <span style={{ color: bloc.video ? "green" : "#000", fontWeight: 700, fontSize: 12 }}>
                                    {bloc.video ? "oui" : "Non"}
                                 </span>
                              </td>
                              <td>
                                 <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                    <Button variant="outlined" size="small" color="info" sx={{ fontSize: 10 }}>
                                       Voir plus
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               )}
            </div>
         </Row>
      </>
   );
};

const ListQCM = ({ listQcm }) => {
   listQcm = listQcm ? listQcm : [];
   return (
      <Row style={{ margin: 10, padding: 5 }}>
         <div
            style={{
               display: "flex",
               flexDirection: "column",
               flexWrap: "wrap",
               gap: 5,
               backgroundColor: "white",
               borderRadius: 5,
               padding: 5,
            }}
         >
            <h3>liste des QCM present dans ce chapitre</h3>
            {listQcm?.length === 0 ? (
               <span style={{ fontSize: 17 }}>Ce coours ne contient aucune section...!</span>
            ) : (
               <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                  <thead
                     className="header"
                     style={{
                        position: "sticky",
                        top: 0,
                        background: "white",
                     }}
                  >
                     <tr>
                        <th>N°</th>
                        <th>intitule</th>
                        <th>nbrs prop</th>
                        <th>prop correct</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {listQcm.map((qcm, index) => (
                        <tr key={qcm.id} style={{ height: "40px" }}>
                           <td>{index + 1}</td>
                           <td>{qcm.intitule}</td>
                           <td style={{ textAlign: "center" }}>
                              <span
                                 style={{
                                    color: qcm.propositions?.length > 0 ? "blue" : "red",
                                    fontWeight: 700,
                                    fontSize: 12,
                                 }}
                              >
                                 {qcm.propositions?.length}
                              </span>
                           </td>
                           <td style={{ textAlign: "center" }}>
                              <span
                                 style={{
                                    color:
                                       qcm.propositions?.reduce((acc, prop) => acc + prop.etat, 0) > 0
                                          ? "green"
                                          : "red",
                                    fontWeight: 700,
                                    fontSize: 12,
                                 }}
                              >
                                 {qcm.propositions?.reduce((acc, prop) => acc + prop.etat, 0)}
                              </span>
                           </td>
                           <td>
                              <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                 <Button variant="outlined" size="small" color="info" sx={{ fontSize: 10 }}>
                                    Voir plus
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}
         </div>
      </Row>
   );
};
