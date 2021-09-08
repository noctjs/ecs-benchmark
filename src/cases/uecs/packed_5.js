import { World } from "uecs";

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

function C(value) {
  this.value = value;
}

function D(value) {
  this.value = value;
}

function E(value) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    world.create(new A(0), new B(0), new C(0), new D(0), new E(0));
  }

  return () => {
    world.view(A).each((entity, a) => {
      a.value *= 2;
    });

    world.view(B).each((entity, b) => {
      b.value *= 2;
    });

    world.view(C).each((entity, c) => {
      c.value *= 2;
    });

    world.view(D).each((entity, d) => {
      d.value *= 2;
    });

    world.view(E).each((entity, e) => {
      e.value *= 2;
    });
  };
};
