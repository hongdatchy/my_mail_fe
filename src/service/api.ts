const BASE_URL = process.env.NEXT_PUBLIC_BE_HOST;
const BE_TOKEN_ADMIN = process.env.BE_TOKEN_ADMIN;

const handleResponseError = async (response: Response) => {
  const errorText = await response.text();
  const error = new Error(errorText) as Error & { status?: number };
  error.status = response.status;
  throw error;
};

const handleNetworkError = () => {
  const error = new Error("Không thể kết nối tới máy chủ") as Error & { status?: number };
  error.status = 0;
  throw error;
};

export const getData = async (endpoint: string, token = BE_TOKEN_ADMIN) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  } catch (err) {
    if (err instanceof TypeError) handleNetworkError();
    throw err;
  }
};

export const postData = async (endpoint: string, data: any, token = BE_TOKEN_ADMIN) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  } catch (err) {
    if (err instanceof TypeError) handleNetworkError();
    throw err;
  }
};

export const putData = async (endpoint: string, data: any, token = BE_TOKEN_ADMIN) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  } catch (err) {
    if (err instanceof TypeError) handleNetworkError();
    throw err;
  }
};

// DELETE
export const deleteData = async (endpoint: string, token = BE_TOKEN_ADMIN) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const error = new Error(errorBody) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (err: any) {
    if (err instanceof TypeError) {
      const networkError = new Error("Không thể kết nối tới máy chủ") as Error & { status?: number };
      networkError.status = 0;
      throw networkError;
    }
    throw err;
  }
};
