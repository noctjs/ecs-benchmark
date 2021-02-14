import { Component, Not, System, Types, World } from "ecsy";

class A extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class B extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class AddB extends System {
  static queries = {
    entities: { components: [A, Not(B)] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      entity.addComponent(B, { value: 0 });
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
    world.createEntity().addComponent(A, { value: 0 });
  }

  return () => {
    world.execute();
  };
};
