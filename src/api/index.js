import axios from 'axios';

import { useAlertStore } from '@/stores/alert';

const baseUrl = import.meta.env.VITE_DELIVER_API_URL;

function headers(token) {
  return { 
    headers: { Authorization: `Bearer ${token}`}
  };
}

function handleError(err) {
  const alertStore = useAlertStore();
  alertStore.error(err.response.data.message);
}

export async function createOrder(token, orderLines) {
  try {
    const res = await axios.post(
      `${baseUrl}/order`,
      orderLines,
      headers(token),
    );
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function deleteAccount(token, email) {
  try {
    const res = await axios.delete(
      `${baseUrl}/user`, 
      {
        headers: { Authorization: `Bearer ${token}`},
        data: {
          email 
        },
      },
    );

    return true;
  } catch (err) {
    handleError(err);
    return false
  }
}

export async function deleteUser(token, email) {
  try {
    const res = await axios.delete(
      `${baseUrl}/admin/user/${email}`, 
      {
        headers: { Authorization: `Bearer ${token}`},
      },
    );

    return true;
  } catch (err) {
    handleError(err);
    return false
  }
}

export async function getOrders(token) {
  try {
    const res = await axios.get(
      `${baseUrl}/order`,
      headers(token),
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getProduct(number) {
  try {
    const res = await axios.get(
      `${baseUrl}/product/${number}`
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getProducts(page, size) {
  try {
    const res = await axios.get(
      `${baseUrl}/product?page=${page}&size=${size}`
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getUser(token) {
  try {
    const res = await axios.get(
      `${baseUrl}/user`,
      headers(token),
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getUsers(token, page, size) {
  try {
    const res = await axios.get(
      `${baseUrl}/admin/user?page=${page}&size=${size}`,
      headers(token),
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export async function login(email, password) {
  try {
    const res = await axios.post(
      `${baseUrl}/auth/login`,
      { email, password }
    );
    return res.data.token;
  } catch (err) {
    handleError(err);
  }
}

export async function resetPassword(email, one_time_password, password) {
  try {
    await axios.put(
      `${baseUrl}/auth/reset`,
      { 
        email, 
        one_time_password, 
        password 
      }
    );
    return true;
  } catch (err) {
    handleError(err);
    return false;
  }
}

export async function requestPasswordReset(email) {
  try {
    await axios.post(
      `${baseUrl}/auth/reset`,
      { email }
    );
    return true;
  } catch (err) {
    handleError(err);
    return false;
  }
}

export async function signup(user) {
  try {
    await axios.post(
      `${baseUrl}/auth/signup`,
      user
    );
    return true;
  } catch (err) {
    handleError(err);
    return false;
  }
}

export async function updateUser(token, user) {
  try {
    const res = await axios.put(
      `${baseUrl}/user`,
      user,
      headers(token),
    );
    return res.data;
  } catch (err) {
    handleError(err);
  }
}