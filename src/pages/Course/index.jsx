import React, { useContext, useState } from 'react'
import Header from '../../composants/Header'
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Backdrop, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeaderContent from '../../composants/HeaderContent'
import { chapitre as chapitreEnDur } from '../../utils/data/index.ts'
import ReactPlayer from 'react-player'
import Footer from '../../composants/Footer/index.jsx'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/index.jsx';
import { useFetch } from '../../utils/hooks/FetchData/index.jsx';
//import { Button } from 'bootstrap'

export default function Course() {
    const { isOnline, language, user } = useContext(AppContext);
    const { idChapitre } = useParams();
    const { isLoading, data, error } = useFetch(("/etudiant/chapitre/" + ((user) ? user.id : 0) + "/" + (idChapitre)), "GET")
    const divTest = <div style={{ height: '100%', width: "100%", backgroundColor: 'white' }}></div>;
    var isfrench = (language === 'FR');
    return (
        <>
            <Container fluid style={{ width: '100%', padding: 0 }}>
                <Header />
                <HeaderContent />

                <Row>
                    <Col xs={0} sm={0} md={2}  >{divTest}</Col>
                    <Col xs={12} sm={12} md={8}>
                        {/* <ViewChapitre chapitre={chapitre} index={0} /> */}

                        {
                            isLoading ?
                                <div style={{ marginLeft: '40%', marginBottom: '40%' }} >
                                    <CircularProgress size={70} />
                                </div>
                                :

                                error ?

                                    <div style={{ width: '100%', marginBottom: '5px', }}>
                                        <Alert severity="error">
                                            <AlertTitle>{isfrench ? "Erreur" : "Error"}</AlertTitle>
                                            {isOnline ?
                                                <span>{language === 'FR' ? "Probleme avec le serveur...!" : "Problem with the server...!"}</span>
                                                :
                                                <span>{language === 'FR' ? "Vous êtes hors connexion, controler votre connexion internet" : "You are offline, check your internet connection"}</span>

                                            }
                                        </Alert>
                                    </div>

                                    :
                                    <>
                                        {data &&
                                            <ViewChapitre chapitre={data} index={0} />
                                        }
                                    </>
                        }


                    </Col>
                    <Col xs={0} sm={0} md={2}>{divTest}</Col>
                </Row>
                <Footer />
            </Container>

        </>
    )
}



