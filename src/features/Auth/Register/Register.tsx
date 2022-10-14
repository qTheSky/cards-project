import React from 'react';
import s from './Register.module.scss'
import {useFormik} from 'formik';
import {RegisterDataType} from 'api/authApi';
import {register} from 'features/Auth/auth-reducer';
import {useAppDispatch} from 'app/store';
import {Button, FormControl, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';

export const Register = () => {
		const dispatch = useAppDispatch()
		const formik = useFormik({
				validate: (values) => {
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
		return (
				<div className={s.signUpPage}>
						<div className={s.formWrapper}>
								<form onSubmit={formik.handleSubmit} className={s.form}>
										<h1>Sign Up</h1>
										<TextField className={s.input} variant="standard" label="Email" {...formik.getFieldProps('email')}/>
										<TextField className={s.input} variant="standard"
										           label="Password" {...formik.getFieldProps('password')}/>
										<TextField className={s.input} variant="standard"
										           label="Confirm password" {...formik.getFieldProps('confirmPassword')}/>
										<Button type="submit" variant="contained">sign up</Button>
										<h2>Already have an account?</h2>
										<Link to={PATH.login}>Sign in</Link>
								</form>
						</div>
				</div>
		);
};
