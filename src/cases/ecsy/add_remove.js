import { Component, Not, System, Types, World } from "ecsy";

class A extends Component {
  static schema = {};
}

class B extends Component {
  static schema = {};
}

class AddB extends System {
  static queries = {
    entities: { components: [A, Not(B)] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      entity.addComponent(B);
    });
  }
}

class RemoveB extends System {
  static queries = {
    entities: { components: [B] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      entity.removeComponent(B);
    });
  }
}

export default (count) => {
  let world = new World();

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerSystem(AddB)
    .registerSystem(RemoveB);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A);
  }

  return () => {
    world.execute();
  };
};
