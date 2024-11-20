import axios from "axios";
import { DateTime } from 'luxon';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export type LoginPayload = {
  email: string;
  password: string;
};
export const authClient = {
  csrf: () => api.get("/sanctum/csrf-cookie"),
  login: (data: LoginPayload) => api.post("/login", data),
  logout: () => api.post("/logout"),
};

export type Document = {
  id: number;
  ownerId: number;
  name: string;
  path: string;
  expiresAt: number;
  archivedAt: number | null;
  createdAt: number;
  updatedAt: number;
};

export type createDocumentData = {
    name: string;
    expiresAt: number;
    file: File;
};

export const documentsClient = {
  getDocuments: () => {
    const expiresBefore: number = Math.floor(DateTime.now()
        .plus({ days: 7 })
        .endOf('day')
        .toSeconds());

    return api.get<{ data: Document[] }>("/api/documents", {
      params: { expires_before: expiresBefore },
    })
  },
  getDocument: (id: number) =>
      axios.get(`/api/documents/${id}`, {
        responseType: 'blob',
        withCredentials: true,
      }),
  archiveDocument: (id: number) => {
    const archiveDate: number = Math.floor(DateTime.now().toSeconds());
    return api.put(`/api/documents/${id}`, { archived_at: archiveDate })
  },
  createDocument: (formData: createDocumentData) => api.post(`/api/documents`, formData),
};
