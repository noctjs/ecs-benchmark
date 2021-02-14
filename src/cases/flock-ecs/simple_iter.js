import flock from "flock-ecs";

const A = new flock.Component(() => ({ value: 0 }));
const B = new flock.Component(() => ({ value: 0 }));
const C = new flock.Component(() => ({ value: 0 }));
const D = new flock.Component(() => ({ value: 0 }));
const E = new flock.Component(() => ({ value: 0 }));

const AB = [new flock.Current(A), new flock.Current(B)];
const CD = [new flock.Current(C), new flock.Current(D)];
const CE = [new flock.Current(C), new flock.Current(E)];

export default (count) => {
  let world = new flock.World();

  world.registerComponent(A);
  world.registerComponent(B);
  world.registerComponent(C);
  world.registerComponent(D);
  world.registerComponent(E);

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    e1.addComponent(A, { value: 0 });
    e1.addComponent(B, { value: 1 });

    let e2 = world.createEntity();
    e2.addComponent(A, { value: 0 });
    e2.addComponent(B, { value: 1 });
    e2.addComponent(C, { value: 2 });

    let e3 = world.createEntity();
    e3.addComponent(A, { value: 0 });
    e3.addComponent(B, { value: 1 });
    e3.addComponent(C, { value: 2 });
    e3.addComponent(D, { value: 3 });

    let e4 = world.createEntity();
    e4.addComponent(A, { value: 0 });
    e4.addComponent(B, { value: 1 });
    e4.addComponent(C, { value: 2 });
    e4.addComponent(E, { value: 4 });
  }

  world.maintain();

  return () => {
    for (let entity of world.query(AB)) {
      let a = entity.getComponent(A);
      let b = entity.getComponent(B);
      let x = a.value;
      a.value = b.value;
      b.value = x;
    }

    for (let entity of world.query(CD)) {
      let c = entity.getComponent(C);
      let d = entity.getComponent(D);
      let x = c.value;
      c.value = d.value;
      d.value = x;
    }

    for (let entity of world.query(CE)) {
      let c = entity.getComponent(C);
      let e = entity.getComponent(E);
      let x = c.value;
      c.value = e.value;
      e.value = x;
    }
  };
};
