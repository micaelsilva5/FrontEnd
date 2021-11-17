import React from 'react'

import Navbar from 'react-bootstrap/Navbar'

import { MdCode, MdNotInterested } from 'react-icons/md'

const Rodape = () => {
    return(
<Navbar bg="dark" fixed="bottom">
    <Navbar.Brand className="text-light">
        <MdNotInterested /> IComidas Site de Cadastro &copy; - Todos os direitos reservados <MdNotInterested />
    </Navbar.Brand>
</Navbar>
    )
}

export default Rodape