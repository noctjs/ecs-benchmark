const flock = require("flock-ecs");

const Position = new flock.Component(() => ({ x: 0, y: 0 }));
const Velocity = new flock.Component(() => ({ dx: 0, dy: 0 }));
const Animation = new flock.Component(() => ({ frame: 0, length: 5 }));
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
      anim.frame = (anim.frame + 1) % anim.length;
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
    e2.addComponent(Render);

    let e3 = world.createEntity();
    e3.addComponent(Position);
    e3.addComponent(Render);
    e3.addComponent(Animation);

    let e4 = world.createEntity();
    e4.addComponent(Position);
    e4.addComponent(Render);
    e4.addComponent(Animation);
    e4.addComponent(Velocity);

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

exports.bench_create_delete = (count) => {
  let world = setup();

  return () => {
    for (let entity of insertEntities(world, count)) {
      entity.remove();
    }
    world.maintain();
  };
};

exports.bench_update = (count) => {
  let world = setup();

  insertEntities(world, count);

  world.maintain();

  return () => {
    movementSystem.run(world);
    animationSystem.run(world);
    renderingSystem.run(world);
  };
};
