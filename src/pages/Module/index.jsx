import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../composants/Header';
import { chapitre, modules } from '../../utils/data/index.ts'
//import { useDeviceDetect } from 'react-device-detect';
//import { isMobile } from 'react-device-detect';
//import ReactPlayer from 'react-player'
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import HeaderContent from '../../composants/HeaderContent/index.jsx';
import { Container } from 'react-bootstrap';
import './moduleCSS.css';
import { useFetch } from '../../utils/hooks/FetchData/index.jsx';
import { AppContext } from '../../context/index.jsx';

export default function Module({ chapitres }) {
    const { isOnline, language, user } = useContext(AppContext);
    const { idModule } = useParams();
    const navigation = useNavigate();
    const { isLoading, data, error } = useFetch(("/etudiant/module/" + ((user) ? user.id : 0) + "/" + (idModule)), "GET")
    var isfrench = (language === 'FR');
    var module = modules.find((module) => ((module.idModule * 1) === (idModule * 1)))
    //console.log('modulle == ', module)
    if (!module) {
        module = {}
    }
    return (
        <Container fluid style={{ width: '100vw', margin: 0, padding: 0 }} >

            <Header />
            <HeaderContent />{/*justifyContent: 'space-evenly', flexWrap: 'wrap' */}
            <div className='listChapitreModule'>
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
                                {data && data.map((chapitre, index) => (
                                    <div style={{ maxWidth: '300px', margin: 10, padding: 0, boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', }}>
                                        <div className="chapitreModule" key={index}>
                                            <div className='divImageChapitremodule'>
                                                <img alt='image_attente' className='imageLogoFooter' src='/images/lecteurcour.png' />
                                            </div>
                                            <div className='titreChapitre'>
                                                <span>
                                                    {chapitre.titre}
                                                </span>
                                            </div>
                                            <div className='statutChapitre'>
                                                <Button onClick={() => { navigation('/course/' + chapitre.idChapitre) }} variant={!chapitre.firstTime ? 'outlined' : 'contained'} color={!chapitre.firstTime ? 'info' : 'success'} sx={{ width: '100%' }}>{!chapitre.firstTime ? 'Relire ce cour' : 'Commencer le cour'}</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </>
                }

            </div>


        </Container>
    )
}



