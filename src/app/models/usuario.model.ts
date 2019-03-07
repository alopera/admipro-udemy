export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public rol?: string,
        public googleAuth?: boolean,
        public _id?: string
    ) {
    }

}
