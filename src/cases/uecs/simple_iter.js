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
    world.create(new A(0), new B(1));
    world.create(new A(0), new B(1), new C(2));
    world.create(new A(0), new B(1), new C(2), new D(3));
    world.create(new A(0), new B(1), new C(2), new E(4));
  }

  return () => {
    world.view(A, B).each((entity, a, b) => {
      let x = a.value;
      a.value = b.value;
      b.value = x;
    });

    world.view(C, D).each((entity, c, d) => {
      let x = c.value;
      c.value = d.value;
      d.value = x;
    });

    world.view(C, E).each((entity, c, e) => {
      let x = c.value;
      c.value = e.value;
      e.value = x;
    });
  };
};
