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
    username: string;
    password: string;
    is_active: string;
    is_staff: string;
    role: number;
}

export interface IUserAuth {
    token: string;
    user: IUser;
}


export interface IUserTracking {
    id?: number;
    user: number;
    starttask: string;
    endtask: string;
    start_longitude: number;
    end_longitude: number;
    start_latitude: number;
    end_latitude: number;
    signature: string;
    rating: number;
}

export interface IUserTrackingDetail {
    id?: number;
    user: IUser;
    starttask: string;
    endtask: string;
    start_longitude: number;
    end_longitude: number;
    start_latitude: number;
    end_latitude: number;
    url?: string;
}
