import { Component, System, Types, World } from "ecsy";

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  () =>
    class extends Component {
      static schema = {
        value: { type: Types.Number },
      };
    }
);

class Data extends Component {
  static schema = {
    value: { type: Types.Number },
  };
}

class DataSystem extends System {
  static queries = {
    entities: { components: [Data] },
  };

  execute() {
    this.queries.entities.results.forEach((entity) => {
      let data = entity.getMutableComponent(Data);
      data.value *= 2;
    });
  }
}

export default (count) => {
  let world = new World();

  for (let Comp of COMPS) {
    world.registerComponent(Comp);
  }

  world.registerComponent(Data);
  world.registerSystem(DataSystem);

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      world
        .createEntity()
        .addComponent(Comp, { value: 0 })
        .addComponent(Data, { value: 0 });
    }
  }

  return () => {
    world.execute();
  };
};
