import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useFetch } from '../../../../utils/hooks/FetchData';
import SaveComponent from '../../../../composants/SaveComponent';

export default function ShowProfesseur() {
    const { matricule } = useParams();
    const navigation = useNavigate();
    const [filter, setFilter] = useState(null)
    //const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch(`/admin/professeur/${matricule}`, 'GET', null, filter, update)
    console.log("data prof == ", data)
    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Compte Professeur <span>{(data && data.professeur) ? (`Mr/Mm. ${data.professeur.nom}`) : null}</span></span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/professeurs'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Professeurs  </Link><span style={{ margin: '3px' }}> / </span>
                        <Link to={'/professeur/' + matricule} style={{ textDecorationLine: 'underline', color: 'white' }} > {(data && data.professeur) ? (`Mr/Mm. ${data.professeur.nom}`) : null} </Link>
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Button variant='contained' onClick={() => { }} color='success'>Modifier</Button>
                    <Button variant='contained' onClick={() => { navigation(-1) }} color='error'>Bloquer</Button>
                </div>
            </div>
            <Container fluid >

                <div >
                    <h1>Compte professeur</h1>

                    {isLoading ?
                        <div style={{ marginLeft: '40%' }} >
                            <CircularProgress size={40} />
                        </div>
                        : error ?
                            <MessageErrorServeur />
                            :
                            <>
                                {(data) ?
                                    <>
                                        <Row>
                                            <Col>
                                                <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: 10, borderRadius: 5 }}>
                                                    <h3>Informations générales</h3>
                                                    <span>Matricule : {data.professeur.matricule}</span>
                                                    <span>Nom : {data.professeur.nom}</span>
                                                    <span>Prénom : {data.professeur.prenom}</span>
                                                    <span>Email : {data.professeur.email}</span>
                                                    <span>Date d'inscription : {data.professeur.dateInscription}</span>
                                                    <span>Profession : {data.professeur.profession}</span>
                                                    <span>Region : {data.professeur.region}</span>
                                                    <span>Age : {data.professeur.age}</span>
                                                    <span>Statut : {data.professeur.statut}</span>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row style={{ marginTop: 10 }}>
                                            <Col>
                                                <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: 10, borderRadius: 5 }}>
                                                    <h3>Modules associer a ce professeur</h3>
                                                    <AjoutModuleToProf formProf={data} setUpdate={setUpdate} update={update} />
                                                    {data.moduleSimpleForms.length === 0 ? <span style={{ fontSize: 17 }}>Aucun module Associer a ce professeur</span>
                                                        :
                                                        <Table width={"100%"} hover size="sm" style={{ marginBottom: '0px', }}>
                                                            <thead className='header' style={{ position: 'sticky', top: 0, background: 'white' }}>
                                                                <tr>
                                                                    <th>N°</th>
                                                                    <th>Module</th>
                                                                    <th>Nbr Chapitre</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody >
                                                                {data.moduleSimpleForms.map((module, index) => (
                                                                    <tr key={module.id} style={{ height: '40px' }}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{module.titre}</td>
                                                                        <td>{module.nbrChapitre}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <h3>Aucun professeur trouver trouvé</h3>
                                    </div>

                                }
                            </>
                    }
                </div>
            </Container>
        </>
    )
}

const AjoutModuleToProf = ({ formProf, setUpdate, update }) => {
    const requestURL = '/admin/linkprofesseurtomodule/';
    const [open, setOpen] = useState(false)
    const [formLink, setFormLink] = useState([])
    const [save, setSave] = useState(false)
    const [errorServeur, setErrorServeur] = useState(false)
    const [error, setError] = useState({
        textError: null,
    })

    const handleClose = () => {
        setOpen(false)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }


    const handleLinkModule = (event, idModule) => {
        //console.log("formProf == ", formProf)
        let newForm = formLink;
        let link = {
            idModule: idModule,
            isLinked: event.target.checked
        }

        if (newForm.length === 0) {
            newForm.push(link)
        } else {
            let index = newForm.findIndex((item) => item.idModule === idModule)
            if (index === -1) {
                newForm.push(link)
            } else {
                newForm[index] = link
            }
        }

        setFormLink(newForm)
        console.log("formLink == ", formLink)
    }

    const handleSave = () => {
        setError(prev => ({ ...prev, textError: null }))
        setErrorServeur(false)
        setSave(true)
    }

    return (
        <>
            <Button variant='contained' onClick={handleClickOpen} color='success'>
                Associer ou dissocier un module
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Ajout d'un module au professur {formProf.professeur.nom}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <span>Selectionner les modules a associer a ce professeur</span>
                        <br />
                        {errorServeur && <MessageErrorServeur />}
                        {save &&
                            <SaveComponent
                                setSave={setSave}
                                save={save}
                                requestURL={requestURL}
                                requestBody={formLink}
                                requestMethode={'POST'}
                                requestParam={(formProf && formProf.professeur) ? formProf.professeur.matricule : null}
                                setErrorServeur={setErrorServeur}
                                setError={setError}
                                setUpdate={setUpdate}
                            />
                        }

                        {error.textError &&
                            <div style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 5, margin: 10, fontSize: 16 }}>
                                {error.textError}
                            </div>
                        }
                        <br />
                        {(formProf && formProf.modules) ?
                            (formProf.modules.map((item, index) => (
                                <div key={item.idModule} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: "center" }}>
                                    <span>{item.titre}</span>
                                    <Checkbox
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        defaultChecked={
                                            formProf.moduleSimpleForms.some((item2) => item2.idModule === item.idModule)
                                        }
                                        onChange={(event) => handleLinkModule(event, item.idModule)}
                                    />
                                </div>
                            )))
                            :
                            null
                        }

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
    )
}

