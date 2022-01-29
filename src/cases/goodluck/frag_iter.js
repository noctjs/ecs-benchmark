import { WorldImpl, instantiate } from "goodluck";

class World extends WorldImpl {
  A = [];
  B = [];
  C = [];
  D = [];
  E = [];
  F = [];
  G = [];
  H = [];
  I = [];
  J = [];
  K = [];
  L = [];
  M = [];
  N = [];
  O = [];
  P = [];
  Q = [];
  R = [];
  S = [];
  T = [];
  U = [];
  V = [];
  W = [];
  X = [];
  Y = [];
  Z = [];
  Data = [];
}

const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ", (name, index) => {
  class Comp {
    constructor(value) {
      this.value = value;
    }
  }

  return (value) => (world, entity) => {
    world.Signature[entity] |= 1 << index;
    world[name][entity] = new Comp(value);
  };
});

const HAS_Z = 1 << 25;
const HAS_DATA = 1 << 26;

class Data {
  constructor(value) {
    this.value = value;
  }
}

function data(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_DATA;
    world.Data[entity] = new Data(value);
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    for (let comp of COMPS) {
      instantiate(world, [data(0), comp(0)]);
    }
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_DATA) === HAS_DATA) {
        world.Data[i].value *= 2;
      }
    }
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_Z) === HAS_Z) {
        world.Z[i].value *= 2;
      }
    }
  };
};
