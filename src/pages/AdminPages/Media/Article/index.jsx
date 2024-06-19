import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { Button, CircularProgress } from "@mui/material";
import { useFetch } from "../../../../utils/hooks/FetchData";
import { MessageErrorServeur } from "../../../../composants/MessageComponent";

export default function Article() {
   const navigation = useNavigate();
   const [pageNumber, setPageNumber] = useState(0);
   const [filter, setFilter] = useState(null);
   //const { isOnline, language } = useContext(AppContext);
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/articles/${pageNumber}`, "GET", null, filter, update);
   //console.log("data articles == ", data)

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
               <span>Articles media</span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/article"} style={{ textDecorationLine: "underline", color: "white" }}>
                     {" "}
                     Arcticles{" "}
                  </Link>
               </span>
            </div>
            <div>
               <Button
                  variant="contained"
                  onClick={() => {
                     navigation("/article/creer");
                  }}
                  color="success"
               >
                  Ajouter
               </Button>
            </div>
         </div>
         <Container fluid>
            <div>
               <h1>Liste des d'articles</h1>

               {isLoading ? (
                  <div style={{ marginLeft: "40%" }}>
                     <CircularProgress size={40} />
                  </div>
               ) : error ? (
                  <MessageErrorServeur />
               ) : (
                  <>
                     {data && data.content && data.content.length > 0 ? (
                        <Table width={"100%"} hover size="sm" style={{ marginBottom: "0px" }}>
                           <thead className="header" style={{ position: "sticky", top: 0, background: "white" }}>
                              <tr>
                                 <th>N°</th>
                                 <th>Titre</th>
                                 <th>Rubrique</th>
                                 <th>Date</th>
                                 <th>Statut</th>
                                 <th>Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.content.map((article, index) => (
                                 <tr
                                    key={article.id + "idarticle"}
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                       navigation(`/article/${article.id}`);
                                    }}
                                 >
                                    <td className="body_tr">{index + 1} </td>
                                    <td className="body_tr">{article.titre}</td>
                                    <td className="body_tr">{article.rubrique ? article.rubrique.nom : "---"}</td>
                                    <td className="body_tr">
                                       {new Date(article.date).toLocaleDateString("fr-FR", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                       })}{" "}
                                    </td>
                                    <td className="body_tr">{article.statut}.</td>
                                    <td className="body_tr">
                                       <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                          <Button
                                             variant="outlined"
                                             color="info"
                                             sx={{ fontSize: 10 }}
                                             onClick={() => {
                                                navigation(`/article/${article.id}`);
                                             }}
                                          >
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
                           <h3>Aucune article trouver trouvée</h3>
                        </div>
                     )}
                  </>
               )}
            </div>
         </Container>
      </>
   );
}
