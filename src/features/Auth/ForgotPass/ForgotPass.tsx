import React from 'react';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {useFormik} from 'formik';
import {forgotPassword} from 'features/Auth/auth-reducer';
import {useAppDispatch} from 'app/store';
import s from './ForgotPass.module.scss'
import {Button, TextField} from '@mui/material';

export const ForgotPass = () => {
		const dispatch = useAppDispatch()
		const formik = useFormik({
				validate: (values) => {
				},
				initialValues: {
						email: '',
				},
				onSubmit: (values: { email: string }) => {
						dispatch(forgotPassword(values.email))
				}
		})
		return (
				<div>
						<div className={s.formWrapper}>
								<form className={s.form} onSubmit={formik.handleSubmit}>
										<h1>Forgot your password?</h1>
										<TextField fullWidth className={s.input} variant="standard"
										           label="Email" {...formik.getFieldProps('email')}/>
										<p>Enter your email address and we will send you further instructions</p>
										<Button fullWidth variant="contained" type="submit">Send Instructions</Button>
										<h2>Did you remember your password?</h2>
										<Link to={PATH.login}>Try logging in</Link>
								</form>
						</div>
				</div>
		);
};
