import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {useFormik} from 'formik';
import {forgotPassword, setNewPassRequest} from 'features/Auth/auth-reducer';
import {useAppDispatch, useAppSelector} from 'app/store';
import s from './ForgotPass.module.scss'
import {Button, TextField} from '@mui/material';
import checkEmailSVG from 'assets/checkEmail.svg'

export const ForgotPass = () => {
		const isRequestSuccess = useAppSelector(state => state.auth.isNewPassRequestSuccess)
		const [email, setEmail] = useState('')
		return (
				<div>
						<div className={s.formWrapper}>
								{isRequestSuccess ? <CheckEmail email={email}/> : <ForgotPasswordForm setEmail={setEmail}/>}
						</div>
				</div>
		);
};
const CheckEmail = (props: any) => {
		const dispatch = useAppDispatch()
		useEffect(() => {
				return () => {
						dispatch(setNewPassRequest(false))
				}
		}, [])
		return (
				<div className={s.checkEmail}>
						<h1>Check Email</h1>
						<div>
								<img style={{width: '108px', height: '108px'}} src={checkEmailSVG} alt="checkEmail"/>
						</div>
						<h2>We've sent an Email with instructions to {props.email}</h2>
						<Link to={PATH.login}> <Button variant="contained" fullWidth> Back to login</Button>
						</Link>
				</div>
		)
}
const ForgotPasswordForm = (props: any) => {
		const dispatch = useAppDispatch()
		const formik = useFormik({
				validate: (values) => {
				},
				initialValues: {
						email: '',
				},
				onSubmit: (values: { email: string }) => {
						dispatch(forgotPassword(values.email))
						props.setEmail(values.email)
				}
		})
		return (
				<form className={s.form} onSubmit={formik.handleSubmit}>
						<h1>Forgot your password?</h1>
						<TextField fullWidth className={s.input} variant="standard"
						           label="Email" {...formik.getFieldProps('email')}/>
						<p>Enter your email address and we will send you further instructions</p>
						<Button fullWidth variant="contained" type="submit">Send Instructions</Button>
						<h2>Did you remember your password?</h2>
						<Link to={PATH.login}>Try logging in</Link>
				</form>
		)
}