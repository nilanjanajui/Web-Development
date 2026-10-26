import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SettingsPage from "./page";

describe("SettingsPage", () => {
  it("shows validation errors and blocks submit on invalid input", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
  });

  it("ties error messages to inputs via aria-describedby for screen readers", async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    await user.click(screen.getByRole("button", { name: /save/i }));

    const nameInput = await screen.findByLabelText(/name/i);
    await waitFor(() => expect(nameInput).toHaveAttribute("aria-invalid", "true"));
    expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
  });

  it("submits successfully with valid input", async () => {
    const user = userEvent.setup();
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<SettingsPage />);

    await user.type(screen.getByLabelText(/name/i), "Nilanjana");
    await user.type(screen.getByLabelText("Email", { exact: true }), "nilanjana@example.com");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/settings saved/i);
    expect(logSpy).toHaveBeenCalledWith(
      "saved",
      expect.objectContaining({ name: "Nilanjana", email: "nilanjana@example.com" })
    );
    logSpy.mockRestore();
  });
});
