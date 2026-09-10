import { useIsUserAdminQuery } from "../store/services/roleApi";
import { jwtDecode } from "jwt-decode";


export interface CustomJwtPayload {
  // Стандартні Claim-и від .NET
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  
  // Кастомні поля з токена
  firstName: string;
  lastName: string;
  
  // Стандартні поля JWT (опціональні)
  exp?: number;
  iss?: string;
  aud?: string;
}


export const useIsAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin";
};