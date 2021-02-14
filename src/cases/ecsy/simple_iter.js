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

class ABSystem extends System {
  static queries = {
    entities: { components: [A, B] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      let a = entity.getMutableComponent(A);
      let b = entity.getMutableComponent(B);
      let x = a.value;
      a.value = b.value;
      b.value = x;
    });
  }
}

class CDSystem extends System {
  static queries = {
    entities: { components: [C, D] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      let c = entity.getMutableComponent(C);
      let d = entity.getMutableComponent(D);
      let x = c.value;
      c.value = d.value;
      d.value = x;
    });
  }
}

class CESystem extends System {
  static queries = {
    entities: { components: [C, E] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      let c = entity.getMutableComponent(C);
      let e = entity.getMutableComponent(E);
      let x = c.value;
      c.value = e.value;
      e.value = x;
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

  world
    .registerSystem(ABSystem)
    .registerSystem(CDSystem)
    .registerSystem(CESystem);

  for (let i = 0; i < count; i++) {
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 });
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 });
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 })
      .addComponent(D, { value: 3 });
    world
      .createEntity()
      .addComponent(A, { value: 0 })
      .addComponent(B, { value: 1 })
      .addComponent(C, { value: 2 })
      .addComponent(E, { value: 4 });
  }

  return () => {
    world.execute();
  };
};
