import crypto from "crypto";

export const generateOTP = (length = 4) => {
  const max = Math.pow(10, length) - 1; // e.g. 9999
  const min = Math.pow(10, length - 1); // e.g. 1000

  // crypto.randomInt(min, max+1) returns a secure random number
  return crypto.randomInt(min, max + 1).toString();
};

