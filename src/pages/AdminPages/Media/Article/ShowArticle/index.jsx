import { Button, CircularProgress, Container } from '@mui/material';
import React, { useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MessageErrorServeur } from '../../../../../composants/MessageComponent';
import { useFetch } from '../../../../../utils/hooks/FetchData';

export default function ShowArticle() {
    const { idArticle } = useParams();
    const navigation = useNavigate();
    const [update, setUpdate] = useState(false)
    const { isLoading, data, error } = useFetch(`/media/article/${idArticle}`, 'GET', null, null, update)
    //console.log("data rubrique == ", data)

    const handleModifierClick = () => {
        // Logique pour gérer le clic sur le bouton "Modifier"
    }
    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Article <span>{(data && data.titre) ? (` ${data.titre}`) : null}</span></span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/article'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Professeurs  </Link><span style={{ margin: '3px' }}> / </span>
                        <Link to={'/article/' + idArticle} style={{ textDecorationLine: 'underline', color: 'white' }} > {(data && data.titre) ? (`${data.titre}`) : null} </Link>
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Button variant='contained' onClick={handleModifierClick} color='success'>Modifier</Button>
                    <Button variant='contained' onClick={() => { navigation(-1) }} color='error'>Bloquer</Button>
                </div>
            </div>
        </>
    )
}
