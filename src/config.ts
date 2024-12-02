export const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const apiUrls = {
  // Admin
  getDataRefugeeId: (refugeId: string) =>
    `${baseUrl}/admin/dashboard/${refugeId}`, //Esta ruta permite obtener información del panel de administración, como estadísticas o resúmenes clave del sistema. El parámetro refugeId especifica el refugio o área para la que se obtienen los datos.
  deleteUserId: (userId: string) => `${baseUrl}/admin/dashboard/${userId}`, // Permite eliminar un usuario del sistema especificando su ID.
  deleteRefugeeId: (refugeId: string) =>
    `${baseUrl}/admin/dashboard/${refugeId}`, // Permite eliminar un refugiado del sistema especificando su ID.

  // Adoption
  postAdoption: () => `${baseUrl}/adoption-request`, // Esta ruta permite crear una nueva solicitud de adopción para un animal.

  // Animals
  getAllAnimals: () => `${baseUrl}/animals`, // obtiene la lista de todos los animales
  postAnimal: () => `${baseUrl}/animals`, // postea una mascota
  getAnimalId: (id: string) => `${baseUrl}/animals/${id}`, // obtener una mascota por su id
  puAnimalId: (id: string) => `${baseUrl}/animals/${id}`, // actualiza datos de una mascota por su id
  deleteAnimalId: (id: string) => `${baseUrl}/animals/${id}`, // eliminar una mascota por su id

  //Auth
  authLogin: () => `${baseUrl}/auth/login`, // Inicia sesion
  authRegister: () => `${baseUrl}/auth/register`, // regitra un usuario
  authLogOut: () => `${baseUrl}/auth/logout`, // Cierra sesion
  forgotPassword: () => `${baseUrl}/auth/forgot-password`, // Genera un token de recuperación y lo envía al correo electrónico del usuario para restablecer la contraseña.
  resetPassword: () => `${baseUrl}/auth/reset-password`, // Verifica el token de recuperación y actualiza la contraseña del usuario.

  //refugee
  getAllRefugee: () => `${baseUrl}/refugees`, // Obtener todos los refugios
  putRefugeeId: (id: string) => `${baseUrl}/refugees/${id}/needs`, // Actualiza datos refugio

  //user
  getAllUser: () => `${baseUrl}/user`, //obtiene a todos los usuarios
  getUserId: (id: string) => `${baseUrl}/user/${id}`, //obtiene usuarios por id
  putUserID: (id: string) => `${baseUrl}/user/${id}`, // Actualiza datos del usuarios por su id

  //volunteer
  getAllVolunteers: () => `${baseUrl}/volunteers`, // Obtiene una lista de todas las oportunidades de voluntariado disponibles.
  getVolunterId: (id: string) => `${baseUrl}/volunteers/${id}`, //Obtiene todas las oportunidades de voluntariado asociadas a un refugiado específico usando su ID.
  postVolunterId: (id: string) => `${baseUrl}/volunteers/${id}`, //Crea una nueva oportunidad de voluntariado para un refugiado utilizando su ID como parámetro de ruta.

  // Carga de Imagenes
  filesUpload: () => `${baseUrl}/files/upload`, // Carga de imagenes
};
