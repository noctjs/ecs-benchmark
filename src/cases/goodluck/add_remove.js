import { WorldImpl, instantiate } from "goodluck";

class World extends WorldImpl {
  A = [];
  B = [];
}

const HAS_A = 1 << 0;
const HAS_B = 1 << 1;

function A(value = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_A;
    world.A[entity] = { value };
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, [A(0)]);
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_B) === 0) {
        world.Signature[i] |= HAS_B;
        world.B[i] = { value: 0 };
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_B) === HAS_B) {
        world.Signature[i] &= ~HAS_B;
        world.B[i] = undefined;
      }
    }
  };
};
