import { http } from "./http";
import type { AuthUser, LoginCredentials } from "../types/auth";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";
const AUTH_URL = `${API_BASE_URL}/api/v1/auth`;

export const AuthApi = {
  login: (credentials: LoginCredentials) =>
    httpPost<AuthUser>(`${AUTH_URL}/login`, {
      body: credentials,
    }),
  logout: () => httpPost<void>(`${AUTH_URL}/logout`, {}),
  getMe: () => httpGet<AuthUser>(`${AUTH_URL}/me`),
};

async function httpGet<T>(url: string) {
  return http<T>(url);
}
async function httpPost<T>(url: string, body: unknown) {
  return http<T>(url, { method: "POST", body });
}
