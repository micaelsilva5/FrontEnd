import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Inicio from '../pages/Inicio'
import Cadastros from '../pages/Cadastros'

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/cadastros" component={Cadastros} />
            </Switch>
        </HashRouter>
    )
}