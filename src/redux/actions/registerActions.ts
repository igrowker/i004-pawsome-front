import { registerUser, registerRefugee } from '../services/registerService';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

// Acción para indicar que el registro ha comenzado
export const registerStart = () => ({
  type: REGISTER_START,
});

// Acción para cuando el registro del usuario y refugio ha sido exitoso
export const registerSuccess = (userData: any) => ({
  type: REGISTER_SUCCESS,
  payload: userData,
});

// Acción para manejar errores de registro
export const registerFail = (error: string) => ({
  type: REGISTER_FAIL,
  payload: error,
});

// Acción asincrónica que hace el registro del usuario y del refugio
export const registerUserAndRefugee = (userData: any, refugeeData: any) => async (dispatch: any) => {
  dispatch(registerStart());

  try {
    
    const user = await registerUser(userData);

   
    const refugee = await registerRefugee({
        user_id: user.id,
      ...refugeeData
      
    });

  
    const userAndRefugeeData = { ...user, refugee };

    dispatch(registerSuccess(userAndRefugeeData)); // Se pasa la data combinada
  } catch (error: unknown) {
    // Aseguramos que el error sea de tipo Error
    if (error instanceof Error) {
      dispatch(registerFail(error.message)); // Usamos el mensaje de error
    } else {
      dispatch(registerFail('Error desconocido en el registro'));
    }
  }
};
