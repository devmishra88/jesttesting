import React, { useReducer, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Grid, Alert } from "@mui/material";

// Form validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone_no: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Mobile No. is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

// Reducer for managing form state
const initialState = {
  isSending: false,
  successMessage: "",
  errorMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEND_REQUEST":
      return { ...state, isSending: true, successMessage: "", errorMessage: "" };
    case "SEND_SUCCESS":
      return { ...state, isSending: false, successMessage: action.payload };
    case "SEND_ERROR":
      return { ...state, isSending: false, errorMessage: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const ContactUsForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_no: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch({ type: "SEND_REQUEST" });

      const emailBody = {
        email: values.email,
        name: values.name,
        phone_no: values.phone_no,
        subject: values.subject ? `*WEB* ${values.subject}` : "*WEB* Contact Us",
        message: values.message,
      };

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailBody),
        });

        if (response.ok) {
          dispatch({
            type: "SEND_SUCCESS",
            payload: "Thanks for contacting us! We will be in touch with you shortly.",
          });
        } else {
          throw new Error("There was some problem and your email was not sent.");
        }
      } catch (error) {
        dispatch({
          type: "SEND_ERROR",
          payload: "Oops! There was some problem and your email was not sent. Please try again.",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder="First & Last Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="phone_no"
            name="phone_no"
            label="Mobile No."
            variant="outlined"
            value={formik.values.phone_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
            helperText={formik.touched.phone_no && formik.errors.phone_no}
            inputProps={{ maxLength: 10 }}
            placeholder="Enter Mobile No"
          />
        </Grid>
      </Grid>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="example@domain.com"
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          id="subject"
          name="subject"
          label="Subject"
          variant="outlined"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
          placeholder="Subject"
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          placeholder="For faster resolutions, please include important & relevant details such as Order Id, Type of Order, exact nature of issue, etc."
        />
      </Box>

      {state.errorMessage && (
        <Box sx={{ marginBottom: 3 }}>
          <Alert severity="error">{state.errorMessage}</Alert>
        </Box>
      )}

      {state.successMessage && (
        <Box sx={{ marginBottom: 3 }}>
          <Alert severity="success">{state.successMessage}</Alert>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: `40%` }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            fullWidth
            sx={{
              padding: `8px`,
              fontWeight: `normal`,
              background: `#01478C`,
              fontSize: `14px`,
              textTransform: `capitalize`,
            }}
            disabled={state.isSending}
          >
            {state.isSending ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ContactUsForm;
