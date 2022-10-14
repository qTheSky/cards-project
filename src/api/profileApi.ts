import {instance} from "./instance";
import {UserDataType} from "./authApi";

export const profileApi = {
    updateProfile(name?: string, avatar?:string) {
        return instance.put<ResponseUpdateUser>(`auth/me`, {name, avatar})
    }
}
type ResponseUpdateUser = {
    updatedUser: UserDataType
    token: string
    tokenDeathTime: number
}