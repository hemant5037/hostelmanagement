const API_BASE_URL = "http://localhost:4000";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/v1/user/login`,
  REGISTER: `${API_BASE_URL}/api/v1/user/patient/register`,
  GET_USER: `${API_BASE_URL}/api/v1/user/patient/me`,
  LOGOUT_PATIENT: `${API_BASE_URL}/api/v1/user/patient/logout`,
  LOGOUT_ADMIN: `${API_BASE_URL}/api/v1/user/admin/logout`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  GOOGLE_CALLBACK: `${API_BASE_URL}/api/auth/google/callback`,

  // Admin endpoints
  FIRST_ADMIN: `${API_BASE_URL}/api/v1/user/admin/first`,
  CREATE_ADMIN: `${API_BASE_URL}/api/v1/user/admin/addnew`,
  GET_ADMIN_DETAILS: `${API_BASE_URL}/api/v1/user/admin/me`,

  // Doctor endpoints
  CREATE_DOCTOR: `${API_BASE_URL}/api/v1/user/doctor/addnew`,
  GET_ALL_DOCTORS: `${API_BASE_URL}/api/v1/user/doctors`,

  // Appointment endpoints
  CREATE_APPOINTMENT: `${API_BASE_URL}/api/v1/appointment/post`,
  GET_ALL_APPOINTMENTS: `${API_BASE_URL}/api/v1/appointment/getall`,
  UPDATE_APPOINTMENT: `${API_BASE_URL}/api/v1/appointment/update/:id`,
  DELETE_APPOINTMENT: `${API_BASE_URL}/api/v1/appointment/delete/:id`,

  // Message endpoints
  SEND_MESSAGE: `${API_BASE_URL}/api/v1/message/send`,
  GET_ALL_MESSAGES: `${API_BASE_URL}/api/v1/message/getall`,
}; 