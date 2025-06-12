const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/register`,
  GET_USER: `${API_BASE_URL}/user/me`,
  LOGOUT: `${API_BASE_URL}/user/logout`,

  // Admin endpoints
  CREATE_ADMIN: `${API_BASE_URL}/user/admin/register`,
  GET_ALL_ADMINS: `${API_BASE_URL}/user/admins`,
  UPDATE_ADMIN: `${API_BASE_URL}/user/admin/:id`,
  DELETE_ADMIN: `${API_BASE_URL}/user/admin/:id`,

  // Patient endpoints
  GET_ALL_PATIENTS: `${API_BASE_URL}/user/patients`,
  UPDATE_PATIENT: `${API_BASE_URL}/user/patient/:id`,
  DELETE_PATIENT: `${API_BASE_URL}/user/patient/:id`,

  // Appointment endpoints
  CREATE_APPOINTMENT: `${API_BASE_URL}/appointment/create`,
  GET_ALL_APPOINTMENTS: `${API_BASE_URL}/appointment/all`,
  GET_PATIENT_APPOINTMENTS: `${API_BASE_URL}/appointment/patient/:id`,
  UPDATE_APPOINTMENT: `${API_BASE_URL}/appointment/:id`,
  DELETE_APPOINTMENT: `${API_BASE_URL}/appointment/:id`,
}; 