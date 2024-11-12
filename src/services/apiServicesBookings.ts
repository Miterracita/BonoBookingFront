// url producción
// const API_URL = "https://bono-booking-back.vercel.app";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// url local
// const LOCAL_URL = "http://localhost:3000";

//ver todos las reservas
export const getUsers = async () => {
  try {
      const response = await fetch(`${API_URL}/users/users-list`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

//ELIMINAR reserva
export const deleteUser = async (id: any) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// actualizar una reserva (por ID)
export const updateUser = async (id: any, userData: any) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

//nueva reserva