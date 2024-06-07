

import React, { useContext } from 'react'
import { useFetch } from '../../utils/hooks/FetchData';
import { AppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export default function SaveComponent({ setErrorServeur, setSave, setOpen, setError, requestBody, requestMethode, setUpdate, requestURL, requestParam, redirected }) {
    requestMethode = requestMethode ? requestMethode : 'POST'
    requestURL = requestURL ? requestURL : 'URL_non_defini'

    const { isOnline, language, setUser } = useContext(AppContext);
    const { isLoading, data, error } = useFetch(requestURL, requestMethode, requestBody, requestParam)
    const navigation = useNavigate();
    console.log("donner retour == ", data)
    console.log("isRedirected? == ", redirected)
    if (isLoading) {
        return (
            <div style={{ marginLeft: '40%' }} >
                {/* <CircularProgress size={40} /> */}
                <Backdrop open={true} style={{ zIndex: 1000, color: '#fff', }}>
                    <CircularProgress
                        style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-20px', marginLeft: '-20px' }}
                        color="inherit"
                    />
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

            if (redirected == true) {
                console.log("Redirected url == ", data.url)
                navigation(data.url)
            } else {
                if (setUpdate) {
                    setUpdate(prevUpdate => !prevUpdate)

                }
                if (setOpen) {
                    setOpen(false)
                }

            }
            //navigation('/professeur/' + data.matricule)
        }
    }
}
