import React from 'react';
import s from './Login.module.scss'
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'app/store';
import {login} from 'features/Auth/auth-reducer';
import {LoginDataType} from 'api/authApi';
import {Link, Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';

export const Login = () => {
		const dispatch = useAppDispatch()
		const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
		const formik = useFormik({
				validate: (values) => {
				},
				initialValues: {
						email: '',
						password: '',
						rememberMe: false,
				},
				onSubmit: (values: LoginDataType) => {
						dispatch(login({email: values.email, password: values.password, rememberMe: values.rememberMe}))
				}
		})
		if (isLoggedIn) return <Navigate to={PATH.profile}/>
		return (
				<div className={s.signInPage}>
						<div className={s.formWrapper}>
								<form onSubmit={formik.handleSubmit} className={s.form}>
										<h1>Sign in</h1>
										<TextField className={s.input} variant="standard" label="Email" {...formik.getFieldProps('email')}/>
										<TextField className={s.input} variant="standard"
										           label="Password" {...formik.getFieldProps('password')}
										           type="password"
										/>
										<FormControlLabel control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
										                  label="Remember me"/>
										<Link to={PATH.forgotPass} className={s.forgotPasswordLink}>Forgot Password?</Link>
										<Button variant="contained" type="submit">Sign In</Button>
										<h2>Dont have an account?</h2>
										<Link to={PATH.register} className={s.signUpLink}>Sign Up</Link>
								</form>
						</div>
				</div>
		);
};
