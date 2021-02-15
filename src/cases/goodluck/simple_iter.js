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

function C(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_C;
    world.C[entity] = { value };
  };
}

function D(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_D;
    world.D[entity] = { value };
  };
}

function E(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_E;
    world.E[entity] = { value };
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, { Using: [A(0), B(1)] });
    instantiate(world, { Using: [A(0), B(1), C(2)] });
    instantiate(world, { Using: [A(0), B(1), C(2), D(3)] });
    instantiate(world, { Using: [A(0), B(1), C(2), E(4)] });
  }

  const QUERY_AB = HAS_A | HAS_B;
  const QUERY_CD = HAS_C | HAS_D;
  const QUERY_CE = HAS_C | HAS_E;

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_AB) === QUERY_AB) {
        let x = world.A[i].value;
        world.A[i].value = world.B[i].value;
        world.B[i].value = x;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_CD) === QUERY_CD) {
        let x = world.C[i].value;
        world.C[i].value = world.D[i].value;
        world.D[i].value = x;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_CE) === QUERY_CE) {
        let x = world.C[i].value;
        world.C[i].value = world.E[i].value;
        world.E[i].value = x;
      }
    }
  };
};
