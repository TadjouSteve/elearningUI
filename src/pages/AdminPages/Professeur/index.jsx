import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../../../utils/hooks/FetchData';
import { Container, Table } from 'react-bootstrap';
import { MessageErrorServeur } from '../../../composants/MessageComponent';
import { Button, CircularProgress } from '@mui/material';

export default function Professeur() {

    const navigation = useNavigate();
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState(null)
    //const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch(`/admin/professeurs/${pageNumber}`, 'GET', null, filter, update)
    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Professeurs</span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/professeurs'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Professeurs  </Link>
                    </span>
                </div>
                <div>
                    <Button variant='contained' onClick={() => { navigation('/professeur/ajouter') }} color='success'>Ajouter</Button>

                </div>
            </div>
            <Container fluid >

                <div >
                    <h1>Liste des professeurs</h1>

                    {isLoading ?
                        <div style={{ marginLeft: '40%' }} >
                            <CircularProgress size={40} />
                        </div>
                        : error ?
                            <MessageErrorServeur />
                            :
                            <>
                                {(data && data.content && data.content.length > 0) ?
                                    <Table width={"100%"} hover size="sm" style={{ marginBottom: '0px', }}>
                                        <thead className='header' style={{ position: 'sticky', top: 0, background: 'white' }}>
                                            <tr>
                                                <th>N°</th>
                                                <th>Matricule</th>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>téléphone</th>
                                                <th>Email</th>
                                                <th>Date d'inscription</th>
                                                <th>Profession</th>
                                                <th>Actionss</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {data.content.map((professeur, index) => (
                                                <tr key={professeur.matricule} style={{ height: '40px' }}>
                                                    <td className='body_tr'>{index + 1} </td>
                                                    <td className='body_tr'>{professeur.matricule}</td>
                                                    <td className='body_tr'>{professeur.nom}</td>
                                                    <td className='body_tr'>{professeur.prenom}</td>
                                                    <td className='body_tr'>{professeur.email}</td>
                                                    <td className='body_tr'>{professeur.telephone}</td>
                                                    <td className='body_tr'>{(new Date(professeur.dateInscription)).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })} </td>
                                                    <td className='body_tr'>{professeur.profession}</td>

                                                    <td className='body_tr'>
                                                        <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                                            <Button variant='contained' color='error' sx={{ fontSize: 10, }} >Bloquer</Button>{' '}
                                                            <Button variant='outlined' color='info' sx={{ fontSize: 10, }} onClick={() => { navigation(`/professeur/${professeur.matricule}`) }} >Voir plus</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <h3>Aucun étudiant trouvé</h3>
                                    </div>

                                }

                            </>
                    }
                </div>
            </Container>
        </>

    )
}
