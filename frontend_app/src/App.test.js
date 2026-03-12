import { render, screen } from "@testing-library/react";
import App from "./App";

test("shows main app shell", () => {
  render(<App />);
  expect(screen.getByText(/AI Code Review/i)).toBeInTheDocument();
  expect(screen.getByText(/Authentication disabled/i)).toBeInTheDocument();
});
