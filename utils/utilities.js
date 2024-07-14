import bcryptjs from "bcryptjs";

const hashPin = async (pin, saltNumber) => {
  bcryptjs.hash(pin, saltNumber, (err, result) => {
    if (err) return err;
    return result;
  });
};
const compareHash = (pin, saltNumber) => {
  return bcryptjs.compareSync(pin, saltNumber);
};

export { hashPin, compareHash };
