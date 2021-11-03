import axios from 'axios';

export const getHttpCat = function (data: number) {
  return axios.get(`/${data}`, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
    responseType: 'blob',
  });
};
