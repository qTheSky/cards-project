import {AppRootStateType} from 'app/store';

export const getAuthUserId = (state: AppRootStateType) => state.profile.profile._id
export const getAuthUserProfile = (state: AppRootStateType) => state.profile.profile