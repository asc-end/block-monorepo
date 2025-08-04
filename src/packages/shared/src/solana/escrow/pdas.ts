import { PublicKey } from "@solana/web3.js";
import { EscrowProgram } from "./types";
import BN from "bn.js"

export function getCommitmentPda (program: EscrowProgram, user: PublicKey, id: BN) {

       const [_commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.toBuffer(),
          id.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      return _commitmentPda
}