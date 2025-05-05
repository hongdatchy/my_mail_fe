const BASE_URL = process.env.NEXT_PUBLIC_BE_HOST;
const BE_TOKEN_ADMIN = process.env.BE_TOKEN_ADMIN;
// GET
export const getData = async (endpoint: string, token = BE_TOKEN_ADMIN) => {
  
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Nếu cần thiết
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

// POST
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async (endpoint: string, data: any, token = BE_TOKEN_ADMIN) => {  
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${errorText}`);
  }
  return response.json();
};

// PUT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putData = async (endpoint: string, data: any, token = BE_TOKEN_ADMIN) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorBody = await response.text();  // Dạng string
    throw new Error(errorBody);
  }
  return response.json();
};

// DELETE
export const deleteData = async (endpoint: string, token = BE_TOKEN_ADMIN) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();  // Dạng string
    throw new Error(errorBody);
  }
  return response.json();
};
