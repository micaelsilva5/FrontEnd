import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { MdHome, MdLogin, MdHomeWork, MdSupervisedUserCircle } from 'react-icons/md'

const Cabecalho = () => {
    return (
    <Navbar bg="primary" variant="dark">
        <Navbar.Brand><MdHomeWork/> Cadastro de Clientes do Site IComidas</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#/"><MdHome/> Início</Nav.Link>
            <Nav.Link href="#/cadastros"><MdSupervisedUserCircle/> Cadastro</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default Cabecalho