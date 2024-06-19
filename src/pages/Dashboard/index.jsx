import React, { useContext } from 'react'
import Header from '../../composants/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { Alert, AlertTitle, Button, CircularProgress, Divider } from '@mui/material'
//import { modules } from '../../utils/data'
import { useNavigate } from 'react-router-dom'
import { modules } from '../../utils/data/index.ts'
import Footer from '../../composants/Footer/index.jsx'
import HeaderContent from '../../composants/HeaderContent/index.jsx'
import './dashboardCSS.css';
import { AppContext } from '../../context/index.jsx'
import { useFetch } from '../../utils/hooks/FetchData/index.jsx'


export default function Dashboard() {
    const { isOnline, language, setUser, user } = useContext(AppContext);
    const { isLoading, data, error } = useFetch(("/etudiant/dashboard/" + ((user) ? user.id : 0)), "GET")
    console.log("data dashboard", data)
    const navigation = useNavigate();
    var isfrench = (language === 'FR');
    return (
        <>

            <Container fluid style={{ width: '100vw', margin: 0, padding: 0 }} >
                <Header />
                <HeaderContent />


                <div style={{ marginTop: 10, textAlign: "center", fontWeight: 'bold' }}>
                    Explorez nos Modules de Formation: Plongez dans notre programme de formation complet! Découvrez des modules spécialement conçus pour vous aider à maîtriser les compétences essentielles en matière de rentabilité et de fonctionnement. Que vous soyez un novice ou un entrepreneur chevronné, ces modules vous guideront vers le succès.
                </div>


                {isLoading ?
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
                            <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                                <div style={{ margin: '5px', fontWeight: 'blod', fontSize: 20, fontWeight: 700 }}>Récapitulatiif de vos activités</div>
                                <Col style={{ margin: 10 }}>
                                    <div className='statItemDashbord' style={{ backgroundColor: '#ffeee8' }}>
                                        <div className='icnDashbord'></div>
                                        <div className='texteStatDashbord'>
                                            <span className='numberStatDashboard'>{data.courLu} sur {data.chapitreTotal}</span>
                                            <span className='texteStatDashboard'>Cour deja lu</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ margin: 10 }}>
                                    <div className='statItemDashbord' style={{ backgroundColor: '#ebebff' }}>
                                        <div className='icnDashbord'></div>
                                        <div className='texteStatDashbord'>
                                            <span className='numberStatDashboard'>{data.qcmvalide} sur {data.qcmTotal}</span>
                                            <span className='texteStatDashboard'>QCM Validés</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ margin: 10 }}>
                                    <div className='statItemDashbord' style={{ backgroundColor: '#e1f7e3' }}>
                                        <div className='icnDashbord'></div>
                                        <div className='texteStatDashbord'>
                                            <span className='numberStatDashboard'>{data.moduleAccessible} sur {data.moduleTotal}</span>
                                            <span className='texteStatDashboard'>Module accessible</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ margin: 10 }}>
                                    <div className='statItemDashbord' style={{ backgroundColor: '#FFEEE8' }}>
                                        <div className='icnDashbord'></div>
                                        <div className='texteStatDashbord'>
                                            <span className='numberStatDashboard'>{data.questionPose ? data.questionPose : 0}</span>
                                            <span className='texteStatDashboard'>Vos questions</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>


                            <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                                {data.modules.map((module, index) => (
                                    <Col style={{ margin: 8, minHeight: '200px', backgroundColor: "white", padding: 5, borderRadius: 5, boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' }}>
                                        <div style={{ minWidth: '250px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div className='imageCourDashboard'>
                                                <img className='imageLogoFooter' src='/images/lecteurcour.png' />
                                            </div>
                                            <div name='titre' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, textAlign: 'center' }}>
                                                <span style={{ fontWeight: '600' }}>{isfrench ? module.titre : module.titreEn}</span>
                                            </div>
                                            <Divider style={{ marginTop: 10, marginBottom: 0 }} />
                                            {/* <div name='description' style={{ padding: 5, }}>
                                                {module.libelles.map((point, index01) => (
                                                    <div style={{ marginBottom: 10 }}>
                                                        <span>
                                                            <span style={{ fontWeight: "bold", fontStyle: "italic" }}>{(isfrench ? point.titre : point.titreEn)} : </span>
                                                            {isfrench ? point.texte : point.texteEn}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div> */}
                                            <div>
                                                <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                <div name='nombreChapitre' style={{ textAlign: 'center' }}>
                                                    <span><spam>{module.nombreChapitre}</spam> Chapitres</span>
                                                </div>
                                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                                <div name='accessible' style={{ textAlign: 'center', height: '45px' }}>
                                                    {module.isAccessible ?
                                                        <Button onClick={() => { navigation('/module/' + (module.idModule)) }} variant='contained' color='success' sx={{ width: '100%', height: '100%', borderRadius: 0 }} >Commencer avec ce module</Button>
                                                        :
                                                        <Button variant='contained' color='error' sx={{ width: '100%', height: '100%' }} >Module Verrouiller</Button>

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </>

                }



                {/* <Row style={{ borderRadius: 5, margin: 20, marginTop: 30, padding: 10 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 19, textAlign: 'center' }}>Module de formation</div>

                    {modules.map((module, index) => (
                        <Col onClick={() => { navigation('/module/' + (module.idModule)) }} style={{ margin: 8, minHeight: '200px', backgroundColor: "rgba(36,172,242,0.4)", padding: 5, borderRadius: 5 }}>
                            <div style={{ minWidth: '250px' }}>
                                <div name='titre' style={{ minHeight: '40px', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontWeight: "bold", fontSize: 18, color: 'red' }}>
                                    <span>{module.titre}</span>
                                </div>
                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                <div name='description'>
                                    {module.description.map((point, index01) => (
                                        <div style={{ marginBottom: 10 }}>
                                            <span>
                                                <span style={{ fontWeight: "bold", fontStyle: "italic" }}>{point.titre ? point.titre + ' :' : ''}</span>
                                                {point.texte}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                <div name='nombreChapitre' style={{ textAlign: 'center' }}>
                                    <span><spam>{module.nombreChapitre}</spam> Chapitres</span>
                                </div>
                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                <div name='accessible' style={{ textAlign: 'center' }}>
                                    {module.isOk ?
                                        'Accessible'
                                        :
                                        ("Accessible a partir du: " + module.dateAccess)
                                    }
                                </div>
                            </div>
                        </Col>
                    ))}

                </Row> */}

                <Row style={{ backgroundColor: "rgba(36,172,242,0.3)", borderRadius: 5, margin: 20, marginTop: 30, padding: 20 }}>

                    <Col>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 17 }}>Fonctionement de la formation:</div>
                            <ol>
                                <li style={{ margin: 5 }}><span style={{ fontWeight: 'bold' }}>Chapitres et Quiz:</span> Chaque module est divisé en plusieurs chapitres. À la fin de chaque chapitre, vous trouverez un quiz à compléter. Ces quiz vous permettront de vérifier vos connaissances et de renforcer votre compréhension des sujets abordés.</li>
                                <li style={{ margin: 5 }}><span style={{ fontWeight: 'bold' }}>Progression Graduelle:</span> Les modules ne sont pas tous accessibles simultanément. Au début, seul le premier module est déverrouillé. Chaque semaine, un nouveau module sera accessible. Cette approche progressive vous permettra de suivre la formation de manière structurée et d’assimiler les informations étape par étape</li>
                                <li style={{ margin: 5 }}><span style={{ fontWeight: 'bold' }}>Attestation de Réussite:</span> À la fin de la formation, si vous avez complété tous les chapitres et réussi les quiz, vous recevrez une attestation qui témoigne de votre engagement et de vos compétences nouvellement acquises.</li>
                            </ol>
                        </div>
                    </Col>
                </Row>

                <Footer />
            </Container>

        </>
    )
}
