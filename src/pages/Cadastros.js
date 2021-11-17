import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'
import { MdMenuBook, MdModeEdit, MdDelete, MdSave, MdLogin, MdClosedCaptionDisabled, MdLibraryAdd } from 'react-icons/md'
import { BACKEND } from '../constants'

const Cadastros = () => {
    const valorInicial = { nome: '', genero: '', cidade: '', estado: '', status: true }
    const [cadastro, setCadastro] = useState(valorInicial)
    const [cadastros, setCadastros] = useState([])
    const [carregandoCadastros, setcarregandoCadastros] = useState(false)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoCadastros, setsalvandoCadastros] = useState(false)
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const { nome, genero, cidade, estado, status } = cadastro

    async function obterCadastros() {
        setcarregandoCadastros(true)
        let url = `${BACKEND}/cadastros`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setCadastros(data)
            })
            .catch(function (error) {
                console.error('Erro ao obter as cadastros: ' + error.message)
            })
        setcarregandoCadastros(false)
    }

    useEffect(() => {
        obterCadastros()
        document.title = 'Cadastro de Clientes'
    }, [])

    const validaErroscadastro = () => {
        const novosErros = {}
        //Validação de Campos
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto'
        if (!genero || genero === '') novosErros.genero = 'O Genero não pode ser vazio!'
        else if (genero.length > 1) novosErros.genero = 'O Genero informado é muito longo'
        else if (genero.length < 0) novosErros.genero = 'O Genero informado é muito curto'
        if (!cidade || cidade === '') novosErros.cidade = 'A Cidade não pode ser vazio!'
        else if (cidade.length > 30) novosErros.cidade = 'A Cudade informada é muito longo'
        else if (cidade.length < 3) novosErros.cidade = 'A cidade informada é muito curto'
        if (!estado || estado === '') novosErros.estado = 'O Estado não pode ser vazio!'
        else if (estado.length > 2) novosErros.estado = 'O Estado informada é muito longo'
        else if (estado.length < 0) novosErros.estado = 'O Estado informada é muito curto'
        return novosErros
    }

    async function salvarcadastro(event) {
        event.preventDefault() // evita que a página seja recarregada
        const novosErros = validaErroscadastro()
        if (Object.keys(novosErros).length > 0) {
            //Sim, temos erros!
            setErros(novosErros)
        } else {
            setsalvandoCadastros(true)
            const metodo = cadastro.hasOwnProperty('_id') ? 'PUT' : 'POST'
            cadastro.status = (cadastro.status === true || cadastro.status === 'ativo') ? 'ativo' : 'inativo'
            let url = `${BACKEND}/cadastros`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cadastro)
            }).then(response => response.json())
            .then(data => {
                (data._id || data.message) ? setAviso('Registro salvo com sucesso') : setAviso('')
                setCadastro(valorInicial) //limpar a tela com os valores iniciais
                obterCadastros() //Atualizar a tela com os registros atualizados
            }).catch(function (error){
                console.error(`Erro ao salvar a cadastro: ${error.message}`)
            })
            setsalvandoCadastros(false)
        }
    }

    async function excluircadastro(){
        let url = `${BACKEND}/cadastros/${cadastro._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            data.message ? setAviso(data.message) : setAviso('')
            obterCadastros()
        })
        .catch(function (error) {
            console.error(`Erro ao excluir a cadastro: ${error.message}`)
        })
    }

    const alteraDadoscadastro = e => {
        setCadastro({ ...cadastro, [e.target.name]: e.target.value })
        setErros({})
    }

    return (
        <Container fluid className="p-0">
            <Cabecalho />
            <Row>
                <Col xs={12} lg={6}>
                    {/* Formulário de Clientes */}
                    <h4><MdLibraryAdd /> Cadastro de Cliente</h4>
                    <Form method="post">
                        <Form.Group controlId="nome">
                            <Form.Label>Nome do Cliente</Form.Label>
                            <Form.Control
                                name="nome"
                                placeholder="Ex: João"
                                value={nome}
                                onChange={alteraDadoscadastro}
                                isInvalid={!!erros.nome}
                        
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.nome}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="genero">
                            <Form.Label>Genero</Form.Label>
                            <Form.Control
                                name="genero"
                                placeholder="Ex: M ou F"
                                value={genero}
                                onChange={alteraDadoscadastro}
                                isInvalid={!!erros.genero}
                        
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.genero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="cidade">
                            <Form.Label>Informe a Cidade</Form.Label>
                            <Form.Control
                                name="cidade"
                                placeholder="Ex: Sorocaba"
                                value={cidade}
                                onChange={alteraDadoscadastro}
                                isInvalid={!!erros.cidade}
                        
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.cidade}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="estado">
                            <Form.Label>Informe o Estado</Form.Label>
                            <Form.Control
                                name="estado"
                                placeholder="Ex: SP"
                                value={estado}
                                onChange={alteraDadoscadastro}
                                isInvalid={!!erros.estado}
                        
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.estado}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Check type="checkbox" label="Ativo" name="status"
                                onChange={(e) => setCadastro({ ...cadastro, [e.target.name]: e.target.checked })}
                                checked={status} />
                        </Form.Group>
                        <Button variant="primary" type="submit"
                            onClick={(e) => salvarcadastro(e)}
                            title="Salvar o registro">
                            {salvandoCadastros
                                ? <><Spinner animation="border" size="sm" /> Aguarde...</>
                                : <><MdSave /> Salvar</>
                            }
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} lg={6}>
                    {/* Listagem de Cadastros */}
                    <h4><MdMenuBook /> Listagem das cadastros</h4>
                    {carregandoCadastros &&
                        <>
                            <Spinner animation="border" variant="primary" />
                            <p>Aguarde, enquanto as cadastros são carregadas...</p>
                        </>
                    }
                    <Table striped bordered>
                        <thead>
                            <tr className="bg-info text-dark">
                                <th>Nome</th>
                                <th>Genero</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Status</th>
                                <th>Inclusão</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cadastros.map(item => (
                                <tr key={item._id}>
                                    <td>{item.nome}</td>
                                    <td>{item.genero}</td>
                                    <td>{item.cidade}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.status}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="outline-primary" title="Alterar o registro"
                                        onClick={() => setCadastro(item)}
                                        >
                                            <MdModeEdit />
                                        </Button>
                                        &nbsp;
                                        <Button variant="outline-danger" title="Excluir o registro"
                                        onClick={() => {
                                            setConfirmaExclusao(true)
                                            setCadastro(item)
                                        }}
                                        >
                                            <MdDelete />
                                        </Button>

                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-success text-white">
                                <td colSpan="3">Total de Registros:</td>
                                <td>{cadastros.length}</td>
                            </tr>
                        </tbody>

                    </Table>
                </Col>

            </Row>
            <Toast
                onClose={() => setAviso('')}
                show={aviso.length > 0}
                animation={false}
                delay={4000}
                autohide
                className="bg-success"
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}>
                <Toast.Header closeButton={false}>Aviso</Toast.Header>
                <Toast.Body>{aviso}</Toast.Body>
            </Toast>
            <Modal animation={false} show={confirmaExclusao}
            onHide={()=> setConfirmaExclusao(false)}>
                <Modal.Header>
                    <Modal.Title>Confirmação da Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão da cadastro selecionada?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                    ❌Cancelar
                    </Button>
                    <Button variant="success"
                    onClick={() => {
                        excluircadastro()
                        setConfirmaExclusao(!confirmaExclusao)
                    }}>
                    ✅Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Rodape />
        </Container>
    )
}

export default Cadastros