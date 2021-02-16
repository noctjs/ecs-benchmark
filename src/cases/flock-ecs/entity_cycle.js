import flock from "flock-ecs";

const A = new flock.Component(() => ({ value: 0 }));
const B = new flock.Component(() => ({ value: 0 }));

const WITH_A = [new flock.Current(A)];
const WITH_B = [new flock.Current(B)];

export default (count) => {
  let world = new flock.World();

  world.registerComponent(A);
  world.registerComponent(B);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A, { value: i });
  }

  world.maintain();

  return () => {
    for (let entity of world.query(WITH_A)) {
      let value = entity.getComponent(A).value;
      world.createEntity().addComponent(B, { value });
      world.createEntity().addComponent(B, { value });
    }

    for (let entity of world.query(WITH_B)) {
      entity.remove();
    }

    world.maintain();
  };
};
