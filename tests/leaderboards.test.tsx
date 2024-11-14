import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React, { useState } from "react";
import BoardButton from "../src/components/BoardButton";
import { GameContext, IGameContext } from "../src/App";
import Leaderboards from "../src/components/Leaderboards";
import { IUser } from "../src/interface/responseInterface";

describe("testing leaderboard rendering", () => {
  it("check leaderboard renders", () => {
    const mockedLeaerboard = [
      {
        username: "test",
        gameswon: 1,
        gameslost: 1,
        gamesdrawn: 1,
        maxstreak: 0,
      },
      {
        username: "test",
        gameswon: 1,
        gameslost: 1,
        gamesdrawn: 1,
        maxstreak: 0,
      },
    ];

    const setMockState = vi.fn();
    const { container } = render(
      <Leaderboards
        leaderboards={mockedLeaerboard}
        setLeaderboards={setMockState}
      />
    );

    const lb = container.querySelector(".leaderboard");
    expect(lb).toBeInTheDocument();

    const button = container.querySelector("button");

    expect(button).toBeInTheDocument();

    const item = container.querySelectorAll(".oneItem");
    expect(item.length).toBe(mockedLeaerboard.length);
  });
});
