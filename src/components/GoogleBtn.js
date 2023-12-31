import React, { useState } from 'react';
import  './GoogleBtn.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import lock from '../assets/lock.jpg';
import Dashboard from './Dashboard/DashBoard';

const CLIENT_ID = '58204115475-omuct51pt6u998n1mmrm5k0rjogiguv4.apps.googleusercontent.com';

function GoogleBtn() {
  const [data, setData] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = (res) => {
    if (res.accessToken) {
      console.log('LOGIN SUCCESS', res)
      setIsLogined(true);
      setAccessToken(res.accessToken);
    }
    const fetchData = async () => {
        const accessToken = res.accessToken; 
        const startDate = '2023-06-07';
        const endDate = '2023-09-07';
        const dimensions = ['PAGE'];
        const rowLimit= 10;
        try {
          const response = await axios.post(
            'https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Aenguide.pl/searchAnalytics/query?',
            {
              startDate,
              endDate,
              dimensions,
              rowLimit
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
  
          setData(response.data.rows);
          if (res.profileObj) {
          }
        } catch (error) {
          console.error('Ошибка при запросе данных:', error);
        }
    };
    fetchData();
  };

  const logout = () => {
    setIsLogined(false);
    setAccessToken('');
  };

  const handleLoginFailure = (response) => {
    alert('Failed to log in');
  };

  const handleLogoutFailure = (response) => {
    alert('Failed to log out');
  };

  return (
    <div>
    {isLogined ? (
      <div className='logOut'>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        />
        {data !== null ? (
          <Dashboard data={data}></Dashboard>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    ) : (
      <div className='container'>
        <div className="button-container">
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText='Login'
            onSuccess={login}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="custom-button">Google Connect Serach Console</button>
            )}
          />
        </div>
        <div className="container-discription">
          <img src={lock}></img>
          <p>Secure API connection. Only keywords and their position will be accessible to the platform. No other access right</p>
        </div>
      </div>
    )}
  </div>
  );
}

export default GoogleBtn;
