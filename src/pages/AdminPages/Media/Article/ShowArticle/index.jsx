import {
   Button,
   CircularProgress,
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MessageErrorServeur } from "../../../../../composants/MessageComponent";
import { useFetch } from "../../../../../utils/hooks/FetchData";
import { copyToClipboard, getFullUrlWithSuffix, getStatutColor } from "../../../../../utils/fonctions";
import "../articleCSS.css";
import SaveComponent from "../../../../../composants/SaveComponent";
import { DeleteImage, DisplayImage, FormAddImageArticle } from "./imageArticleAction";

export default function ShowArticle() {
   const { idArticle } = useParams();
   const navigation = useNavigate();
   const [update, setUpdate] = useState(false);
   const { isLoading, data, error } = useFetch(`/media/article/${idArticle}`, "GET", null, null, update);
   //console.log("data article == ", data);

   const handleModifierClick = () => {
      // Logique pour gérer le clic sur le bouton "Modifier" suppert3jhgS
      navigation(`/article/alter/${idArticle}/`);
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
                  Article <span>{data && data.titre ? ` ${data.titre}` : null}</span>
               </span>
               <span style={{ fontWeight: "normal" }}>
                  <Link to={"/article"} style={{ textDecorationLine: "underline", color: "white" }}>
                     Articles
                  </Link>
                  <span style={{ margin: "3px" }}> / </span>
                  <Link to={"/article/" + idArticle} style={{ textDecorationLine: "underline", color: "white" }}>
                     {data && data.titre ? `${data.titre}` : null}{" "}
                  </Link>
               </span>
            </div>
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  marginRight: 10,
               }}
            >
               <Button variant="contained" onClick={handleModifierClick} color="success">
                  Modifier
               </Button>
            </div>
         </div>
         <Container fluid>
            {isLoading ? (
               <div style={{ marginLeft: "50%" }}>
                  <CircularProgress size={40} />
               </div>
            ) : error ? (
               <MessageErrorServeur />
            ) : (
               <>
                  <Row style={{ margin: 10 }}>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                           }}
                        >
                           <span>
                              Rubrique :
                              <span style={{ fontSize: 20, fontWeight: 700 }}>
                                 {data.rubrique ? data.rubrique.nom : null}
                              </span>
                           </span>
                        </div>
                     </Col>
                  </Row>

                  <Row style={{ margin: 10 }}>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "row",
                              padding: 10,
                              borderRadius: 5,
                              justifyContent: "space-between",
                           }}
                        >
                           <div
                              style={{
                                 backgroundColor: "white",
                                 display: "flex",
                                 flexDirection: "column",
                                 padding: 10,
                                 borderRadius: 5,
                              }}
                           >
                              <span>
                                 Statut de publication :
                                 <span
                                    style={{
                                       fontSize: 17,
                                       fontWeight: 700,
                                       color: getStatutColor(data.statut),
                                    }}
                                 >
                                    {data.statut}
                                 </span>
                              </span>

                              <span>
                                 Creer le :
                                 <span style={{ fontSize: 16, fontWeight: 500 }}>
                                    {data.date
                                       ? new Date(data.date).toLocaleDateString("fr-FR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                         })
                                       : null}
                                 </span>
                              </span>

                              {data.datePublication && (
                                 <span>
                                    Date de publication:
                                    <span style={{ fontSize: 16, fontWeight: 500, color: "green" }}>
                                       {data.date
                                          ? new Date(data.datePublication).toLocaleDateString("fr-FR", {
                                               day: "numeric",
                                               month: "long",
                                               year: "numeric",
                                               hour: "numeric",
                                               minute: "numeric",
                                            })
                                          : null}
                                    </span>
                                 </span>
                              )}
                           </div>

                           <div name="boutonAction">
                              <ChangeStatutArticle article={data} update={update} setUpdate={setUpdate} />
                           </div>
                        </div>
                     </Col>
                  </Row>

                  <Row style={{ margin: 10 }}>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                           }}
                        >
                           <div
                              style={{
                                 marginBottom: 30,
                                 width: "100%",
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "center",
                                 alignItems: "center",
                              }}
                           >
                              {data.imageArticles && data.imageArticles.length > 0 ? (
                                 <>
                                    <FormAddImageArticle
                                       setUpdate={setUpdate}
                                       idArticle={idArticle}
                                       texte={"Changer l'image de l'article"}
                                    />
                                    <DeleteImage setUpdate={setUpdate} idArticle={idArticle} />
                                    <DisplayImage
                                       setUpdate={setUpdate}
                                       idArticle={idArticle}
                                       idImage={data.imageArticles[0].id}
                                       update={update}
                                    />
                                    <ViewTitreImageArticle
                                       idImage={data.imageArticles[0].id}
                                       image={data.imageArticles[0]}
                                       setUpdate={setUpdate}
                                    />
                                 </>
                              ) : (
                                 <FormAddImageArticle setUpdate={setUpdate} idArticle={idArticle} />
                              )}
                           </div>

                           <span className="arcticleLabel1">Sur titre:</span>
                           <div
                              style={{
                                 marginBottom: 10,
                                 height: 40,
                                 display: "flex",
                                 alignItems: "center",
                              }}
                           >
                              <span
                                 style={{
                                    color: "white",
                                    fontSize: 22,
                                    fontWeight: 800,
                                    display: "inline-block",
                                    minWidth: "250px",
                                    padding: 2,
                                    backgroundColor: "red",
                                 }}
                              >
                                 {data.surTitre}
                              </span>
                           </div>

                           <span className="arcticleLabel1">Titre de l'article:</span>
                           <div name="titreDiv" style={{ marginBottom: 10 }}>
                              <span className="arcticleTitre">{data.titre}</span>
                           </div>

                           <span className="arcticleLabel1">sous titre:</span>
                           <div name="titreDiv" style={{ marginBottom: 10 }}>
                              <span className="arcticleSousTitre">{data.sousTitre}</span>
                           </div>

                           <span className="arcticleLabel1">contenu textule</span>
                           <div name="titreDiv" style={{ marginBottom: 10, padding: 5 }}>
                              <p style={{ textAlign: "justify" }}>{data.texte}</p>
                           </div>
                        </div>
                     </Col>
                  </Row>

                  <Row style={{ margin: 10 }}>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                           }}
                        >
                           <span>
                              Auteur :
                              <span style={{ fontSize: 18, fontWeight: 700 }}>{data.auteur ? data.auteur : null}</span>
                           </span>

                           <span>
                              Titre auteur :
                              <span style={{ fontSize: 18, fontWeight: 700 }}>
                                 {data.titreAuteur ? data.titreAuteur : null}
                              </span>
                           </span>
                        </div>
                     </Col>
                  </Row>

                  <Row style={{ margin: 10 }}>
                     <Col>
                        <div
                           style={{
                              backgroundColor: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: 10,
                              borderRadius: 5,
                           }}
                        >
                           <span>Lien public de l'article</span>
                           <div
                              style={{
                                 backgroundColor: "#D4CFCE",
                                 padding: 10,
                                 borderRadius: 10,
                              }}
                           >
                              <span>{getFullUrlWithSuffix(`/article/${data.lien}`)}</span>
                              <button
                                 style={{ marginLeft: 20 }}
                                 onClick={() => {
                                    copyToClipboard(getFullUrlWithSuffix(`/article/${data.lien}`));
                                 }}
                              >
                                 Copier
                              </button>
                           </div>
                        </div>
                     </Col>
                  </Row>
               </>
            )}
         </Container>
      </>
   );
}

