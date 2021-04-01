import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test-utils/renderMock";
import GalacticLeague from "../GalacticLeague";

const component = () => render(<GalacticLeague />);

describe("Galactic League test suite", () => {
  it("Renders correctly", async () => {
    component();

    expect(screen.getByText("Species")).toBeVisible();
  });

  it("Adds/Removes specie to Galactic League", async () => {
    component();

    userEvent.click(screen.getAllByLabelText("species")[0]);
    userEvent.type(screen.getByLabelText("Species"), "d");

    await waitFor(() => expect(screen.getByText("Droid")).toBeVisible());

    userEvent.click(screen.getByText("Droid"));
    userEvent.click(screen.getByText(/Add to my Galactic Team/i));
    expect(screen.getByText("Droid")).toBeVisible();
    userEvent.hover(screen.getByText("Droid"));
    userEvent.click(screen.getAllByLabelText("delete-species")[0]);

    await waitFor(() => expect(screen.queryByText("Droid")).toBeNull());
  });

  it("Adds/Removes characters to Galactic League", async () => {
    component();

    screen.getAllByLabelText("characters").forEach(button => expect(button).toBeDisabled());
    userEvent.click(screen.getAllByLabelText("species")[0]);
    userEvent.type(screen.getByLabelText("Species"), "d");

    await waitFor(() => expect(screen.getByText("Droid")).toBeVisible());

    userEvent.click(screen.getByText("Droid"));
    userEvent.click(screen.getByText(/Add to my Galactic Team/i));
    expect(screen.getByText("Droid")).toBeVisible();
    userEvent.click(screen.getAllByLabelText("characters")[0]);
    userEvent.type(screen.getByLabelText("Characters"), "f");

    await waitFor(() => expect(screen.getByText("Wilhuff Tarkin")).toBeVisible());

    userEvent.click(screen.getByText("Wilhuff Tarkin"));
    userEvent.click(screen.getByText(/Add to my Galactic Team/i));

    await waitFor(() =>
      expect(screen.getByText("Invalid. You can add only characters from selected species.")).toBeVisible()
    );

    userEvent.clear(screen.getByLabelText("Characters"));
    userEvent.type(screen.getAllByLabelText("Characters")[0], "d");

    await waitFor(() => expect(screen.getByText("R2-D2")).toBeVisible());

    userEvent.click(screen.getByText("R2-D2"));
    userEvent.click(screen.getByText(/Add to my Galactic Team/i));
    expect(screen.getByText("R2-D2")).toBeVisible();
    userEvent.hover(screen.getByText("R2-D2"));
    userEvent.click(screen.getAllByLabelText("delete-characters")[0]);

    await waitFor(() => expect(screen.queryByText("R2-D2")).toBeNull());
  });
});
