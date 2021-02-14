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

class C extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class D extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class E extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class ASystem extends System {
  static queries = {
    entities: { components: [A] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      entity.getMutableComponent(A).value *= 2;
    });
  }
}

export default (count) => {
  let world = new World();

  world
    .registerComponent(A)
    .registerComponent(B)
    .registerComponent(C)
    .registerComponent(D)
    .registerComponent(E);

  world.registerSystem(ASystem);

  for (let i = 0; i < count; i++) {
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 0 })
      .addComponent(C, { value: 0 })
      .addComponent(D, { value: 0 })
      .addComponent(E, { value: 0 });
  }

  return () => {
    world.execute();
  };
};
