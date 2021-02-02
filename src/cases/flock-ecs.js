import flock from "flock-ecs";

const Position = new flock.Component(() => ({ x: 0, y: 0 }));
const Velocity = new flock.Component(() => ({ dx: 0, dy: 0 }));
const Animation = new flock.Component(() => ({ frame: 0, size: 1 }));
const Render = new flock.Component(() => ({ sprite: null }));

const movementSystem = new flock.System(
  (entities) => {
    for (let entity of entities) {
      let pos = entity.getComponent(Position);
      let vel = entity.getComponent(Velocity);
      pos.x += vel.x;
      pos.y += vel.y;
    }
  },
  [Position, Velocity]
);

const animationSystem = new flock.System(
  (entities) => {
    for (let entity of entities) {
      let anim = entity.getComponent(Animation);
      anim.frame = (anim.frame + 1) % anim.size;
    }
  },
  [Animation]
);

const renderingSystem = new flock.System(
  (entities) => {
    for (let entity of entities) {
      if (!entity) throw new Error();
    }
  },
  [Position, Render]
);

function setup() {
  let world = new flock.World();

  world.registerComponent(Position);
  world.registerComponent(Velocity);
  world.registerComponent(Animation);
  world.registerComponent(Render);

  return world;
}

function insertEntities(world, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    e1.addComponent(Position);

    let e2 = world.createEntity();
    e2.addComponent(Position);
    e2.addComponent(Render, { sprite: "A" });

    let e3 = world.createEntity();
    e3.addComponent(Position);
    e3.addComponent(Render, { sprite: "A" });
    e3.addComponent(Animation, { frame: 0, size: 5 });

    let e4 = world.createEntity();
    e4.addComponent(Position);
    e4.addComponent(Render, { sprite: "A" });
    e4.addComponent(Animation, { frame: 0, size: 5 });
    e4.addComponent(Velocity, { dx: 0.1, dy: 0.1 });

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "flock-ecs";

export function bench_create_delete(count) {
  let world = setup();

  return () => {
    for (let entity of insertEntities(world, count)) {
      entity.remove();
    }
    world.maintain();
  };
}

export function bench_update(count) {
  let world = setup();

  insertEntities(world, count);

  world.maintain();

  return () => {
    movementSystem.run(world);
    animationSystem.run(world);
    renderingSystem.run(world);
  };
}
