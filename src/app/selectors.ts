import {AppRootStateType} from 'app/store';

export const isAppAppMakingRequest = (state: AppRootStateType) => state.app.isLoading
export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized