const { Component, Types, World, System } = require("ecsy");

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
    length: { type: Types.Number, default: 5 },
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
      anim.frame = (anim.frame + 1) % anim.length;
    });
  }
}

class RenderingSystem extends System {
  static queries = {
    renderables: { components: [Position, Render] },
  };

  execute() {
    this.queries.renderables.results.forEach((entity) => {
      if (!entity) throw new Error();
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
      world.createEntity().addComponent(Position).addComponent(Render),
      world
        .createEntity()
        .addComponent(Position)
        .addComponent(Render)
        .addComponent(Animation),
      world
        .createEntity()
        .addComponent(Position)
        .addComponent(Render)
        .addComponent(Animation)
        .addComponent(Velocity)
    );
  }

  return entities;
}

exports.bench_create_delete = (count) => {
  let world = setup();

  return () => {
    for (let entity of insertEntities(world, count)) {
      entity.remove(true);
    }
  };
};

exports.bench_update = (count) => {
  let world = setup();

  world.registerSystem(MovementSystem);
  world.registerSystem(AnimationSystem);
  world.registerSystem(RenderingSystem);

  insertEntities(world, count);

  return () => {
    world.execute();
  };
};
