import { jwtDecode } from 'jwt-decode';

function setToken(token) {
    localStorage.setItem('access_token', token);
  }

function getToken() {
    try {
      return localStorage.getItem('access_token');
    } catch (err) {
      return null;
    }
  }

function removeToken() {
    localStorage.removeItem('access_token');
  }
  
function readToken() {
    try {
      const token = getToken();
      return token ? jwtDecode(token) : null;
    } catch (err) {
      return null;
    }
  }

function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
  }

async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
    
    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);

    const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  } else {
    throw new Error('Server response is not valid JSON');
  }
}

async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password, password2: password2 }),
        headers: {
          'content-type': 'application/json',
        },
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
      
        if (res.status === 200) {
          return true;
        } else {
          throw new Error(data.message);
        }
      } else {
        throw new Error('Server response is not valid JSON');
      }
    }

    module.exports = {
        setToken,
        getToken,
        removeToken,
        readToken,
        isAuthenticated,
        authenticateUser,
        registerUser,
    };