import {AppRootStateType} from 'app/store';

export const getIsAppAppMakingRequest = (state: AppRootStateType) => state.app.isLoading
export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized