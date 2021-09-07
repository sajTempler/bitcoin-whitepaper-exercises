import { verifyChain } from "./verify.js";
import { blockHash } from "./utils.js";

// The Power of a Smile
// by Tupac Shakur
const poem = [
  "The power of a gun can kill",
  "and the power of fire can burn",
  "the power of wind can chill",
  "and the power of a mind can learn",
  "the power of anger can rage",
  "inside until it tears u apart",
  "but the power of a smile",
  "especially yours can heal a frozen heart",
];

const Blockchain = {
  blocks: [],
};

// Genesis block
Blockchain.blocks.push({
  index: 0,
  hash: "000000",
  data: "",
  timestamp: Date.now(),
});

/**
 * @param {string} data input text data
 * @returns {{ index: number, prevHash: string, data: string, timestamp: number, hash: string }} block object
 */
export const createBlock = (data) => {
  const blockIndex = Blockchain.blocks[Blockchain.blocks.length - 1].index + 1;
  const prevHash = Blockchain.blocks[blockIndex - 1].hash;
  const timestamp = Date.now();

  const hash = blockHash({ index: blockIndex, prevHash, data, timestamp });

  return {
    index: blockIndex,
    prevHash,
    data,
    timestamp,
    hash,
  };
};

(() => {
  for (let input of poem) {
    const block = createBlock(input);
    Blockchain.blocks.push(block);
  }

  // console.log(Blockchain.blocks);

  const isValid = verifyChain(Blockchain);
  console.log(`Blockchain is ${isValid ? "" : "NOT "}VALID`);
})();
