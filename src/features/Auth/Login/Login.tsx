import React from 'react';
import s from './Login.module.scss'
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'app/store';
import {login} from 'features/Auth/auth-reducer';
import {LoginDataType} from 'api/authApi';
import {Link, Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Container} from '@mui/material';

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
				<div>
						<Container>
								<div>
										<form onSubmit={formik.handleSubmit} className={s.form}>
												<h1>Sign in</h1>
												<input placeholder="Email" {...formik.getFieldProps('email')}/>
												<input placeholder="Password" {...formik.getFieldProps('password')}/>
												<input type="checkbox" {...formik.getFieldProps('rememberMe')}/>remember me
												<Link to={PATH.forgotPass}>forgot Password</Link>
												<button type="submit">Sign In</button>
												<span>Dont have an account?</span>
												<Link to={PATH.register}>Sign Up</Link>
										</form>
								</div>
						</Container>
				</div>
		);
};
