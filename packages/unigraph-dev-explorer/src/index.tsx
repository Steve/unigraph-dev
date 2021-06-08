import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import init from './init';
import * as serviceWorker from './serviceWorker';

import App from './App';
import { SplashScreen, DisconnectedSplashScreen} from './pages/SplashScreen';
import { WorkSpace } from './Workspace';


init();

function render(component: any) {
  ReactDOM.render(
    <React.StrictMode>{component}</React.StrictMode>,
    document.getElementById('root')
  )
}

if (window.location.pathname === '/pages') {
  render(<App />)
} else {
  render(<SplashScreen />);
  
  window.unigraph.backendConnection.onopen = () => {
    // Register notification center
    // TODO: Do we need a state management library? Ask around and evaluate.
    window.unigraph.subscribeToType("$/schema/notification", (data: any[]) => {
      const nfState = window.unigraph.getState('notification-center/notifications');
      nfState.setValue(data);
    })

    if (typeof window.electronPreload === "function") window.electronPreload();

    render(<WorkSpace />);
  };
  
  window.unigraph.backendConnection.onclose = () => {
    setTimeout(() => {window.location.reload()}, 1000) 
    render(<DisconnectedSplashScreen />,)
  };
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
