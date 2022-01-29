import {
  Component,
  ECS,
  EntityViewFactory,
  makeComponent,
  System,
} from "perform-ecs";

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  (name) =>
    class extends Component {
      reset(obj, value) {
        obj[name] = value;
      }
    }
);

class Data extends Component {
  reset(obj, value) {
    obj.data = value;
  }
}

for (let Comp of COMPS) {
  makeComponent(Comp);
}

makeComponent(Data);

class DataSystem extends System {
  view = EntityViewFactory.createView({
    components: [Data],
  });

  update() {
    for (let entity of this.view.entities) {
      entity.data *= 2;
    }
  }
}

class ZSystem extends System {
  view = EntityViewFactory.createView({
    components: [COMPS[25]],
  });

  update() {
    for (let entity of this.view.entities) {
      entity.z *= 2;
    }
  }
}

export default (count) => {
  let ecs = new ECS();

  ecs.registerSystem(new DataSystem());
  ecs.registerSystem(new ZSystem());

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      ecs.createEntity([
        { component: Comp, args: [0] },
        { component: Data, args: [0] },
      ]);
    }
  }

  return () => {
    ecs.update(0);
  };
};
