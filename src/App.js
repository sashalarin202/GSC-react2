import './App.css';
import GoogleBtn from './components/GoogleBtn';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import React from 'react';

const clienId = "58204115475-omuct51pt6u998n1mmrm5k0rjogiguv4.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start(){
      gapi.client.init({
        clienId: clienId,
        scope: ['https://www.googleapis.com/auth/webmasters.readonly'].join(' ')
      })
    }
    gapi.load("client:auth2", start)
  })

  return (
    <>
      <GoogleBtn />
    </>
  );
}

export default App;
