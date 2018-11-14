import { BASEURL } from '../../../environments/environment';

export class UserEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}usuarios/`;
}
