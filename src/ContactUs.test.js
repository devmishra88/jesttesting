import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactUsForm from "../ContactUsForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("ContactUsForm Component", () => {
  test("renders form fields correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactUsForm />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile No/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test("shows validation messages on submitting empty form", async () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactUsForm />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Mobile No. is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  test("allows form submission when fields are filled and reCAPTCHA is verified", async () => {
    render(
      <ThemeProvider theme={theme}>
        <ContactUsForm />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Devesh" } });
    fireEvent.change(screen.getByLabelText(/Mobile No/i), { target: { value: "9999892383" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "devesh.mishra@intrcity.com" } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Test Message" } });

    // Simulate reCAPTCHA verification
    fireEvent.change(screen.getByRole("button", { name: /Send/i }), {
      target: { disabled: false },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Form values:")
      );
    });
  });
});
