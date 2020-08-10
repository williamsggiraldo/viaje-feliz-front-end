import React, { Component } from 'react';
import Navegacion from './components/Navegacion';
import Bienvenida from './components/Bienvenida'
import Registro from './components/Registro'
import {BrowserRouter as Router, Switch}  from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { Route } from 'react-router-dom';
import Viviendas from './components/Viviendas';
import ViviendaDetalle from './components/ViviendaDetalle'


export default class App extends Component {

  state = {
    listaViviendas: []
  }

  componentDidMount() {

    fetch('http://localhost:8080/viviendas/todas')
      .then(response => response.json())
      .then(response =>{

        let listaViviendas = [];

        for (let i of response) {
          
          let id = i.id;
          let permiteMascotas = i.permiteMascotas; 
          let aireAcondicionado = i.aireAcondicionado;
          let calefaccion = i.calefaccion;
          let numeroBanios = i.numeroBanios;
          let precioMinimo = i.precioMinimo;
          let numeroHabitaciones = i.numeroHabitaciones;
          let tipo = i.tipo;
          let imagenes = i.rutaImagen.split(" ");
          let numeroPersonas = i.numeroPersonas;

          const obj = {id, permiteMascotas, aireAcondicionado, calefaccion, numeroBanios,
            precioMinimo, numeroHabitaciones, tipo, imagenes, numeroPersonas};

          listaViviendas.push(obj);
        }

        this.setState({
          listaViviendas
        })

      })
      .catch(error => console.log(error))

    // let listaViviendas = [
    //   {"id": 1 , "tipo": 1, "precioDiario": 285.000, "imagenes": ['vivienda1-1',"vivienda1-2","vivienda1-3"]},
    //   {"id": 2 , "tipo": 2, "precioDiario": 100.000, "imagenes": ["vivienda2-1","vivienda2-2","vivienda2-3"]},
    //   {"id": 3 , "tipo": 1, "precioDiario": 700.000, "imagenes": ["vivienda3-1","vivienda3-2","vivienda3-3"]},
    //   {"id": 4 , "tipo": 2, "precioDiario": 850.000, "imagenes": ["vivienda4-1","vivienda4-2","vivienda4-3"]},
    //   {"id": 5 , "tipo": 2, "precioDiario": 200.000, "imagenes": ["vivienda5-1","vivienda5-2","vivienda5-3"]},
    //   {"id": 6 , "tipo": 1, "precioDiario": 900.000, "imagenes": ["vivienda6-1","vivienda6-2","vivienda6-3"]}
    // ]

    // this.setState({
    //   listaViviendas
    // })
  }

  render() {
    return (
      <div>
        <Router>
            <Navegacion />
            <Switch>
              <Route exact path="/viviendas">
                <Viviendas viviendas={this.state.listaViviendas}/>
              </Route>
              <Route exact path="/registro">
                <Registro />
              </Route>
              <Route exact path="/viviendadetalle/:viviendaId" render={(props) => {
                let idVivienda = parseInt(props.location.pathname.replace("/viviendadetalle/",""));
                let informacion = this.state.listaViviendas.filter(vivienda => vivienda.id === idVivienda)[0];
                return(
                  <ViviendaDetalle informacion={informacion} />
                )
              }}/>
              <Route path="/" exact component={Bienvenida} />
            </Switch>
        </Router>
      </div>
    )
  }
}
