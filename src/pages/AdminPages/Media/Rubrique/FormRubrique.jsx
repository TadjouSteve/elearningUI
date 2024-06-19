import { TextField } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";

export const FormRubrique = ({ form, setForm }) => {
    const setNom = (e) => {
        setForm({ ...form, nom: e.target.value });
    }

    return (
        <>
            <Container fluid >
                <Row style={{ backgroundColor: 'white', borderRadius: 5, margin: 10, padding: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Nom de la Rubrique'
                                placeholder='Ex: Afrique'
                                fullWidth
                                value={form.nom}
                                onChange={(e) => setNom(e)}
                            />
                        </Col>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Categorie'
                                placeholder='Ex: ...'
                                fullWidth
                                value={form.categorie}
                                onChange={(e) => { setForm({ ...form, categorie: e.target.value }); }}
                            />
                        </Col>
                        <Col>
                            <TextField
                                label="Niveau d'ordre"
                                placeholder='Ex: 1'
                                fullWidth
                                type='number'
                                value={form.ordre}
                                onChange={(e) => { setForm({ ...form, ordre: e.target.value }); }}
                            />
                        </Col>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                        <Col>
                            <TextField
                                label='Description'
                                placeholder=' cette rubrique est pour....'
                                multiline
                                rows={4}
                                fullWidth
                                value={form.description}
                                onChange={(e) => { setForm({ ...form, description: e.target.value }); }}
                            />
                        </Col>

                    </div>

                </Row>
            </Container>
        </>
    )
}