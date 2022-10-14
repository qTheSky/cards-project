import React from 'react';
import {useFormik} from 'formik';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from 'app/store';
import {createNewPassword} from 'features/Auth/auth-reducer';
import {Container} from '@mui/material';
import {PATH} from 'app/RouteVariables';

export const NewPass = () => {
		const {token} = useParams() as { token: string }
		const dispatch = useAppDispatch()
		const newPasswordCreated = useAppSelector(state => state.auth.isNewPasswordCreated)
		const formik = useFormik({
				validate: values => {

				},
				initialValues: {
						password: '',
				},
				onSubmit: (values: { password: string }) => {
						dispatch(createNewPassword({password: values.password, resetPasswordToken: token}))
				}
		})
		if (newPasswordCreated) return <Navigate to={PATH.login}/>
		return (
				<div>
						<Container>
								<div>
										<form onSubmit={formik.handleSubmit}>
												<h1>Create new password</h1>
												<input type="Password" {...formik.getFieldProps('password')}/>
												<p>Create new password</p>
												<button type="submit">Create new password</button>
										</form>
								</div>
						</Container>
				</div>
		);
};
