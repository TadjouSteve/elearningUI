import { Backdrop, Button, CircularProgress, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../context'
import { useFetch } from '../../../../utils/hooks/FetchData'
import { MessageErrorServeur } from '../../../../composants/MessageComponent'

export default function CreateProfesseur() {
    const [formProfesseur, setFormProfesseur] = useState({})
    const [save, setSave] = useState(false)
    const [errorServeur, setErrorServeur] = useState(false)
    const [error, setError] = useState({
        textError: null,
    })

    const navigation = useNavigate();

    const ajoutProfesseur = () => {
        setError(prev => ({ ...prev, textError: null }))
        setErrorServeur(false)
        setSave(true)
    }
    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Ajout professeur</span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/professeurs'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Professeurs  </Link><span style={{ margin: '3px' }}> / </span>
                        <Link to={'/professeur/creer'} style={{ textDecorationLine: 'underline', color: 'white' }} > ajout d'un professeur </Link>
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Button variant='contained' onClick={() => ajoutProfesseur()} color='success'>Enregistrer</Button>
                    <Button variant='contained' onClick={() => { navigation(-1) }} color='error'>Annuler</Button>
                </div>
            </div>
            {errorServeur && <MessageErrorServeur />}
            {save &&
                <SaveFormProfesseur setErrorServeur={setErrorServeur} setSave={setSave} setError={setError} formProfesseur={formProfesseur} action='POST' />
            }
            {error.textError &&
                <div style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 5, margin: 10, fontSize: 16, borderRadius: 5 }}>
                    {error.textError}
                </div>
            }

            <FormProfesseur formProfesseur={formProfesseur} setFormProfesseur={setFormProfesseur} requestMethode='POST' />
        </>
    )
}


export const FormProfesseur = ({ formProfesseur, setFormProfesseur }) => {
    const setNom = (e) => {
        setFormProfesseur({ ...formProfesseur, nom: e.target.value });
    }

    return (
        <>
            <Container fluid >
                <Row style={{ backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Nom du professeur'
                                placeholder='Ex: Ngah'
                                fullWidth
                                value={formProfesseur.nom}
                                onChange={(e) => setNom(e)}
                            />
                        </Col>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Prenom professeur'
                                placeholder='Ex: Josiane'
                                fullWidth
                                value={formProfesseur.prenom}
                                onChange={(e) => { setFormProfesseur({ ...formProfesseur, prenom: e.target.value }); }}
                            />
                        </Col>
                        <Col>
                            <TextField
                                label='Profession'
                                placeholder='Ex: Chargé de projet'
                                fullWidth
                                value={formProfesseur.profession}
                                onChange={(e) => { setFormProfesseur({ ...formProfesseur, profession: e.target.value }); }}
                            />
                        </Col>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Téléphone'
                                placeholder='Ex: 651294896'
                                fullWidth
                                value={formProfesseur.telephone}
                                onChange={(e) => { setFormProfesseur({ ...formProfesseur, telephone: e.target.value }); }}
                            />
                        </Col>
                        <Col>
                            <TextField
                                label='Email'
                                placeholder='Ex: professeur@gmail.com'
                                fullWidth
                                value={formProfesseur.email}
                                onChange={(e) => { setFormProfesseur({ ...formProfesseur, email: e.target.value }); }}
                            />
                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    )
}


export const SaveFormProfesseur = ({ setErrorServeur, setSave, setError, formProfesseur, requestMethode }) => {
    requestMethode = requestMethode ? requestMethode : 'POST'
    const { isOnline, language, setUser } = useContext(AppContext);
    const { isLoading, data, error } = useFetch('/admin/professeur', requestMethode, formProfesseur)
    const navigation = useNavigate();

    if (isLoading) {
        return (
            <div style={{ marginLeft: '40%' }} >
                {/* <CircularProgress size={40} /> */}
                <Backdrop open={true} style={{ zIndex: 1000, color: '#fff', }}>
                    <CircularProgress
                        style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-20px' }}
                        color="inherit" />
                </Backdrop>
            </div>
        )
    } else if (error) {
        setErrorServeur(true)
        setSave(false)

    } else if (!isLoading && !error) {
        if (data.errorAPI) {
            setError((prevError) => ({ ...prevError, textError: data.message }))
            setSave(false)
        } else {
            navigation('/professeur/' + data.matricule)
        }
    }
}