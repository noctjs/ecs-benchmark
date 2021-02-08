import flock from "flock-ecs";

const A = new flock.Component(() => ({ value: 0 }));
const B = new flock.Component(() => ({ value: 0 }));

const WITH_B = [new flock.Without(B)];
const WITHOUT_B = [new flock.Current(B)];

export default (count) => {
  let world = new flock.World();

  world.registerComponent(A);
  world.registerComponent(B);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A, { value: 0 });
  }

  world.maintain();

  return () => {
    for (let entity of world.query(WITHOUT_B)) {
      entity.addComponent(B, { value: 0 });
    }

    for (let entity of world.query(WITH_B)) {
      entity.removeComponent(B);
    }
  };
};
