import path from "path";
import { writeFileSync, mkdirSync } from "fs";
import { generateKey } from "openpgp";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const KEYS_DIR = path.join(__dirname, "keys");

const options = {
  userIDs: { name: "Bitcoin Whitepaper", email: "bitcoin@whitepaper.tld" },
  rsaBits: 4096,
  type: "rsa",
  passphrase: "",
};

generateKey(options)
  .then(({privateKey, publicKey}) => {
    try {
      mkdirSync(KEYS_DIR);
    } catch (err) {}

    writeFileSync(
      path.join(KEYS_DIR, "priv.pgp.key"),
      privateKey,
      "utf8"
    );
    writeFileSync(
      path.join(KEYS_DIR, "pub.pgp.key"),
      publicKey,
      "utf8"
    );

    console.log("Keypair generated.");
  })
  .catch(console.error);
