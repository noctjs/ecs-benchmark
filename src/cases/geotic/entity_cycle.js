import { Component, Engine } from "geotic";

class A extends Component {}
class B extends Component {}

export default (count) => {
  const engine = new Engine();

  engine.registerComponent(A);
  engine.registerComponent(B);

  const world = engine.createWorld();

  for (let i = 0; i < count; i++) {
    world.createEntity().add(A, { value: i });
  }

  let with_a = world.createQuery({ all: [A] });
  let with_b = world.createQuery({ all: [B] });

  return () => {
    for (let entity of with_a.get()) {
      let value = entity.a.value;
      world.createEntity().add(B, { value });
      world.createEntity().add(B, { value });
    }

    for (let entity of with_b.get()) {
      entity.destroy();
    }
  };
};
