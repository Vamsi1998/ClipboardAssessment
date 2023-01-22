const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey = TRIVIAL_PARTITION_KEY;

  if(event) {
    partitionKey = event.partitionKey ? event.partitionKey : cryptoGetHash(JSON.stringify(event));
    partitionKey = typeof partitionKey === "string" ? partitionKey : JSON.stringify(partitionKey);

    if(partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
      partitionKey = cryptoGetHash(partitionKey);
    }
  }
  return partitionKey;
};

/**
 * Returns hashValue of the given data
 * @param {*} data 
 * @returns hashValue of the data
 */
function cryptoGetHash (data){
  return crypto.createHash("sha3-512").update(data).digest("hex");
}