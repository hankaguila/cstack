/**
 * Defines a predicate function that filters out items from  a call stack.
 *
 * @typedef
 */
export type StackFilter = (
  value: StackFrame,
  index: number,
  array: StackFrame[]
) => boolean

/**
 * Defines an item from a call stack.
 *
 * @interface
 * @property {string} srcPath - The absolute path to the module containing the caller.
 * @property {string} callerName - The name of the function that generated the stack frame.
 * @property {string} moduleName - The source basename without extension (ex: "index").
 * @property {number} lineNum - The number of the `src` line containing the call.
 * @property {number} colNum - The number of the `src` column containing the call.
 */
export interface StackFrame {
  srcPath: string;
  callerName: string;
  moduleName: string;
  lineNum: number;
  colNum: number;
}
