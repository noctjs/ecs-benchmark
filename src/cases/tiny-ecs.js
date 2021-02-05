import TinyECS from "tiny-ecs";

const { EntityManager } = TinyECS;

function Position(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

function Velocity(dx = 0, dy = 0) {
  this.dx = dx;
  this.dy = dy;
}

function Animation(frame = 0, size = 1) {
  this.frame = frame;
  this.size = size;
}

function Render(sprite = null) {
  this.sprite = sprite;
}

function insertEntities(ecs, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = ecs.createEntity();
    let e2 = ecs.createEntity();
    let e3 = ecs.createEntity();
    let e4 = ecs.createEntity();

    e1.addComponent(Position);
    e2.addComponent(Position).addComponent(Render);
    e3.addComponent(Position).addComponent(Render).addComponent(Animation);
    e4.addComponent(Position)
      .addComponent(Render)
      .addComponent(Animation)
      .addComponent(Velocity);

    e2.render.sprite = e3.render.sprite = e4.render.sprite = "A";
    e3.animation.size = e4.animation.size = 5;
    e4.velocity.dx = e4.velocity.dy = 0.1;

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "tiny-ecs";

export function bench_create_delete(count) {
  let ecs = new EntityManager();

  return () => {
    for (let entity of insertEntities(ecs, count)) {
      entity.remove();
    }
  };
}

export function bench_update(count) {
  let ecs = new EntityManager();

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
      (entity.animation.frame + 1) % entity.animation.size;
  }

  function renderablesFn(entity) {
    if (!entity) throw new Error();
  }

  return () => {
    movables.forEach(movablesFn);
    animations.forEach(animationsFn);
    renderables.forEach(renderablesFn);
  };
}
