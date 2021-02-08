import { Component, World } from "@jakeklassen/ecs";

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  () =>
    class extends Component {
      constructor(value) {
        super();
        this.value = value;
      }
    }
);

class Data extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      world.addEntityComponents(world.createEntity(), new Data(0), new Comp(0));
    }
  }

  return () => {
    for (let comps of world.view(Data).values()) {
      let data = comps.get(Data);
      data.value *= 2;
    }
  };
};
