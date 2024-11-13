import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import BoardButton from "../src/components/BoardButton";
import { GameContext, IGameContext } from "../src/App";

describe("Button component rendered correctly", () => {
  it("renders correct button classname", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="X" />);
    expect(screen.getByRole("button").className).toMatch("boardItem X");
  });

  it("renders correct button classname", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="Y" />);
    expect(screen.getByRole("button").className).toMatch("boardItem Y");
  });

  it("renders correct button marker", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="" />);
    expect(screen.getByRole("button").textContent).toMatch("");
  });

  // check X is rendered
  it("renders correct button marker", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="X" />);
    const img = screen.getByRole("img");
    const cross = "/src/assets/cross-sign-svgrepo-com.svg";
    expect(img).toHaveAttribute("src", cross);
  });

  // check O is rendered
  it("renders correct button marker", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="O" />);
    const img = screen.getByRole("img");
    const cross = "/src/assets/empty-circle-svgrepo-com.svg";
    expect(img).toHaveAttribute("src", cross);
  });

  // check no img is rendered
  it("renders empty", () => {
    render(<BoardButton xcoord={0} ycoord={0} row={0} marker="" />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});
