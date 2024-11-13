// url producción
// const API_URL = "https://bono-booking-back.vercel.app";
const API_URL = "http://localhost:3000";
// url local
// const LOCAL_URL = "http://localhost:3000";

//ver todos los usuarios
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

// actualizar un usuario (por ID)
export const updateUser = async (id: any, userData: any) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      body: userData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error de red al actualizar el usuario');
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

//ELIMINAR USUARIO
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

//APLICAR FILTROS
// buscar usuarios por username o email
export const getSearch = async (username: string, email: string) => {
  try {
      // Crear un objeto para almacenar los parámetros de búsqueda
      const queryParams = new URLSearchParams();

      // Agregar parámetros si están definidos
      if (username) {
          queryParams.append('username', username);
      }
      if (email) {
          queryParams.append('email', email);
      }

      try {
        const response = await fetch(`${API_URL}/users/search?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};
