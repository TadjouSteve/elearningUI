import { Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import Header from '../../../composants/Header';
import { AppContext } from '../../../context';
import { useFetch } from '../../../utils/hooks/FetchData';
import { MessageErrorServeur } from '../../../composants/MessageComponent';
import { useNavigate } from 'react-router-dom';
import "./tableauCSS.css";
export default function Etudiant() {
    const navigation = useNavigate();
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState(null)
    //const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch(`/admin/etudiants/${pageNumber}`, 'GET', null, filter, update)



    return (
        <Container fluid >

            <div >
                <h1>Liste des étudiants</h1>

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
                                            <th>Région</th>
                                            <th>Âge</th>
                                            <th>Actionss</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {data.content.map((etudiant, index) => (
                                            <tr key={etudiant.matricule} style={{ height: '40px' }}>
                                                <td className='body_tr'>{index + 1} </td>
                                                <td className='body_tr'>{etudiant.matricule}</td>
                                                <td className='body_tr'>{etudiant.nom}</td>
                                                <td className='body_tr'>{etudiant.prenom}</td>
                                                <td className='body_tr'>{etudiant.email}</td>
                                                <td className='body_tr'>{etudiant.telephone}</td>
                                                <td className='body_tr'>{(new Date(etudiant.dateInscription)).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })} </td>
                                                <td className='body_tr'>{etudiant.profession}</td>
                                                <td className='body_tr'>{etudiant.region}</td>
                                                <td className='body_tr'>{etudiant.age}</td>
                                                <td className='body_tr'>
                                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                                        <Button variant='contained' color='error' sx={{ fontSize: 10, }} >Bloquer</Button>{' '}
                                                        <Button variant='outlined' color='info' sx={{ fontSize: 10, }} onClick={() => { navigation(`/etudiant/${etudiant.matricule}`) }} >Voir plus</Button>
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

    );
};




