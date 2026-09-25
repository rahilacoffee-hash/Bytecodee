import api from "../lib/axios";
const data = (response) => response.data;
export const adminLogin = (body) => api.post("/auth/admin/login", body).then(data);
export const adminRegister = (body) => api.post("/auth/admin/register", body).then(data);
export const adminVerify = (body) => api.post("/auth/admin/verify-otp", body).then(data);
export const dashboard = () => api.get("/dashboard").then(data);
export const conversations = () => api.get("/conversations").then(data);
export const projects = () => api.get("/projects").then(data);
export const quotes = () => api.get("/quotes").then(data);
export const getCurrentAdmin = () => api.get("/auth/admin/me").then(data);
export const adminLogout = () => api.post("/auth/admin/logout").then(data);
export const updateAdminConversation = (id, body) => api.patch(`/conversations/${id}/admin`, body).then(data);
export const sendAdminMessage = (id, content) => api.post(`/messages/${id}/admin`, { content }).then(data);
export const adminMessages = (id) => api.get(`/messages/${id}/admin`).then(data);
export const adminClient = (id) => api.get(`/clients/${id}`).then(data);
export const adminClients = () => api.get("/clients").then(data);
export const adminConversation = (id) => api.get(`/conversations/${id}`).then(data);

export const updateAdminQuote = (id, body) => api.patch(`/quotes/${id}`, body).then(data);

export const createAdminQuote = (body) => api.post("/quotes", body).then(data);
export const createAdminProject = (body) => api.post("/projects", body).then(data);
export const updateAdminProject = (id, body) => api.patch(`/projects/${id}`, body).then(data);
export const getHomepageContent = () => api.get("/homepage").then(data);
export const saveHomepageContent = (content) => api.put("/homepage", { content }).then(data);
