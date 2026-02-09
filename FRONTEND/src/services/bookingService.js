import api from "./api";

export const bookEvent = (id) => api.post(`/bookings/${id}`);
export const myBookings = () => api.get("/bookings/my");
