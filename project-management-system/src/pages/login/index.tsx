import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Login values:', values);
      navigate('/dashboard');
    },
  });

  return (
    <div className={styles.wrapper}>
      <Paper elevation={3} className={styles.container}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign in to your account
        </Typography>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={styles.loginButton}
            >
              Sign In
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Link href="/register" underline="hover">
              Don’t have an account? Register
            </Link>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
