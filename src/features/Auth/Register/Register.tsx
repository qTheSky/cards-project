import React from 'react';
import {Container} from 'components/common/Container';
import s from './Register.module.scss'
import {useFormik} from 'formik';
import {RegisterDataType} from 'api/authApi';
import {register} from 'features/Auth/auth-reducer';
import {useAppDispatch} from 'app/store';

export const Register = () => {
		const dispatch = useAppDispatch()
		const formik = useFormik({
				validate: (values) => {
				},
				initialValues: {
						email: '',
						password: '',
				},
				onSubmit: (values: RegisterDataType) => {
						dispatch(register({email: values.email, password: values.password}))
				}
		})
		return (
				<div className={s.pageWrapper}>
						<Container>
								<div className={s.formWrapper}>
										<form onSubmit={formik.handleSubmit} className={s.form}>
												<h1>Sign Up</h1>
												<input placeholder="Email" {...formik.getFieldProps('email')}/>
												<input placeholder="Password"  {...formik.getFieldProps('password')}/>
												<input placeholder="confirm password (so far useless)"/>
												<button type="submit">sign up</button>
												<h3>Already have an account?</h3>
												<a>Sign in</a>
										</form>
								</div>
						</Container>
				</div>
		);
};
