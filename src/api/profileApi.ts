import {instance} from './instance';
import {UserDataType} from './authApi';

export const profileApi = {
		updateProfile(name?: string, avatar?: string) {
				return instance.put<{ updatedUser: UserDataType }>(`auth/me`, {name, avatar})
		}
}