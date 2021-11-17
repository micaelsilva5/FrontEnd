import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Inicio = () => {
    return (
        <Container fluid className="p-0">
            <Cabecalho />
            <Row>
                <Col xs={12} lg={6}>
                    <h1> Seja Bem vindo ao Site IComidas!</h1>
                    <p> Site destinado ao Cadastro de Clientes. </p>
                    <p> Por favor acessar o menu Cadastro. </p>
                </Col>

            </Row>
            <Rodape />
        </Container>
    )
}

export default Inicio