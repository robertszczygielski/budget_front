import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from "react";

const Button = styled.button`
  background-colour: teal;
  color: green;
  padding: 1rem 2rem;
`

const P = styled.p` 
    margin: 10;
    padding: 10;
    color: red;
`

const Input = styled.input`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 20;
    text-decoration: none;
    font-family: 'Roboto';
    user-select: none;
    list-style: none;
    position: relative;
    background-color: $deepBlue-5;
    font-size: 1.05em;
    padding: 0 5%;
`

const Label = styled.label`
    font-size: 2em;
    left: 5%;
    top: 0;
    color: $blue-100;
    font-weight: 400;
    text-transform: capitalize;
    pointer-events: none;
    transition: 
      transform 0.2s ease-in-out,
      font-size 0.2s 0.15s ease-in-out;
    will-change: transform, font-size;
`

interface LoginFormProps {
    setToken: (token: string) => void;
}

export const LoginForm = ({ setToken }: LoginFormProps) => {
    const [error, setError] = useState(false)

    function onSubmit(values: any) {
        axios.request({
            url: 'http://localhost:8080/auth/authorization',
            method: 'POST',
            data: {
                "username": values.login,
                "password": values.password,
            },
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                setError(false)
                const token = res.data.jwtToken
                setToken(token)
            })
            .catch(err => {
                setError(true)
                console.log(err)
            })
    }

    return (
        <Formik
            initialValues={{login: '', password: ''}}
            validationSchema={Yup.object({
                login: Yup.string()
                    .required('Required min=8; max=16'),
                password: Yup.string()
                    .min(3)
                    .max(16)
                    .required(),
            })}
            onSubmit={onSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <Label htmlFor="login">Login</Label>
                    <br/>
                    <Input
                        id="login"
                        type="text"
                        {...formik.getFieldProps('login')}
                    />
                    {formik.touched.login && formik.errors.login ? (
                        <div>{formik.errors.login}</div>
                    ) : null}
                    <br/>
                    <Label htmlFor="password">password Address</Label>
                    <br/>
                    <Input id="password" type="password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}

                    <br/>
                    <Button type="submit">Submit</Button>
                    {error && <P>NO NO, podaja poprawyny login i hasło</P>}
                </form>
            )}
        </Formik>
    );
}