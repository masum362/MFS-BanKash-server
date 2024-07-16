import bcryptjs from "bcryptjs";

const hashPin = async (pin, saltNumber) => {
  bcryptjs.hash(pin, saltNumber, (err, result) => {
    if (err) return err;
    return result;
  });
};
const compareHash = (original, hashed) => {
  return bcryptjs.compareSync(original, hashed);
};

export { hashPin, compareHash };
