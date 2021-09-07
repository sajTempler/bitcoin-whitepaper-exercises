import { blockHash } from "./utils.js";

/**
 * @param {{ index: string, prevHash: string, data: string, timestamp: number }} block
 * @returns {boolean}
 */
const verifyBlock = (block) => {
  if (block.index === 0) {
    // verify genesis
    if (block.hash !== "000000") return false;
    if (block.prevHash !== undefined) return false;
    if (block.data !== "") return false;
    if (!block.timestamp) return false;
  } else {
    if (!block.data) return false;
    if (!block.prevHash) return false;
    if (block.index < 0) return false;
    if (!block.timestamp) return false;
    const correctHash = blockHash({ index: block.index, prevHash: block.prevHash, data: block.data, timestamp: block.timestamp });
    if (block.hash !== correctHash) return false;
  }

  return true;
};

/**
 * @param {{blocks: Array<{index: number, hash: string, prevHash: string, data: string, timestamp: string}>}} blockchain
 * @returns {boolean}
 */
export const verifyChain = (blockchain) => {
  const { blocks } = blockchain;
  let isValid = true;

  for (let i = 0; i < blockchain.blocks.length; i++) {
    const validBlock = verifyBlock(blocks[i]);

    if (!validBlock) {
      console.warn(`Block index ${i} is not valid`);
      isValid = false;
      break;
    }

    if (i > 0) {
      const isSyncCorrect = blocks[i].prevHash === blocks[i - 1].hash;
      if (!isSyncCorrect) {
        console.warn(
          `Blockchain is not valid, block ${i} is not in sync with block ${
            i - 1
          }`
        );
        isValid = false;
        break;
      }
    }
  }

  return isValid;
};
