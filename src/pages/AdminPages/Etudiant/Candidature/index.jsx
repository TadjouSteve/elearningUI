import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Candidature() {
   const navigation = useNavigate();
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/admin/candidatures/${pageNumber}`, "GET", null, filter, update);

   useEffect(() => {
      if (!isLoading && !error) {
         //console.log("Page de Candidature == ", data);
      }
   }, [data, error, isLoading]);

   return (
      <Container fluid>
         <div>
            <h2>Liste des Candidatute Salon de l'entrepreneur</h2>

            {isLoading ? (
               <div style={{ marginLeft: "40%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  {data && data.content && data.content.length > 0 ? (
                     <>
                        <div
                           style={{
                              background: "white",
                              width: "100%",
                              height: "45px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center",
                           }}
                        >
                           <span>
                              {data.number * data.size + 1} - {data.number * data.size + data.numberOfElements} sur{" "}
                              {data.totalElements}
                           </span>
                           <span style={{ marginRight: 20, marginLeft: 20 }}>
                              <span style={{ display: data.first ? "none" : "", marginRight: 20 }}>
                                 <ArrowBackIosIcon
                                    onClick={() => {
                                       setPageNumber((prev) => prev - 1);
                                    }}
                                 />
                              </span>
                              <span style={{ display: data.last ? "none" : "" }}>
                                 {" "}
                                 <ArrowForwardIosIcon
                                    onClick={() => {
                                       setPageNumber((prev) => prev + 1);
                                    }}
                                 />
                              </span>
                           </span>
                        </div>
                        <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                           <thead className="header" style={{ position: "sticky" }}>
                              <tr>
                                 <th>N°</th>
                                 <th>Nom</th>
                                 <th>Email</th>
                                 <th>Profil</th>
                                 <th>Entrepise / projet</th>
                                 <th>Documents ?</th>
                                 <th>Actiion</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.content.map((candidature, index) => (
                                 <tr
                                    key={candidature.id}
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                       navigation(`/candidaturesalon/${candidature.id}`);
                                    }}
                                 >
                                    <td className="body_tr">{data.number * data.size + index + 1} </td>
                                    <td className="body_tr">{candidature.etudiant.nom}</td>
                                    <td className="body_tr">{candidature.etudiant.email}</td>
                                    <td className="body_tr">{candidature.etudiant.gammeEtudiant?.nom}</td>

                                    <td className="body_tr">{candidature.nomEntreprise}</td>
                                    <td
                                       className="body_tr"
                                       style={{ color: candidature.lienVideo ? "green" : "red", fontWeight: "600" }}
                                    >
                                       {candidature.lienVideo ? "Oui" : "nom"}
                                    </td>
                                    <td className="body_tr">
                                       <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                          {/* <Button variant="contained" color="error" sx={{ fontSize: 10 }}>
                                          Bloquer
                                       </Button>{" "} */}
                                          <Button variant="outlined" color="info" sx={{ fontSize: 10 }}>
                                             Voir plus
                                          </Button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     </>
                  ) : (
                     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <h3>Aucun Candidat inscrit au salon de l'entrepreneur</h3>
                     </div>
                  )}
               </>
            )}
         </div>
      </Container>
   );
}
