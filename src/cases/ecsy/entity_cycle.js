import { Component, System, Types, World } from "ecsy";

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

class SpawnB extends System {
  static queries = {
    entities: { components: [A] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      this.world.createEntity().addComponent(B, {
        value: entity.getComponent(A).value,
      });
    });
  }
}

class KillB extends System {
  static queries = {
    entities: { components: [B] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      entity.remove();
    });
  }
}

export default (count) => {
  let world = new World();

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerSystem(SpawnB)
    .registerSystem(KillB);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A, { value: i });
  }

  return () => {
    world.execute();
  };
};
