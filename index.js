'use strict';
import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './src/Main';

injectTapEventPlugin();

//=============================================================================

class ReactWebpackCordova extends Component{
  render(){
    return (
      <div>
          top level
          <Main />
      </div>
    )
  }
};


ReactDOM.render(
  <ReactWebpackCordova />,
  document.getElementById('ReactRoot')
);
