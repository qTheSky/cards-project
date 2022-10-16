import React from 'react'
import {useAppDispatch, useAppSelector} from 'app/store';
import {appActions} from 'features/CommonActions/App';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
		props,
		ref,
) {
		return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
		const error = useAppSelector(state => state.app.error)
		const dispatch = useAppDispatch()
		const handleClose = (event?: any, reason?: string) => {
				if (reason === 'clickaway') {
						return
				}
				dispatch(appActions.setAppError(''))
		}

		return (
				<Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error">
								{error}
						</Alert>
				</Snackbar>
		)
}
