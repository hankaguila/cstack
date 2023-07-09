import cstack from "../src";

function firstCall() {
  console.debug("1");
  secondCall();
}

function secondCall() {
  console.debug("2");
  thirdCall();
}

function thirdCall() {
  console.debug("3");
  console.log(cstack.getStack()); // -> StackFrame[]
  console.log(cstack.getParent("secondCall")!.callerName); // -> "firstCall"
  console.log(cstack.getTrace(true)); // -> reversed stack trace (chronological)
}

firstCall();
