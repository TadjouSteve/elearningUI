import React from 'react'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { MessageErrorServeur } from '../../../../composants/MessageComponent';
import { useFetch } from '../../../../utils/hooks/FetchData';

export default function FormArticle({ form, setForm, setIdModule }) {
    const { isLoading, data, error } = useFetch(`/metadata/rubriques/`, 'GET', null)
    console.log("Meta data == ", data)
    const handleSelectChange = (event) => {
        const rubrique = data.find(rubrique => rubrique.nom === event.target.value);
        console.log("rubrique", rubrique)
        setIdModule(rubrique.id)
        setForm({ ...form, rubrique });
    };

    return (
        <>
            {isLoading ?
                <div style={{ marginLeft: '40%' }} >
                    <CircularProgress size={40} />
                </div>
                : error ?
                    <MessageErrorServeur />
                    :
                    <Container fluid >

                        <Row style={{ backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 10 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 10 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="rubrique-label">Rubrique</InputLabel>
                                    <Select
                                        label="Rubrique"
                                        labelId="rubrique-label"
                                        value={form.rubrique?.nom || ''}
                                        onChange={handleSelectChange}
                                    >
                                        {(data && data.length) && data.map((rubrique) => (
                                            <MenuItem key={rubrique.id} value={rubrique.nom}>{rubrique.nom}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                                <Col>
                                    <TextField
                                        label="Titre de l'article"
                                        placeholder='Ex: Nouvelle entreprise crée au cameroun'
                                        fullWidth
                                        value={form.titre}
                                        onChange={(e) => { setForm({ ...form, titre: e.target.value }); }}
                                    />
                                </Col>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                                <Col>
                                    <TextField
                                        label="Sous Titre"
                                        placeholder="Ex: L'essort des nouvelles entreprise au cameroun"
                                        fullWidth
                                        value={form.sousTitre}
                                        onChange={(e) => { setForm({ ...form, sousTitre: e.target.value }); }}
                                    />
                                </Col>

                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                                <Col>
                                    <TextField
                                        label="Contenue textuel de l'article"
                                        placeholder="le texte de l'article ici...."
                                        multiline
                                        rows={8}
                                        fullWidth
                                        value={form.texte}
                                        onChange={(e) => { setForm({ ...form, texte: e.target.value }); }}
                                    />
                                </Col>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                                <Col>
                                    <TextField
                                        label="Nom de l'auteur"
                                        placeholder='Ex: ...'
                                        fullWidth
                                        value={form.auteur}
                                        onChange={(e) => { setForm({ ...form, auteur: e.target.value }); }}
                                    />
                                </Col>
                                <Col>
                                    <TextField
                                        label="Tritre de l'hauteur"
                                        placeholder='Ex: 1'
                                        fullWidth
                                        type='number'
                                        value={form.titreAuteur}
                                        onChange={(e) => { setForm({ ...form, titreAuteur: e.target.value }); }}
                                    />
                                </Col>
                            </div>
                        </Row>
                    </Container>
            }
        </>
    )
}
