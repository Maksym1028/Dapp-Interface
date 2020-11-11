export const apiUrl = 'http://localhost:5000/api';
export const GeocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
export const GeocodeApiKey = 'AIzaSyDHaXYynYE6xzzbzmA7Rg5h1-S9BZ_uthc';

export enum ApiMethod {
  GET = 'get',
  POST = 'post',
};

export const apiOptions = (
  method: ApiMethod,
  data?: any,
  authorization?: string
): RequestInit => {
  return data ? {
    method: method,
    headers: authorization ? {
      'Content-Type': 'application/json',
      'Authorization': authorization,
    } : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  } : {
    method: method,
    headers: authorization ? {
      'Content-Type': 'application/json',
      'Authorization': authorization,
    } : {
      'Content-Type': 'application/json'
    },
  }
};