const ViewChapitre = ({ chapitre, index }) => {
    console.log("==chapitre View Chapitre==", chapitre)
    const [showAnswer, setShowAnswer] = useState(false)
    const { isOnline, language, user } = useContext(AppContext);
    var isfrench = (language === 'FR');
    const [valider, setValider] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [errorVideo, setErrorVideo] = useState(false);

    const [activeQCM, setActiveQCM] = useState([]);

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    const handleVideoError = () => {
        setErrorVideo(true);
        setIsLoading(false);
    };

    const handleValider = () => {
        console.log('activeQCM == ', activeQCM)
    }


    return (
        <>
            <div mame='titreChapitre'>
                <h2>Chapitre {index + 1}: {chapitre.titre}</h2>
            </div>

            {chapitre.video &&
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 5, marginBottom: 5 }}>
                    {isLoading && (
                        <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <CircularProgress /> {/* Remplacez par votre indicateur de progression circulaire personnalisé */}
                            <span>Chargement de la video...</span>
                        </div>
                    )}
                    {errorVideo && (
                        <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <span>Impossible de charger la video du cour...! Controler votre connexion</span>
                        </div>
                    )}
                    <ReactPlayer width={'100%'} controls={true} onReady={handleVideoLoad} onError={handleVideoError} url={chapitre.video} /> {/* Replace with your video URL https://www.youtube.com/watch?v=TvgfzI7rFYU */}


                </div>
            }

            {chapitre.preanbule &&
                <div name='preanbule' style={{ paddingLeft: 10, marginTop: 15 }}>
                    <span style={{ fontWeight: 700 }}>Preanbule: <span style={{ fontWeight: 500 }}>{chapitre.preanbule}</span></span>
                </div>
            }
            {(chapitre.objectifs) &&
                <div style={{ paddingLeft: 10 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 17 }}>Objectif:</div>
                    <ul>
                        {
                            chapitre.objectifs.map((objectif) => (
                                <li style={{ margin: 5 }}>
                                    {objectif}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }

            {chapitre.texte &&
                <div className='texteChapitre' style={{ paddingLeft: 10, marginTop: 15 }}>
                    <p>{chapitre.texte}</p>
                </div>
            }

            {chapitre.blocs.map((bloc, indexBloc) => (
                <Accordion defaultExpanded >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <h5 style={{ fontWeight: 'bold' }}>{(indexBloc + 1) + ') ' + bloc.titre}</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='bloc' style={{ paddingLeft: 10 }}>

                            {bloc.texte &&
                                <p className='texteBloc'>
                                    {bloc.texte}
                                </p>
                            }

                            {bloc.sousBlocs &&
                                bloc.sousBlocs.map((sousBloc, indexSousBloc) => (
                                    <div className='sousBloc' style={{ paddingLeft: 20 }}>
                                        <h6 style={{ fontWeight: 'bold' }}>{(indexBloc + 1) + '.' + (indexSousBloc + 1) + ') ' + sousBloc.titre}</h6>
                                        <p>{sousBloc.texte}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </AccordionDetails>

                </Accordion>
            ))}


            {chapitre.qcms &&
                <div name='bloc_Global_QCM' style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 17, fontWeight: 'bold' }}><span>Repondez au QCM pour valider ce cour:</span></div>
                    <div style={{ fontSize: 14, fontStyle: 'italic', color: 'gray' }}><span>Question à choix multiple, chaque QCM peut contenir une ou plusieurs proposition juste...!</span></div>

                    <div name='ListQCM' style={{ paddingLeft: 15, marginTop: 10 }}>
                        {chapitre.qcms.map((qcm, index) => (
                            <DisplayQCM qcm={qcm} index={index} width="930" height="523" activeQCM={activeQCM} setActiveQCM={setActiveQCM} showAnswer={showAnswer} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Validation activeQCM={activeQCM} setShowAnswer={setShowAnswer} idChapitre={chapitre.idChapitre} />
                    </div>
                </div>
            }

        </>
    )
}



const DisplayQCM = ({ qcm, index, activeQCM, setActiveQCM, showAnswer }) => {
    const { isOnline, language, user } = useContext(AppContext);
    var isfrench = (language === 'FR');

    const changeValueSelected = (event, propositionId) => {
        if (event.target.checked) {
            let newActiveQCM = [...activeQCM];
            let qcmIsRegister = false
            activeQCM.forEach((itemQCM) => {
                if (itemQCM.id === qcm.id) {
                    let itemQCM01 = itemQCM;
                    qcmIsRegister = true
                    if (itemQCM.propositions && !itemQCM.propositions.includes(propositionId)) {
                        itemQCM01.propositions.push(propositionId)
                        newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id)
                        newActiveQCM.push(itemQCM01)
                    } else if (!itemQCM.propositions) {
                        itemQCM01.propositions = [propositionId]
                        newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id)
                        newActiveQCM.push(itemQCM01)
                    }
                }
            })


            if (!qcmIsRegister) {
                let qcmActive = { id: qcm.id, propositions: [propositionId] }
                newActiveQCM.push(qcmActive)
            }
            setActiveQCM([...newActiveQCM])
        } else {
            let newActiveQCM = [...activeQCM];
            let qcmIsRegister = false
            activeQCM.forEach((itemQCM) => {
                if (itemQCM.id === qcm.id) {
                    let itemQCM01 = itemQCM;
                    qcmIsRegister = true
                    if (itemQCM.propositions && itemQCM.propositions.includes(propositionId)) {
                        itemQCM01.propositions = itemQCM.propositions.filter((item) => item !== propositionId)
                        newActiveQCM = newActiveQCM.filter((item) => item.id !== qcm.id)
                        newActiveQCM.push(itemQCM01)
                    }
                }
            })
            setActiveQCM([...newActiveQCM])
        }
    };


    return (
        <>
            <div name='itemQCM' key={index + 'erp1x'}>
                <div style={{ fontSize: 15, fontWeight: 'bold' }}><span>{(1 * index + 1) + " ) " + (isfrench ? qcm.intitule : qcm.intituleEn)}</span></div>
                {qcm.propositions.map((proposition, index02) => (
                    <div key={proposition.id + index02} style={{ fontSize: 16, fontStyle: 'italic', color: 'gray' }}>
                        <input type='checkbox' style={{ width: 20, height: 20, margin: 10 }} onChange={(event => changeValueSelected(event, proposition.id))} />
                        <span>{isfrench ? proposition.valeur : proposition.valeurEn}
                            {showAnswer && proposition.etat > 0 && <span style={{ color: 'green', fontWeight: 'bold', fontSize: 17, fontStyle: 'italic' }}> {isfrench ? '- Correct' : 'True'}</span>}
                            {showAnswer && proposition.etat <= 0 && <span style={{ color: 'red', fontWeight: 'bold', fontSize: 17, fontStyle: 'italic' }}> {isfrench ? '- Incorrect' : 'False'}</span>}
                            {/* <span>{(proposition.etat > 0) ? (isfrench ? "Vrai" : "True") : (isfrench ? "Faux" : "false")}</span> */}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}




const Validation = ({ activeQCM, setShowAnswer, idChapitre }) => {
    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(true);
    const [error, setError] = useState(false);
    const [reponse, setReponse] = useState(null);
    const { isOnline, language, setUser } = useContext(AppContext);
    var isfrench = (language === 'FR');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        if (reponse) {
            setShowAnswer(true)
        }

        setOpen(false);
        setSave(true);
        setError(false);
        setReponse(null);

    };


    const handleValider = () => {
        console.log("activeQCM == ", activeQCM)
    }

    return (

        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Valider</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{isfrench ? "Validation des reponses" : "Validation of answers"}</DialogTitle>
                    <DialogContent>
                        {(save && !error && !reponse) &&
                            <CircularProgress color="inherit" />
                        }

                        {save &&
                            <SaveQcmChoice activeQCM={activeQCM} setReponse={setReponse} setSave={setSave} setError={setError} idChapitre={idChapitre} setShowAnswer={setShowAnswer} />
                        }
                        {error &&
                            <div style={{ width: '100%', marginBottom: '5px', }}>
                                <Alert severity="error">
                                    <AlertTitle>{isfrench ? "Erreur" : "Error"}</AlertTitle>
                                    {isOnline ?
                                        <span>{language === 'FR' ? "Probleme avec le serveur...!" : "Problem with the server...!"}</span>
                                        :
                                        <span>{language === 'FR' ? "Vous êtes hors connexion, controler votre connexion internet" : "You are offline, check your internet connection"}</span>

                                    }
                                </Alert>
                            </div>
                        }

                        {(reponse && !save && !error) &&
                            <div style={{ width: '100%', marginBottom: '5px', }}>
                                <div><span style={{ color: 'green', fontWeight: 'bold', fontSize: 16, margin: 10 }} >
                                    Resultat:
                                </span></div>
                                <div style={{ fontWeight: 'bold', fontSize: 17, margin: 10 }} ><span style={{ color: ((reponse.totalQcm / 2) <= reponse.qcmValide) ? 'green' : 'red', fontSize: 21 }}>{reponse.qcmValide}</span><span>{reponse.qcmValide > 0 ? ' QCM validés sur ' : ' QCM validé sur '}</span><span style={{ fontSize: 21, color: 'green' }}>{reponse.totalQcm}</span> </div>
                            </div>
                        }
                    </DialogContent>
                    <DialogActions>
                        {(!save || error) &&
                            <Button onClick={handleClose} autoFocus>
                                {isfrench ? "Fermer" : "Close"}
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </Backdrop>
        </>
    )

}

const SaveQcmChoice = ({ activeQCM, setReponse, idChapitre, setError, setSave, setShowAnswer }) => {
    console.log("activeQCM == ", activeQCM)
    const { user } = useContext(AppContext);
    const { isLoading, data, error } = useFetch(("/etudiant/validerqcm/" + ((user) ? user.id : 0) + "/" + (idChapitre)), "POST", activeQCM)

    if (!isLoading && !error && data) {
        console.log("data == ", data)
        setReponse(data)
        setSave(false)
    } else if (!isLoading && error) {
        setError(true)
        setSave(false)
    }
}




/*

<iframe width="930" height="523" src="https://www.youtube.com/embed/AaO6r52NN_4" title="❌ MBAPPE / LUIS ENRIQUE : qui est le responsable de l&#39;élimination du PSG ?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

*/