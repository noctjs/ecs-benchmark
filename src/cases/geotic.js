import { Component, Engine } from "geotic";

class Position extends Component {
  static properties = {
    x: 0,
    y: 0,
  };
}

class Velocity extends Component {
  static properties = {
    dx: 0,
    dy: 0,
  };
}

class Animation extends Component {
  static properties = {
    frame: 0,
    size: 1,
  };
}

class Render extends Component {
  static properties = {
    sprite: null,
  };
}

function setup() {
  const engine = new Engine();

  engine.registerComponent(Position);
  engine.registerComponent(Velocity);
  engine.registerComponent(Animation);
  engine.registerComponent(Render);

  return engine.createWorld();
}

function insertEntities(world, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    let e2 = world.createEntity();
    let e3 = world.createEntity();
    let e4 = world.createEntity();

    e1.add(Position);

    e2.add(Position);
    e2.add(Render, { sprite: "A" });

    e3.add(Position);
    e3.add(Render, { sprite: "A" });
    e3.add(Animation, { frame: 0, size: 5 });

    e4.add(Position);
    e4.add(Render, { sprite: "A" });
    e4.add(Animation, { frame: 0, size: 5 });
    e4.add(Velocity, { dx: 0.1, dy: 0.1 });

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "geotic";

export function bench_create_delete(count) {
  let world = setup(count);

  return () => {
    for (let entity of insertEntities(world, count)) {
      entity.destroy();
    }
  };
}

export function bench_update(count) {
  let world = setup(count);

  let movables = world.createQuery({
    all: [Position, Velocity],
  });

  let animates = world.createQuery({
    all: [Animation],
  });

  let renderables = world.createQuery({
    all: [Position, Render],
  });

  insertEntities(world, count);

  return () => {
    for (let entity of movables.get()) {
      entity.position.x += entity.velocity.dx;
      entity.position.y += entity.velocity.dy;
    }

    for (let entity of animates.get()) {
      entity.animation.frame =
        (entity.animation.frame + 1) % entity.animation.size;
    }

    for (let entity of renderables.get()) {
      if (!entity) {
        throw new Error();
      }
    }
  };
}