const ChangeStatutArticle = ({ article, setUpdate, update }) => {
   const requestURL = `/admin/media/changestatutarticle/${article && article.id ? article.id : 0}`;
   //const [open, setOpen] = useState(false);
   //const [formLink, setFormLink] = useState([]);
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleAction = () => {
      setSave(true);
   };

   return (
      <div style={{ display: "flex", flexDirection: "row" }}>
         <Button onClick={handleAction} variant="contained" color={article.statut === "PUBLIER" ? "error" : "success"}>
            {article.statut === "EN_ATTENTE"
               ? "Publier l'article"
               : article.statut === "SUSPENDU"
               ? "Republier l'article"
               : "Suspendre l'article"}
         </Button>
         {save && (
            <SaveComponent
               setSave={setSave}
               save={save}
               requestURL={requestURL}
               requestBody={null}
               requestMethode={"GET"}
               requestParam={null}
               setErrorServeur={setErrorServeur}
               setError={setError}
               setUpdate={setUpdate}
            />
         )}

         {errorServeur && <MessageErrorServeur />}
         {error.textError && (
            <div
               style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: 10,
                  borderRadius: 5,
                  margin: 10,
                  fontSize: 16,
               }}
            >
               {error.textError}
            </div>
         )}
      </div>
   );
};

const ViewTitreImageArticle = ({ idImage, image, setUpdate }) => {
   const requestURL = `/admin/imagearticle/addtitre/${idImage}/`;
   const [open, setOpen] = useState(false);
   const [newTitre, setNewTitre] = useState("t");
   const [save, setSave] = useState(false);
   const [errorServeur, setErrorServeur] = useState(false);
   const [error, setError] = useState({
      textError: null,
   });

   const handleClose = () => {
      setOpen(false);
   };
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleSave = () => {
      setError((prev) => ({ ...prev, textError: null }));
      setErrorServeur(false);
      setSave(true);
   };
   return (
      <>
         <div style={{ width: "100%" }}>
            {image.titre ? (
               <>
                  <div className="titreImageArticle">
                     <span>{image.titre}</span>
                  </div>
                  <Button variant="contained" color="warning" onClick={handleClickOpen} style={{ marginTop: 10 }}>
                     Changer le titre de l'image
                  </Button>
               </>
            ) : (
               <Button variant="contained" color="success" onClick={handleClickOpen} style={{ marginTop: 10 }}>
                  Ajouter un titre de l'image
               </Button>
            )}
         </div>
         <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
               {image.titre ? "Modifier le titre de l'image" : "Ajouter un titre a l'image de l'article"}
            </DialogTitle>
            <DialogContent>
               {errorServeur && <MessageErrorServeur />}
               {save && (
                  <SaveComponent
                     setSave={setSave}
                     save={save}
                     requestURL={requestURL}
                     requestBody={newTitre}
                     requestMethode={"POST"}
                     setErrorServeur={setErrorServeur}
                     setError={setError}
                     setUpdate={setUpdate}
                  />
               )}

               {error.textError && (
                  <div
                     style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        fontSize: 16,
                     }}
                  >
                     {error.textError}
                  </div>
               )}
               <br />

               <div>
                  <TextField
                     fullWidth
                     label="Titre de l'image"
                     placeholder="description de l'image"
                     defaultValue={image.titre}
                     onChange={(e) => {
                        setNewTitre(e.target.value ? e.target.value : "t");
                     }}
                  />
               </div>
            </DialogContent>

            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Annuler
               </Button>
               <Button onClick={handleSave} color="primary">
                  Valider
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};
