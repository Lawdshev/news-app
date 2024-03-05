import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/(auth)/login/page"; 
import { useUserAuth } from "@/app/providers/user-auth-context-provider";

// Mock useUserAuth hook
jest.mock("../../../src/app/providers/user-auth-context-provider", () => ({
  useUserAuth: jest.fn(),
}));

describe("Login", () => {
  const mockLogIn = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    // Reset the mock implementation before each test
    mockLogIn.mockReset();
    mockSetUser.mockReset();

    // Mock the useUserAuth hook
    (useUserAuth as jest.Mock).mockReturnValue({
      logIn: mockLogIn,
      setUser: mockSetUser,
    });
  });

  it("renders Login component correctly", () => {
    render(<Login />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
  });

  it("handles form submission and logs in successfully", async () => {
    // Mock a successful login response
    mockLogIn.mockResolvedValue({
      user: {
        email: "test@example.com",
        displayName: "Test User",
        uid: "testUid",
      },
    });

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    // Wait for the login function to be called
    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith("test@example.com", "password123");
    });

    // Check if setUser and localStorage.setItem are called with the expected values
    expect(mockSetUser).toHaveBeenCalled();
    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify({
        email: "test@example.com",
        name: "Test User",
        id: "testUid",
      })
    );
  });

  it("handles form submission and shows error message on login failure", async () => {
    // Mock a failed login response
    const errorMessage = "Invalid credentials";
    mockLogIn.mockRejectedValue({ message: errorMessage });

    render(<Login />);

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /Login/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
