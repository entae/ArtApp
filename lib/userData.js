import { getToken } from './authenticate';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(endpoint, method = 'GET', body = null) {
  const token = getToken();
  const headers = {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${apiUrl}${endpoint}`, options);
  
  // if (process.env.NODE_ENV === 'development') { 
  //   console.log('Response status:', response.status);
  //   console.log('Response headers:', response.headers);
  // }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    if (response.status === 200) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Server response is not valid JSON');
    }
  } else {
    throw new Error('Server response is not valid JSON');
  }
}

export async function addToFavourites(id) {
  return await apiRequest(`/favourites/${id}`, 'PUT');
}

export async function removeFromFavourites(id) {
  return await apiRequest(`/favourites/${id}`, 'DELETE');
}

export async function getFavourites() {
  return await apiRequest('/favourites');
}

export async function addToHistory(id) {
  return await apiRequest(`/history/${id}`, 'PUT');
}

export async function removeFromHistory(id) {
  return await apiRequest(`/history/${id}`, 'DELETE');
}

export async function getHistory() {
  return await apiRequest('/history');
}
