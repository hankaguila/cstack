/**
 * Returns the common root of an array of paths.
 *
 * Example:
 *   findCommonPath(["src/pkg-a", "src/pkg-b"]) -> "src"
 *
 * @param {string[]} paths - An array of paths.
 */
export default function findCommonPath(paths: string[]): string {
  const splitPaths = paths.map((path) => path.split("/"));

  const commonParts: string[] = [];
  const minLength = Math.min(...splitPaths.map((path) => path.length));

  for (let i = 0; i < minLength; i++) {
    const parts = splitPaths.map((path) => path[i]);
    const isCommon = parts.every((part) => part === parts[0]);

    if (isCommon) {
      commonParts.push(parts[0]);
    } else {
      break;
    }
  }

  return commonParts.join("/");
}
