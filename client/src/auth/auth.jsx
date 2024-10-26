import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios.post('http://localhost:4000/api/users/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const res = await axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('token');
};
