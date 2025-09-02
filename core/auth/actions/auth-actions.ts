import { productsApi } from "@/core/api/productsApi";
import { User } from "../interfaces/user";

export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

const returnUserToken = ( data: AuthResponse ): {
  user: User,
  token: string
} => {
  const { token, ...user } = data;

  return { user, token };
}

export const authLogin = async(email: string, password: string) => {
  email = email.toLowerCase().trim();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/login', { email, password });
    return returnUserToken( data );
  } catch (error) {
    console.log(error);
    return null;
  }

}

export const authRegister = async(fullName: string, email: string, password: string) => {
  email = email.toLowerCase().trim();
  fullName = fullName.trim();

  try {
    const { data } = await productsApi.post<AuthResponse>('/auth/register', { fullName, email, password });
    return returnUserToken( data );
  } catch (error) {
    console.log(error);
    return null;
  }

}

export const authCheckStatus = async() => {
  try {
    const { data } = await productsApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken( data );
  } catch (error) {
    return null;
  }
}

// Tarea: Hacer el register