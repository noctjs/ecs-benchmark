import { BaseWorld, instantiate } from "goodluck";

class World extends BaseWorld {
  A = [];
  B = [];
  C = [];
  D = [];
  E = [];
}

const HAS_A = 1 << 0;
const HAS_B = 1 << 1;
const HAS_C = 1 << 2;
const HAS_D = 1 << 3;
const HAS_E = 1 << 4;

function A(x = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_A;
    world.A[entity] = x;
  };
}

function B(x = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_B;
    world.B[entity] = x;
  };
}

function C(x = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_C;
    world.C[entity] = x;
  };
}

function D(x = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_D;
    world.D[entity] = x;
  };
}

function E(x = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_E;
    world.E[entity] = x;
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, { Using: [A(0), B(0), C(0), D(0), E(0)] });
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_A) === HAS_A) {
        world.A[i] *= 2;
      }
    }
  };
};
