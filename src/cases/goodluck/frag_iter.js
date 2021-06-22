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

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  (name, index) => (value) => (world, entity) => {
    world.Signature[entity] |= 1 << index;
    world[name][entity] = { value };
  }
);

const HAS_DATA = 1 << 26;

function Data(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_DATA;
    world.Data[entity] = { value };
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      instantiate(world, [Data(0), Comp(0)]);
    }
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_DATA) === HAS_DATA) {
        world.Data[i].value *= 2;
      }
    }
  };
};
