import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../../../utils/hooks/FetchData";

export default function CourAdmin() {
   const navigation = useNavigate();
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/cours`, "GET", null, filter, update);
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
            <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: "white" }}>
               <span>Cours</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/cours"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Cours de formation{" "}
                  </Link>
               </span>
            </div>
            <div>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation("/cour/ajouter");
                  }}
                  color="success"
               >
                  Ajouter
               </Button>
            </div>
         </div>
         <Container fluid>
            <div style={{ padding: 5, marginBottom: 15, marginTop: 15 }}>
               <span style={{ fontSize: 20, fontWeight: 700 }}>Liste des modules de formation</span>
            </div>

            <Row style={{ margin: 5, padding: 3, backgroundColor: "white", borderRadius: 5 }}>
               {isLoading ? (
                  <div style={{ marginLeft: "40%" }}>
                     <CircularProgress size={40} />
                  </div>
               ) : error ? (
                  <MessageErrorServeur />
               ) : (
                  <>
                     {data && data.length > 0 ? (
                        <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                           <thead className="header" style={{ position: "sticky", top: 0, background: "white" }}>
                              <tr>
                                 <th>N°</th>
                                 <th>Titre</th>
                                 <th>Titre anglais</th>
                                 <th>Module</th>
                                 <th>Nbrs QCM</th>
                                 <th>Etat</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.map((chapitre, index) => (
                                 <tr
                                    key={module.matricule}
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                       navigation(`/cour/${chapitre.idChapitre}`);
                                    }}
                                 >
                                    <td className="body_tr">{index + 1} </td>
                                    <td className="body_tr">{chapitre.titre}</td>
                                    <td className="body_tr">{chapitre.titreEn}</td>
                                    <td className="body_tr">
                                       <span style={{ fontWeight: 500 }}>{chapitre.titreModule}</span>
                                    </td>
                                    <td className="body_tr">
                                       <span style={{ color: chapitre.totalQcm > 0 ? "green" : "red" }}>
                                          {chapitre.totalQcm}
                                       </span>
                                    </td>
                                    <td className="body_tr">
                                       <span
                                          style={{
                                             backgroundColor: chapitre.etat === "ACTIF" ? "green" : "red",
                                             borderRadius: 5,
                                             color: "white",
                                             fontSize: 12,
                                             padding: 3,
                                          }}
                                       >
                                          {chapitre.etat}
                                       </span>
                                    </td>
                                    <td className="body_tr">
                                       <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                          {/* <Button variant="contained" color="error" sx={{ fontSize: 10 }}>
                                           Bloquer
                                        </Button>{" "} */}
                                          <Button variant="outlined" size="small" color="info" sx={{ fontSize: 10 }}>
                                             Voir plus
                                          </Button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     ) : (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                           <h3>Aucun cour trouve</h3>
                        </div>
                     )}
                  </>
               )}
            </Row>
         </Container>
      </>
   );
}
