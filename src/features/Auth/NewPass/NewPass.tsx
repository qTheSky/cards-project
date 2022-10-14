import React from 'react';
import {Container} from 'components/common/Container';
import {useFormik} from 'formik';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from 'app/store';
import {createNewPassword} from 'features/Auth/auth-reducer';

export const NewPass = () => {
		const {token} = useParams() as { token: string }
		const dispatch = useAppDispatch()
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
