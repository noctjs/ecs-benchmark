import { BaseWorld, destroyEntity, instantiate } from "goodluck";

class World extends BaseWorld {
  A = [];
  B = [];
}

const HAS_A = 1 << 0;
const HAS_B = 1 << 1;

function A(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_A;
    world.A[entity] = { value };
  };
}

function B(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_B;
    world.B[entity] = { value };
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, { Using: [A(i)] });
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_A) === HAS_A) {
        let value = world.A[i].value;
        instantiate(world, { Using: [B(value)] });
        instantiate(world, { Using: [B(value)] });
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_B) === HAS_B) {
        destroyEntity(world, i);
      }
    }
  };
};
