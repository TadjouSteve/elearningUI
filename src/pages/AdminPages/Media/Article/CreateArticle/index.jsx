import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageErrorServeur } from '../../../../../composants/MessageComponent'
import SaveComponent from '../../../../../composants/SaveComponent'
import { Button } from '@mui/material';
import FormArticle from '../FormArticle';

export default function CreateArticle() {
    const requestURL = '/admin/media/article/';
    const [formArticle, setFormArticle] = useState({})
    const [idModule, setIdModule] = useState(-1)
    const [save, setSave] = useState(false)
    const [errorServeur, setErrorServeur] = useState(false)
    const [error, setError] = useState({
        textError: null,
    })

    const navigation = useNavigate();
    const ajoutArticle = () => {
        setError(prev => ({ ...prev, textError: null }))
        setErrorServeur(false)
        setSave(true)
    }

    return (
        <>
            <div className="headerPage" style={{ backgroundColor: '#17bd08cc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <div id="Links" style={{ display: "flex", flexDirection: "column", fontWeight: "500", color: 'white' }}>
                    <span>Ajout d'un article</span>
                    <span style={{ fontWeight: "normal", }}>
                        <Link to={'/article'} style={{ textDecorationLine: 'underline', color: 'white' }} >   Articles  </Link><span style={{ margin: '3px' }}> / </span>
                        <Link to={'/article/creer'} style={{ textDecorationLine: 'underline', color: 'white' }} > ajout d'un article </Link>
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Button variant='contained' onClick={() => ajoutArticle()} color='success'>Enregistrer</Button>
                    <Button variant='contained' onClick={() => { navigation(-1) }} color='error'>Annuler</Button>
                </div>
            </div>
            {errorServeur && <MessageErrorServeur />}
            {save &&
                <SaveComponent
                    setSave={setSave}
                    save={save}
                    requestURL={requestURL}
                    requestBody={formArticle}
                    requestMethode={'POST'}
                    requestParam={idModule}
                    setErrorServeur={setErrorServeur}
                    setError={setError}
                    redirected={true}
                />
            }
            {error.textError &&
                <div style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 5, margin: 10, fontSize: 16, borderRadius: 5 }}>
                    {error.textError}
                </div>
            }

            <FormArticle form={formArticle} setForm={setFormArticle} setIdModule={setIdModule} requestMethode='POST' />
        </>
    )
}
