import { Component, Engine } from "geotic";

class A extends Component {}
class B extends Component {}

export default (count) => {
  const engine = new Engine();

  engine.registerComponent(A);
  engine.registerComponent(B);

  const world = engine.createWorld();

  for (let i = 0; i < count; i++) {
    world.createEntity().add(A);
  }

  let with_b = world.createQuery({ all: [B] });
  let without_b = world.createQuery({ none: [B] });

  return () => {
    for (let entity of without_b.get()) {
      entity.add(B);
    }

    for (let entity of with_b.get()) {
      entity.remove(entity.b);
    }
  };
};
