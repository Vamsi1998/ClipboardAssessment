const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

class Event{
  constructor(key){
      this.partitionKey = key;
  }
}

function cryptoGetHash (data){
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hashValue of null event when partitionKey is null", () => {
    const trivialKey = deterministicPartitionKey(new Event());
    expect(trivialKey).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862");
  });

  it("Returns event.ParitionKey when partitionKey != string and length < MAX_PARITION_KEY", () => {
    const trivialKey = deterministicPartitionKey(new Event(20));
    expect(trivialKey).toBe("20");
  });

  it("Returns hashValue when partitionKey != string and length > MAX_PARITION_KEY", () => {
    const input = 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
    const trivialKey = deterministicPartitionKey(new Event(input));
    const expectedInput = JSON.stringify(input);
    expect(trivialKey).toBe(expectedInput);
  });

  it("Returns partitionKey == string and length < MAX_PARITION_KEY", () => {
    const input = "20";
    const trivialKey = deterministicPartitionKey(new Event(input));
    const expectedInput = "20";
    expect(trivialKey).toBe(expectedInput);
  });

  it("Returns partitionKey == string and length > MAX_PARITION_KEY", () => {
    const input = "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
    const trivialKey = deterministicPartitionKey(new Event(input));
    const expectedInput = cryptoGetHash(input);
    expect(trivialKey).toBe(expectedInput);
  });
});
