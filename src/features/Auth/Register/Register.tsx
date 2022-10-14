import React from 'react';
import s from './Register.module.scss'
import {useFormik} from 'formik';
import {RegisterDataType} from 'api/authApi';
import {register} from 'features/Auth/auth-reducer';
import {useAppDispatch} from 'app/store';
import {Button, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';

type FormikErrorType = {
		email?: string
		password?: string
		confirmPassword?: string
}

export const Register = () => {
		const dispatch = useAppDispatch()
		const formik = useFormik({
				validate: (values) => {
						const errors: FormikErrorType = {}

						if (!values.email) {
								errors.email = 'Required'
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
								errors.email = 'Invalid email address'
						}

						if (!values.password) {
								errors.password = 'Required'
						} else if (values.password.length < 8) {
								errors.password = 'Put more then 8 symbols, please.'
						} else if (!values.password) {
								errors.password = 'Symbol required!'
						}

						if (!values.confirmPassword) {
								errors.confirmPassword = 'Required'
						} else if (values.confirmPassword.length < 8) {
								errors.confirmPassword = 'Put more then 8 symbols, please.'
						} else if (values.password !== values.confirmPassword) {
								errors.confirmPassword = 'Password not matched'
						}

						return errors
				},
				initialValues: {
						email: '',
						password: '',
						confirmPassword: '',
				},
				onSubmit: (values: RegisterDataType) => {
						dispatch(register({email: values.email, password: values.password}))
				}
		})
		const errorEmail = formik.touched.email && formik.errors.email && formik.errors.email
		const errorPass = formik.touched.password && formik.errors.password && formik.errors.password
		const errorConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword
		return (
				<div className={s.signUpPage}>
						<div className={s.formWrapper}>
								<form onSubmit={formik.handleSubmit} className={s.form}>
										<h1>Sign Up</h1>
										<TextField className={s.input}
										           error={!!errorEmail}
										           helperText={formik.touched.email && formik.errors.email}
										           variant="standard"
										           label="Email" {...formik.getFieldProps('email')}
										/>
										<TextField className={s.input}
										           variant="standard"
										           type="password"
										           error={!!errorPass}
										           helperText={formik.touched.password && formik.errors.password}
										           label="Password"
										           {...formik.getFieldProps('password')}
										/>
										<TextField className={s.input}
										           variant="standard"
										           type="password"
										           helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
										           error={!!errorConfirmPassword}
										           label="Confirm password"
										           {...formik.getFieldProps('confirmPassword')}
										/>
										<Button type="submit" variant="contained">sign up</Button>
										<h2>Already have an account?</h2>
										<Link to={PATH.login}>Sign in</Link>
								</form>
						</div>
				</div>
		);
};
