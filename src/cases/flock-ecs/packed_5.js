import flock from "flock-ecs";

const A = new flock.Component(() => ({ value: 0 }));
const B = new flock.Component(() => ({ value: 0 }));
const C = new flock.Component(() => ({ value: 0 }));
const D = new flock.Component(() => ({ value: 0 }));
const E = new flock.Component(() => ({ value: 0 }));

const QueryA = [new flock.Current(A)];
const QueryB = [new flock.Current(B)];
const QueryC = [new flock.Current(C)];
const QueryD = [new flock.Current(D)];
const QueryE = [new flock.Current(E)];

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

    for (let entity of world.query(QueryB)) {
      entity.getComponent(B).value *= 2;
    }

    for (let entity of world.query(QueryC)) {
      entity.getComponent(C).value *= 2;
    }

    for (let entity of world.query(QueryD)) {
      entity.getComponent(D).value *= 2;
    }

    for (let entity of world.query(QueryE)) {
      entity.getComponent(E).value *= 2;
    }
  };
};
