const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/patient/register`,
  GET_USER: `${API_BASE_URL}/user/me`,
  LOGOUT: `${API_BASE_URL}/user/logout`,

  // Admin endpoints
  FIRST_ADMIN: `${API_BASE_URL}/user/admin/first`,
  CREATE_ADMIN: `${API_BASE_URL}/user/admin/addnew`,
  GET_ALL_ADMINS: `${API_BASE_URL}/user/admins`,
  UPDATE_ADMIN: `${API_BASE_URL}/user/admin/:id`,
  DELETE_ADMIN: `${API_BASE_URL}/user/admin/:id`,

  // Doctor endpoints
  CREATE_DOCTOR: `${API_BASE_URL}/user/doctor/addnew`,
  GET_ALL_DOCTORS: `${API_BASE_URL}/user/doctors`,

  // Patient endpoints
  GET_ALL_PATIENTS: `${API_BASE_URL}/user/patients`,
  UPDATE_PATIENT: `${API_BASE_URL}/user/patient/:id`,
  DELETE_PATIENT: `${API_BASE_URL}/user/patient/:id`,
  GET_PATIENT_DETAILS: `${API_BASE_URL}/user/patient/me`,

  // Appointment endpoints
  CREATE_APPOINTMENT: `${API_BASE_URL}/appointment/post`,
  GET_ALL_APPOINTMENTS: `${API_BASE_URL}/appointment/getall`,
  UPDATE_APPOINTMENT: `${API_BASE_URL}/appointment/update/:id`,
  DELETE_APPOINTMENT: `${API_BASE_URL}/appointment/delete/:id`,

  // Message endpoints
  SEND_MESSAGE: `${API_BASE_URL}/message/send`,
  GET_ALL_MESSAGES: `${API_BASE_URL}/message/getall`,
}; 