import bcryptjs from "bcryptjs";

const hashPin = (pin, saltNumber) => {
  console.log({ pin });
 return bcryptjs.hashSync(pin, saltNumber);
};
const compareHash = (original, hashed) => {
  return bcryptjs.compareSync(original, hashed);
};

export { hashPin, compareHash };
