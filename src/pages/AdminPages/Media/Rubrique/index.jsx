import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { Button, CircularProgress } from '@mui/material';
import { useFetch } from '../../../../utils/hooks/FetchData';
import { MessageErrorServeur } from '../../../../composants/MessageComponent';

export default function Rubrique() {
    const navigation = useNavigate();
    const [pageNumber, setPageNumber] = useState(0)
    const [filter, setFilter] = useState(null)
    //const { isOnline, language } = useContext(AppContext);
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch(`/media/rubriques/${pageNumber}`, 'GET', null, filter, update)
    console.log("data rubique == ", data)
    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Rubrique media</span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/rubrique'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Rubrique  </Link>
                    </span>
                </div>
                <div>
                    <Button variant='contained' onClick={() => { navigation('/rubrique/creer') }} color='success'>Ajouter</Button>

                </div>
            </div>
            <Container fluid >

                <div >
                    <h1>Liste des Rubriques d'article</h1>

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
                                                <th>Nom</th>
                                                <th>Categorie</th>
                                                <th>Ordre</th>
                                                <th>Statut</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {data.content.map((rubrique, index) => (
                                                <tr key={rubrique.id + "idRubrique"} style={{ height: '40px' }}>
                                                    <td className='body_tr'>{index + 1} </td>
                                                    <td className='body_tr'>{rubrique.nom}</td>
                                                    <td className='body_tr'>{rubrique.categorie}</td>
                                                    <td className='body_tr'>{rubrique.ordre}</td>
                                                    <td className='body_tr'>{rubrique.statut}.</td>
                                                    <td className='body_tr'>
                                                        <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                                            <Button variant='contained' color='error' sx={{ fontSize: 10, }} >Bloquer</Button>{' '}
                                                            <Button variant='outlined' color='info' sx={{ fontSize: 10, }} onClick={() => { navigation(`/rubrique/${rubrique.id}`) }} >Voir plus</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <h3>Aucune rubrique trouvée</h3>
                                    </div>

                                }

                            </>
                    }
                </div>
            </Container>
        </>

    )
}
