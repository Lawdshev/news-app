import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "@/app/(auth)/signup/page"; // Adjust the import path
import { useUserAuth } from "@/app/providers/user-auth-context-provider";

// Mock useUserAuth hook
jest.mock("../../../src/app/providers/user-auth-context-provider", () => ({
  useUserAuth: jest.fn(),
}));

describe("Signup", () => {
  const mockSignUp = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    // Reset the mock implementation before each test
    mockSignUp.mockReset();
    mockSetUser.mockReset();

    // Mock the useUserAuth hook
    (useUserAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
      setUser: mockSetUser,
    });
  });

  it("renders Signup component correctly", () => {
    render(<Signup />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create account/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  it("handles form submission and signs up successfully", async () => {
    // Mock a successful signup response
    mockSignUp.mockResolvedValue({
      user: {
        email: "test@example.com",
        displayName: "Test User",
        uid: "testUid",
      },
    });

    render(<Signup />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Create account/i }));

    // Wait for the signup function to be called
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });

    // Check if setUser and localStorage.setItem are called with the expected values
    expect(mockSetUser).toHaveBeenCalledWith({
      email: "test@example.com",
    //   name: "Test User",
    //     id: "testUid",
        displayName: "Test User",
        uid: "testUid",
    });
  });

  it("handles form submission and shows error message on signup failure", async () => {
    // Mock a failed signup response
    const errorMessage = "Email is already in use";
    mockSignUp.mockRejectedValue({ message: errorMessage });

    render(<Signup />);

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Create account/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
