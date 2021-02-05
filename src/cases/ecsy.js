import { Component, Types, World, System } from "ecsy";

class Position extends Component {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
  };
}

class Velocity extends Component {
  static schema = {
    dx: { type: Types.Number, default: 0 },
    dy: { type: Types.Number, default: 0 },
  };
}

class Animation extends Component {
  static schema = {
    frame: { type: Types.Number, default: 0 },
    size: { type: Types.Number, default: 1 },
  };
}

class Render extends Component {
  static schema = {
    sprite: { type: Types.String },
  };
}

class MovementSystem extends System {
  static queries = {
    movable: { components: [Position, Velocity] },
  };

  execute() {
    this.queries.movable.results.forEach((entity) => {
      let pos = entity.getMutableComponent(Position);
      let vel = entity.getComponent(Velocity);
      pos.x += vel.dx;
      pos.y += vel.dy;
    });
  }
}

class AnimationSystem extends System {
  static queries = {
    animations: { components: [Animation] },
  };

  execute() {
    this.queries.animations.results.forEach((entity) => {
      let anim = entity.getMutableComponent(Animation);
      anim.frame = (anim.frame + 1) % anim.size;
    });
  }
}

class RenderingSystem extends System {
  static queries = {
    renderables: { components: [Position, Render] },
  };

  execute() {
    this.queries.renderables.results.forEach((entity) => {
      if (!entity) throw new Error(entity.id);
    });
  }
}

function setup() {
  let world = new World();

  world
    .registerComponent(Position)
    .registerComponent(Velocity)
    .registerComponent(Animation)
    .registerComponent(Render);

  return world;
}

function insertEntities(world, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(
      world.createEntity().addComponent(Position),
      world
        .createEntity()
        .addComponent(Position)
        .addComponent(Render, { sprite: "A" }),
      world
        .createEntity()
        .addComponent(Position)
        .addComponent(Render, { sprite: "A" })
        .addComponent(Animation, { frame: 0, size: 5 }),
      world
        .createEntity()
        .addComponent(Position)
        .addComponent(Render, { sprite: "A" })
        .addComponent(Animation, { frame: 0, size: 5 })
        .addComponent(Velocity, { dx: 0.1, dy: 0.1 })
    );
  }

  return entities;
}

export const name = "ecsy";

export function bench_create_delete(count) {
  let world = setup();

  return () => {
    for (let entity of insertEntities(world, count)) {
      entity.remove(true);
    }
  };
}

export function bench_update(count) {
  let world = setup();

  world.registerSystem(MovementSystem);
  world.registerSystem(AnimationSystem);
  world.registerSystem(RenderingSystem);

  insertEntities(world, count);

  return () => {
    world.execute();
  };
}
