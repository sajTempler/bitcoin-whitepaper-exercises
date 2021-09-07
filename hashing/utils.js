import { createHash } from "crypto";

/**
 * @param {{ index: string, prevHash: string, data: string, timestamp: number }} block
 * @returns {string} hex string
 */
export const blockHash = (block) => {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(block));
  return hash.digest("hex");
};
