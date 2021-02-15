import flock from "flock-ecs";

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  () => new flock.Component(() => ({ value: 0 }))
);

const Data = new flock.Component(() => ({ value: 0 }));
const DataQuery = [new flock.Current(Data)];

export default (count) => {
  let world = new flock.World();

  for (let Comp of COMPS) {
    world.registerComponent(Comp);
  }

  world.registerComponent(Data);

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      let e = world.createEntity();
      e.addComponent(Comp);
      e.addComponent(Data);
    }
  }

  world.maintain();

  return () => {
    for (let entity of world.query(DataQuery)) {
      let data = entity.getComponent(Data);
      data.value *= 2;
    }
  };
};
