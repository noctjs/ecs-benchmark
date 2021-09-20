import flock from "flock-ecs";

const A = new flock.Component(() => {});
const B = new flock.Component(() => {});

const WITH_B = [new flock.Without(B)];
const WITHOUT_B = [new flock.Current(B)];

export default (count) => {
  let world = new flock.World();

  world.registerComponent(A);
  world.registerComponent(B);

  for (let i = 0; i < count; i++) {
    world.createEntity().addComponent(A);
  }

  world.maintain();

  return () => {
    for (let entity of world.query(WITHOUT_B)) {
      entity.addComponent(B);
    }

    for (let entity of world.query(WITH_B)) {
      entity.removeComponent(B);
    }
  };
};
