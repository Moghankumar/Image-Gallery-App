import './App.css';
import React from 'react'
import Gallery from './Gallery';
import {BrowserRouter, Switch,Route} from "react-router-dom";
import Mountains from './Mountains'
import Beachs from './Beachs';
import Birds from './Birds';
import Foods from './Foods';
import Header from './Header';
import Test from './Test';
// import Cards from './Cards';

function App() {
  return (
    <div>
      <BrowserRouter>                
        <Switch>
          <Route exact path="/" component={Gallery}/>
          <Route exact path="/search" component={Header}/>
          <Route exact path="/images/mountain" component={Mountains}/>
          <Route exact path="/:id" component={Test}/>
          {/* <Route exact path="" component={Cards}/> */}
          <Route exact path="/images/beach" component={Beachs}/>
          <Route exact path="/images/bird" component={Birds}/>
          <Route exact path="/images/food" component={Foods}/>
        </Switch>
      </BrowserRouter>
     
    </div>
    
  );
}

export default App;
