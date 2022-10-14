import {createAction} from '@reduxjs/toolkit';

const setIsLoading = createAction<boolean>('appActions/setAppLoading')
const setAppError = createAction<string>('appActions/setAppError')

export const appActions = {
		setIsLoading,
		setAppError
}
