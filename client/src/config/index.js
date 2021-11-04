const baseUrl = 'http://localhost:5000';
const authUrl = `${baseUrl}/auth`;
const apiUrl = `${baseUrl}/api/v1`;

const auth = {
  url: authUrl,
};

const api = {
  url: apiUrl,
};

export default {
  auth,
  api,
};
