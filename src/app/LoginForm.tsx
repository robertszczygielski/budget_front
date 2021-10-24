import { Formik } from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {

    return (
        <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={Yup.object({
                login: Yup.string()
                    .required('Required'),
                password: Yup  .string()
                    .min(8)
                    .max(16)
                    .required(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="login">Login</label>
                    <input
                        id="login"
                        type="text"
                        {...formik.getFieldProps('login')}
                    />
                    {formik.touched.login && formik.errors.login ? (
                        <div>{formik.errors.login}</div>
                    ) : null}

                    <label htmlFor="password">password Address</label>
                    <input id="password" type="password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}

                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
}