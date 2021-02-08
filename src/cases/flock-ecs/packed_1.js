import flock from "flock-ecs";

const A = new flock.Component(() => ({ value: 0 }));
const B = new flock.Component(() => ({ value: 0 }));
const C = new flock.Component(() => ({ value: 0 }));
const D = new flock.Component(() => ({ value: 0 }));
const E = new flock.Component(() => ({ value: 0 }));

const QueryA = [new flock.Current(A)];

export default (count) => {
  let world = new flock.World();

  world.registerComponent(A);
  world.registerComponent(B);
  world.registerComponent(C);
  world.registerComponent(D);
  world.registerComponent(E);

  for (let i = 0; i < count; i++) {
    let e = world.createEntity();
    e.addComponent(A, { value: 0 });
    e.addComponent(B, { value: 0 });
    e.addComponent(C, { value: 0 });
    e.addComponent(D, { value: 0 });
    e.addComponent(E, { value: 0 });
  }

  world.maintain();

  return () => {
    for (let entity of world.query(QueryA)) {
      entity.getComponent(A).value *= 2;
    }
  };
};
