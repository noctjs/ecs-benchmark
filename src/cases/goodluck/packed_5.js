import { WorldImpl, instantiate } from "goodluck";

class World extends WorldImpl {
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

class C {
  constructor(value) {
    this.value = value;
  }
}

class D {
  constructor(value) {
    this.value = value;
  }
}

class E {
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

function c(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_C;
    world.C[entity] = new C(value);
  };
}

function d(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_D;
    world.D[entity] = new D(value);
  };
}

function e(value) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_E;
    world.E[entity] = new E(value);
  };
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    instantiate(world, [a(0), b(0), c(0), d(0), e(0)]);
  }

  return () => {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_A) === HAS_A) {
        world.A[i].value *= 2;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_B) === HAS_B) {
        world.B[i].value *= 2;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_C) === HAS_C) {
        world.C[i].value *= 2;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_D) === HAS_D) {
        world.D[i].value *= 2;
      }
    }

    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & HAS_E) === HAS_E) {
        world.E[i].value *= 2;
      }
    }
  };
};
