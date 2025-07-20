import { expect, test } from "vitest";
import { dotdot, parsePath } from "./fs";

test("parsePath test", () => {
  expect(parsePath("./a/b/c")).toEqual([".", "a", "b", "c"]);
  expect(parsePath("a/b/c")).toEqual([".", "a", "b", "c"]);
  expect(parsePath("a/b/c/")).toEqual([".", "a", "b", "c"]);
  expect(parsePath("./a/b")).toEqual([".", "a", "b"]);
  expect(parsePath("./a")).toEqual([".", "a"]);
  expect(parsePath(".")).toEqual(["."]);
});

test("dotdot test", () => {
  expect(dotdot("./a/b/c")).toBe("./a/b");
  expect(dotdot("./a/b")).toBe("./a");
  expect(dotdot("./a")).toBe(".");
  expect(dotdot(".")).toBe(".");
});
