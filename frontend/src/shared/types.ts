import { ReactNode } from "react";

export interface CredentialsI {
    email: string;
    password: string;
}

export interface ActionI {
    action: string;
}

export enum Action {
    signin = "signin",
    signup = "signup"
}

export interface childrenPropI {
    children: ReactNode
}

export interface todoI {
    id: string;
    task: string;
    status: boolean;
    email: string;
}

export interface todoPropI {
    id: string;
    task: string;
    status: boolean;
}