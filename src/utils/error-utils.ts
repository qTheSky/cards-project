import {appActions} from 'features/CommonActions/App';

type ThunkAPIType = {
		dispatch: (action: any) => any
		rejectWithValue: Function
}

export const handleErrors = (error: any, thunkAPI: ThunkAPIType, showError = true) => {
		if (showError) {
				thunkAPI.dispatch(appActions.setAppError(error.response ? error.response.data.error : error.message))
		}
		thunkAPI.dispatch(appActions.setIsLoading(false))
		return thunkAPI.rejectWithValue(error.response ? error.response.data.error : error.message)
}
