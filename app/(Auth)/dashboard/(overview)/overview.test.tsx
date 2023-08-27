import { render, screen } from "@testing-library/react";
import { Overview } from "./overview";

describe("Overview component", () => {
  test("renders the component correctly", () => {
    render(<Overview />);

    // Assert that the component renders without any errors
    expect(screen.getByText("Total Drones")).toBeDefined();
    expect(screen.getByText("Active Drones")).toBeDefined();
    expect(screen.getByText("Inactive Drones")).toBeDefined();
    expect(screen.getByText("All drones")).toBeDefined();
  });

  // Add more tests for specific functionality if needed
});
