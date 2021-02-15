import { Component, Engine } from "geotic";

const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ", (name) =>
  Function("Component", `return class ${name} extends Component {}`)(Component)
);

class Data extends Component {}

export default (count) => {
  const engine = new Engine();

  engine.registerComponent(Data);

  for (let Comp of COMPS) {
    engine.registerComponent(Comp);
  }

  const world = engine.createWorld();

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      let e = world.createEntity();
      e.add(Comp, { value: 0 });
      e.add(Data, { value: 0 });
    }
  }

  let data = world.createQuery({ all: [Data] });

  return () => {
    for (let entity of data.get()) {
      entity.data.value *= 2;
    }
  };
};
