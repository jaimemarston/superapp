export interface IUser {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    foto: string;
    sexo: number;
    telefono1: string;
    correo: string;
    dni: string;
    cargo: string;
}

export interface IUserAuth {
    token: string;
    user: IUser;
}
