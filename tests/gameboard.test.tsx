import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { useContext } from "react";
import GameBoard from "../src/components/GameBoard";
import { GameContext } from "../src/App";

describe("Button component rendered correctly", () => {
  it("renders correct button classname", () => {
    const mockGameContext = {
      socket: undefined,
      playerMarker: "X",
      canClick: true,
      playBoard: [
        { x: 0, y: 0, marker: "X" },
        { x: 0, y: 1, marker: "O" },
        { x: 1, y: 0, marker: "X" },
      ],
    };
    const { container } = render(
      <GameContext.Provider value={mockGameContext}>
        <GameBoard />
      </GameContext.Provider>
    );

    // checks board is rendered
    const board = container.querySelector(".gameBoard");
    expect(board).toBeInTheDocument();

    // checks that length of buttons matches playboard length
    const button = container.querySelectorAll(".boardItem");
    expect(button.length).toBe(mockGameContext.playBoard.length);
  });
});
