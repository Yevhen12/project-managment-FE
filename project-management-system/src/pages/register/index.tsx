import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";
import { useRegisterMutation } from "../../api/authApi";
import { extractErrorMessage } from "../../shared/utils/errorHelpers";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { setCredentials } from "../../store/slices/authSlice";
import { RoutePath } from "../../shared/const/router";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, { error, isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }).unwrap();

        formik.resetForm(); // очищення форми
        navigate(RoutePath.select_project); // правильний редірект
      } catch (e) {
        console.log("error", e);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <Paper elevation={3} className={styles.container}>
        <Typography variant="h5" align="center" gutterBottom>
          Create your account
        </Typography>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <Box display="flex" gap={2}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
            />

            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
            />
          </Box>

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            margin="normal"
          />

          <Box sx={{ minHeight: 48, mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {extractErrorMessage(error, "Registration failed")}
              </Alert>
            )}
          </Box>

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              className={styles.registerButton}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Link href="/login" underline="hover">
              Already have an account? Sign In
            </Link>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default RegisterPage;
