import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import { describe, expect, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../ui/button", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));
describe("SearchBar", () => {
  it("renders SearchBar component", () => {
    render(<SearchBar onFormSubmit={() => {}} isPending={false} />);
    expect(
      screen.getByPlaceholderText("Search for articles")
    ).toBeInTheDocument();
  });

  it("renders Button component", () => {
    render(<SearchBar onFormSubmit={() => {}} isPending={false} />);
    expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();
  });

  it("enabled Button when isPending is false", () => {
    render(<SearchBar onFormSubmit={() => {}} isPending={false} />);
    expect(screen.getByRole("button", { name: "search" })).not.toBeDisabled();
  });

  it("disabled Button when isPending is true", () => {
    render(<SearchBar onFormSubmit={() => {}} isPending={true} />);
    expect(screen.getByRole("button", { name: "search" })).toBeDisabled();
  });
});
