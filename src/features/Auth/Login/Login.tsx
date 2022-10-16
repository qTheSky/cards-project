import React from 'react';
import s from './Login.module.scss'
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from 'app/store';
import {login} from 'features/Auth/auth-reducer';
import {LoginDataType} from 'api/authApi';
import {Link, Navigate} from 'react-router-dom';
import {PATH} from 'app/RouteVariables';
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material';


type FormikErrorType = {
    email?: string
    password?: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            }

            return errors
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
    if (isLoggedIn) return <Navigate to={PATH.main}/>
    return (
        <div className={s.signInPage}>
            <div className={s.formWrapper}>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <h1>Sign in</h1>
                    <TextField helperText={formik.touched.email && formik.errors.email}
                               error={formik.touched.email && !!formik.errors.email}
                               className={s.input}
                               variant="standard"
                               label="Email"
                               {...formik.getFieldProps('email')}/>
                    <TextField helperText={formik.touched.password && formik.errors.password}
                               error={formik.touched.password && !!formik.errors.password} className={s.input}
                               variant="standard"
                               label="Password"
                               {...formik.getFieldProps('password')}
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
