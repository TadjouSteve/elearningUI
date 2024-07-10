import React, { useState } from "react";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { Container, Row, Table } from "react-bootstrap";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ModuleAdmin() {
   const navigation = useNavigate();
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/modules`, "GET", null, filter, update);
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
               <span>Modules</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/modules"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Module de formation{" "}
                  </Link>
               </span>
            </div>
            <div>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation("/module/ajouter");
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
                                 <th>Etat</th>
                                 <th>date deblocage</th>
                                 <th>Actionss</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.map((module, index) => (
                                 <tr
                                    key={module.matricule}
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                       navigation(`/module/${module.idModule}`);
                                    }}
                                 >
                                    <td className="body_tr">{index + 1} </td>
                                    <td className="body_tr">{module.titre}</td>
                                    <td className="body_tr">{module.titreEn}</td>
                                    <td className="body_tr">{module.etat}</td>
                                    <td className="body_tr">
                                       {new Date(module.dateDeblocage).toLocaleDateString("fr-FR", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                       })}{" "}
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
                           <h3>Aucun Module trouver</h3>
                        </div>
                     )}
                  </>
               )}
            </Row>
         </Container>
      </>
   );
}
