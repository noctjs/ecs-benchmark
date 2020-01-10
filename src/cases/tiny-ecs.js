const { EntityManager } = require("tiny-ecs");

function Position(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

function Velocity(dx = 0, dy = 0) {
  this.dx = dx;
  this.dy = dy;
}

function Animation(length = 1) {
  this.frame = 0;
  this.length = length;
}

function Render(sprite = null) {
  this.sprite = sprite;
}

function setup() {
  return new EntityManager();
}

function insertEntities(ecs, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(
      ecs.createEntity().addComponent(Position),
      ecs
        .createEntity()
        .addComponent(Position)
        .addComponent(Render),
      ecs
        .createEntity()
        .addComponent(Position)
        .addComponent(Render)
        .addComponent(Animation),
      ecs
        .createEntity()
        .addComponent(Position)
        .addComponent(Render)
        .addComponent(Animation)
        .addComponent(Velocity)
    );
  }

  return entities;
}

exports.bench_create_delete = count => {
  let ecs = setup();

  return () => {
    for (let entity of insertEntities(ecs, count)) {
      entity.remove();
    }
  };
};

exports.bench_update = count => {
  let ecs = setup();

  insertEntities(ecs, count);

  let movables = ecs.queryComponents([Position, Velocity]);
  let animations = ecs.queryComponents([Animation]);
  let renderables = ecs.queryComponents([Position, Render]);

  function movablesFn(entity) {
    entity.position.x += entity.velocity.dx;
    entity.position.y += entity.velocity.dy;
  }

  function animationsFn(entity) {
    entity.animation.frame =
      (entity.animation.frame + 1) % entity.animation.length;
  }

  function renderablesFn(entity) {
    if (!entity) throw new Error();
  }

  return () => {
    movables.forEach(movablesFn);
    animations.forEach(animationsFn);
    renderables.forEach(renderablesFn);
  };
};
