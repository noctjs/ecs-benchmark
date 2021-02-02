import ecs from "js13k-ecs";

function Position(x, y) {
  this.x = x;
  this.y = y;
}

function Velocity(dx, dy) {
  this.dx = dx;
  this.dy = dy;
}

function Animation(frame, size) {
  this.frame = frame;
  this.size = size;
}

function Render(sprite) {
  this.sprite = sprite;
}

ecs.register(Position);
ecs.register(Velocity);
ecs.register(Animation);
ecs.register(Render);

function insertEntities(count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = ecs.create();
    let e2 = ecs.create();
    let e3 = ecs.create();
    let e4 = ecs.create();

    e1.add(new Position(0, 0));
    e2.add(new Position(0, 0), new Render("A"));
    e3.add(new Position(0, 0), new Render("A"), new Animation(0, 5));
    e4.add(
      new Position(0, 0),
      new Render("A"),
      new Animation(0, 5),
      new Velocity(0.1, 0.1)
    );

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "js13k-ecs";

export function bench_create_delete(count) {
  return () => {
    for (let entity of insertEntities(count)) {
      entity.eject();
    }
  };
}

export function bench_update(count) {
  insertEntities(count);

  let movables = ecs.select(Position, Velocity);
  let animations = ecs.select(Animation);
  let renderables = ecs.select(Position, Render);

  function movablesFn(entity) {
    let pos = entity.get(Position);
    let vel = entity.get(Velocity);
    pos.x += vel.dx;
    pos.y += vel.dy;
  }

  function animationsFn(entity) {
    let anim = entity.get(Animation);
    anim.frame = (anim.frame + 1) % anim.size;
  }

  function renderablesFn(entity) {
    if (!entity) throw new Error();
  }

  return () => {
    movables.iterate(movablesFn);
    animations.iterate(animationsFn);
    renderables.iterate(renderablesFn);
  };
}
