export interface Cliente {
    id?: number
    nome: string
    cpf: string
    celular: string
    email: string
    dataNascimento: string
    senha: string,
    termos: boolean,
    receberInfo: boolean
}