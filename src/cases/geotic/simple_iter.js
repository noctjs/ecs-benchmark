import { Component, Engine } from "geotic";

class A extends Component {}
class B extends Component {}
class C extends Component {}
class D extends Component {}
class E extends Component {}

export default (count) => {
  const engine = new Engine();

  engine.registerComponent(A);
  engine.registerComponent(B);
  engine.registerComponent(C);
  engine.registerComponent(D);
  engine.registerComponent(E);

  const world = engine.createWorld();

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    e1.add(A, { value: 0 });
    e1.add(B, { value: 1 });

    let e2 = world.createEntity();
    e2.add(A, { value: 0 });
    e2.add(B, { value: 1 });
    e2.add(C, { value: 2 });

    let e3 = world.createEntity();
    e3.add(A, { value: 0 });
    e3.add(B, { value: 1 });
    e3.add(C, { value: 2 });
    e3.add(D, { value: 3 });

    let e4 = world.createEntity();
    e4.add(A, { value: 0 });
    e4.add(B, { value: 1 });
    e4.add(C, { value: 2 });
    e4.add(E, { value: 4 });
  }

  let ab = world.createQuery({ all: [A, B] });
  let cd = world.createQuery({ all: [C, D] });
  let ce = world.createQuery({ all: [C, E] });

  return () => {
    for (let entity of ab.get()) {
      let x = entity.a.value;
      entity.a.value = entity.b.value;
      entity.b.value = x;
    }

    for (let entity of cd.get()) {
      let x = entity.c.value;
      entity.c.value = entity.d.value;
      entity.d.value = x;
    }

    for (let entity of ce.get()) {
      let x = entity.c.value;
      entity.c.value = entity.e.value;
      entity.e.value = x;
    }
  };
};
