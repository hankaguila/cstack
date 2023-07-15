import { beforeAll, afterAll, describe, it, vi, expect } from "vitest";
// import cstack, { StackFrame } from "../src";
import cstack, { StackFrame } from "../build";

let stackFrames: StackFrame[];
let parent: StackFrame | undefined;

function topCall() {
  console.debug("top");
  stackFrames = cstack.getStack();
  parent = cstack.getParent("topCall");
}

function midCall() {
  console.debug("mid");
  topCall();
}

function bottomCall() {
  console.debug("bottom");
  midCall();
}

beforeAll(() => {
  vi.spyOn(console, "log");
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("getStack()", () => {
  it("includes all code calls", () => {
    bottomCall();
    const callerNames = stackFrames.map(({ callerName }) => callerName);
    expect(callerNames).to.include.members(["topCall", "midCall", "bottomCall"]);
  });
});

describe("getParent()", () => {
  it("returns correct parent", () => {
    midCall();
    !expect(parent!.callerName).to.eq("midCall");
  });
});
