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
    let e = world.createEntity();
    e.add(A, { value: 0 });
    e.add(B, { value: 0 });
    e.add(C, { value: 0 });
    e.add(D, { value: 0 });
    e.add(E, { value: 0 });
  }

  let a = world.createQuery({ all: [A] });
  let b = world.createQuery({ all: [B] });
  let c = world.createQuery({ all: [C] });
  let d = world.createQuery({ all: [D] });
  let e = world.createQuery({ all: [E] });

  return () => {
    for (let entity of a.get()) {
      entity.a.value *= 2;
    }

    for (let entity of b.get()) {
      entity.b.value *= 2;
    }

    for (let entity of c.get()) {
      entity.c.value *= 2;
    }

    for (let entity of d.get()) {
      entity.d.value *= 2;
    }

    for (let entity of e.get()) {
      entity.e.value *= 2;
    }
  };
};
