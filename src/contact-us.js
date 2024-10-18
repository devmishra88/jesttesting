import React, { useEffect, useRef, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone_no: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Mobile No. is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

// Define initial state for reducer
const initialState = {
  captchaVerified: false,
  captchaToken: null,
};

// Reducer function to handle captcha state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "VERIFY_CAPTCHA":
      return {
        ...state,
        captchaVerified: true,
        captchaToken: action.payload,
      };
    case "RESET_CAPTCHA":
      return {
        ...state,
        captchaVerified: false,
        captchaToken: null,
      };
    default:
      return state;
  }
};

const ContactUsForm = () => {
  const recaptchaRef = useRef(null); // Reference for reCAPTCHA
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
    onSubmit: (values) => {
      if (state.captchaVerified) {
        console.log("Form values: ", values);
        console.log("Captcha Token: ", state.captchaToken);
        // Proceed with form submission logic here
      } else {
        alert("Please complete the reCAPTCHA");
      }
    },
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Google reCAPTCHA integration
  useEffect(() => {
    // Load the Google reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // When the component unmounts, remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Callback function for reCAPTCHA
  const handleCaptcha = (token) => {
    console.log("reCAPTCHA token:", token);
    // Dispatch action to verify captcha and store the token
    dispatch({ type: "VERIFY_CAPTCHA", payload: token });
  };

  // Render reCAPTCHA after the script is loaded
  useEffect(() => {
    if (window.grecaptcha && recaptchaRef.current) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: "YOUR_GOOGLE_RECAPTCHA_SITE_KEY", // Replace with your reCAPTCHA site key
        callback: handleCaptcha,
      });
    }
  }, [recaptchaRef.current]);

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
          placeholder="For faster resolutions, please include important & relevant details such as Order Id, Type of Order (Meal, Train, Bus etc.), exact nature of issue etc."
        />
      </Box>

      {/* Google reCAPTCHA */}
      <Box sx={{ marginBottom: 3 }}>
        <div ref={recaptchaRef} className="g-recaptcha"></div>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography component="div" sx={{ fontSize: `16px`, fontWeight: `bold` }}>
          Note:
        </Typography>
        <Box>
          <ul>
            <li>
              For any refund related queries, please visit{" "}
              <a href="http://refunds.railyatri.in/" style={{ color: "#428bca" }}>
                refunds.railyatri.in
              </a>
            </li>
            <li>
              For any other queries, write to us at{" "}
              <a href="mailto:care@railyatri.in" style={{ color: "#428bca" }}>
                care@railyatri.in
              </a>{" "}
              or call us at 8010500300 (9AM - 7PM, 7 days a week)
            </li>
          </ul>
        </Box>
      </Box>

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
            disabled={!state.captchaVerified} // Disable the button until reCAPTCHA is verified
          >
            Send
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ContactUsForm;
