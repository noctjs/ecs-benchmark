import { instantiate, WorldImpl } from "goodluck";

class World extends WorldImpl {
  A = [];
  B = [];
}

const HAS_A = 1 << 0;
const HAS_B = 1 << 1;

class A {
  constructor(value) {
    this.value = value;
  }
}

class B {
  constructor(value) {
    this.value = value;
  }
}

function a(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_A;
    world.A[entity] = new A(value);
  };
}

function b(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_B;
    world.B[entity] = new B(value);
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, [a(i)]);
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_A) === HAS_A) {
        instantiate(world, [b(world.A[i].value)]);
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_B) === HAS_B) {
        world.DestroyEntity(i);
      }
    }
  };
};
