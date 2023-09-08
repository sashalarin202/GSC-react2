import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

const CLIENT_ID = '58204115475-l0adfrri5pf9nrih03c541pv9i563n3n.apps.googleusercontent.com';

function GoogleBtn() {
  const [data, setData] = useState(null);
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = (res) => {
    if (res.accessToken) {
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
          console.log(response.data.rows)
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
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        />
        // <Dashboard></Dashboard>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />
      )}
      
    </div>
  );
}

export default GoogleBtn;
