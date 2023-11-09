import getReedSolomonErasure from "./reedSolomonErasure.js";

(() => {
  const SHARD_SIZE = 6;
  const DATA_SHARDS = 3;
  const PARITY_SHARDS = 3;
  let reedSolomon = getReedSolomonErasure();

  // Original Data To Be Shared
  const input = Uint8Array.of(
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18
  );

  const shards = new Uint8Array(SHARD_SIZE * (DATA_SHARDS + PARITY_SHARDS));
  shards.set(input.slice());
  console.log("Shards Before Implementing ReedSolomon: \n", shards);

  if (reedSolomon.encode(shards, DATA_SHARDS, PARITY_SHARDS) != 0) {
    console.log("Failed To Encode Shards");
    return;
  }
  console.log(
    "Shards After Implementing ReedSolomon And Before Data Corruption: \n",
    shards
  );

  // // Data Shard 1
  // shards[0] = 0;
  // shards[1] = 0;
  // shards[2] = 0;
  // shards[3] = 0;
  // shards[4] = 0;
  // shards[5] = 0;

  // Data Shard 2.
  // Here We Are Corrupting Data Shard By Just Making Its Value To 0
  shards[6] = 0;
  shards[7] = 0;
  shards[8] = 0;
  shards[9] = 0;
  shards[10] = 0;
  shards[11] = 0;

  // shards[12] = 0;
  // shards[13] = 0;
  // shards[14] = 0;
  // shards[15] = 0;
  // shards[16] = 0;
  // shards[17] = 0;

  console.log("Shards After Data Corruption: \n", shards);

  // Reconstructing Corrupted Data.
  // Here We Have To Specify That Shard Is Corrupted By Just Passing `false` At That Shard Index.
  let result = reedSolomon.reconstruct(shards, DATA_SHARDS, PARITY_SHARDS, [
    true,
    false, // It Specifies That Shard Of Index 1 Is Corrupted
    true,
    true,
    true,
    true,
  ]);
  if (result != 0) {
    console.log("Failed To Reconstruct Corrupted Shard");
    return;
  }
  console.log("Shards After Data Corruption: \n", shards);
})();
