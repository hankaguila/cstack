import { parse } from "path";
import { StackFrame, StackFilter } from "../types";
import findCommonPath from "./helpers/findCommonPath";

/**
 * Returns the current call stack.
 *
 * @param {StackFilter?} stackFilter - See {@link StackFilter}.
 * @returns {StackFrame[]} - An array containing the current call stack.
 */
function getStack(stackFilter?: StackFilter): StackFrame[] {
  const errorStack = new Error().stack;
  const errorStackLines = errorStack ? errorStack.split("\n").slice(1) : [];
  const stackFrames: StackFrame[] = [];
  const nodeInternalRegex =  /node:internal/;
  const srcRegEx = /(\/\w.*)?:(\d+):(\d+)/;
  const callerRegEx =/at (\S+) (\S+)/;

  for (const errorStackLine of errorStackLines) {
    const nodeInternalMatches = nodeInternalRegex.exec(errorStackLine);
    const srcMatches = srcRegEx.exec(errorStackLine);

    if (!nodeInternalMatches && srcMatches) {
      const callerMatches = callerRegEx.exec(errorStackLine);
      const [, srcPath, lineNum, colNum] = srcMatches;
      if (srcPath.includes("node:internal")) continue;
      if (!callerMatches) continue;
      const [, callerName] = callerMatches;
      const moduleName = parse(srcPath).name;
      stackFrames.push({
        srcPath,
        lineNum: Number(lineNum),
        colNum: Number(colNum),
        moduleName,
        callerName
      });
    }
  }

  if (stackFilter) {
    return stackFrames.filter(stackFilter);
  }

  return stackFrames;
}

/**
 * Returns the `StackFrame` upstream of that with `callerName`.
 *
 * @param {string} callerName - See {@link StackFrame#callerName}.
 * @returns {StackFrame | undefined} See {@link StackFrame}.
 */
function getParent(callerName: string): StackFrame | undefined {
  let acceptNext = false;

  const filterPredicate: StackFilter = (stackFrame) => {
    if (acceptNext) {
      acceptNext = false;
      return true;
    }

    if (stackFrame.callerName === callerName) {
      acceptNext = true;
    }

    return false;
  };

  return getStack(filterPredicate)[0];
}

/**
 * Returns a stack trace.
 *
 * Hint: Use `getTrace(true)` to see the calls in chronological order.
 *
 * @params {boolean} - A boolean for reversing the order of the stack.
 * @returns {string} - A reversed stack trace.
 */
function getTrace(reversed = false): string {
  const frames = getStack();

  if (reversed) frames.reverse();

  const commonPath = findCommonPath(frames.map(({ srcPath }) => srcPath));
  const result = [`\n${commonPath || "."}\n`];

  frames.forEach(({ srcPath, lineNum, colNum }) => {
    const childPath = `${srcPath.replace(commonPath, "")}`;
    result.push(`    ${childPath}[${lineNum}:${colNum}]`);
  });

  return result.join("\n") + "\n";
}

const cstack = { getStack, getParent, getTrace };

export default cstack;
export { getStack, getParent, getTrace };
export * from "../types";
