import React from 'react';
import {Link} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {useFormik} from 'formik';
import {forgotPassword} from 'features/Auth/auth-reducer';
import {useAppDispatch} from 'app/store';
import {Container} from '@mui/material';

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
						<Container>
								<div>
										<form onSubmit={formik.handleSubmit}>
												<h1>Forgot your password?</h1>
												<input placeholder="Email" {...formik.getFieldProps('email')}/>
												<p>Enter your email address and we will send you further instructions</p>
												<button type="submit">Send Instructions</button>
												<p>Did you remember your password?</p>
												<Link to={PATH.login}>Try logging in</Link>
										</form>
								</div>
						</Container>
				</div>
		);
};
