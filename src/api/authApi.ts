import {instance, instanceHeroku} from 'api/instance';


export const authAPI = {
    me() {
        return instance.post<UserDataType>(`auth/me`)
    },
    register(data: RegisterDataType) {
        return instance.post(`auth/register`, {...data})
    },
    login(data: LoginDataType) {
        return instance.post<UserDataType>(`auth/login`, {...data})
    },
    logout() {
        return instance.delete(`auth/me`)
    },
    forgotPass(email: string) {
        return instanceHeroku.post(`auth/forgot`, {
            email,
            from: 'frontend dev <smirnov.mic@yandex.ru>',
            message: `<div style="padding: 15px">password recovery link: 
											<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        })
    },
    createNewPassword(data: CreateNewPasswordDataType) {
        return instanceHeroku.post(`auth/set-new-password`, {...data})
    },
}
export type RegisterDataType = {
    email: string
    password: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
export type CreateNewPasswordDataType = {
    password: string
    resetPasswordToken: string
}
export type UserDataType<T = string, D = number> = {
    _id: string
    email: string
    rememberMe?: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: T
    tokenDeathTime: D
    avatar?: null | string
}