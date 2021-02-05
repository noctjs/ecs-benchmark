import makr from "makr";

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

function setup() {
  return makr(Position, Velocity, Animation, Render);
}

function insertEntities(em, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = em.create();
    e1.add(new Position(0, 0));

    let e2 = em.create();
    e2.add(new Position(0, 0));
    e2.add(new Render("A"));

    let e3 = em.create();
    e3.add(new Position(0, 0));
    e3.add(new Render("A"));
    e3.add(new Animation(0, 5));

    let e4 = em.create();
    e4.add(new Position(0, 0));
    e4.add(new Render("A"));
    e4.add(new Animation(0, 5));
    e4.add(new Velocity(0.1, 0.1));

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "makr";

export function bench_create_delete(count) {
  let em = setup();

  return () => {
    for (let entity of insertEntities(em, count)) {
      entity.destroy();
    }
  };
}

export function bench_update(count) {
  let em = setup();

  insertEntities(em, count);

  return () => {
    for (let entity of em.query(Position, Velocity)) {
      let pos = entity.get(Position);
      let vel = entity.get(Velocity);
      pos.x += vel.dx;
      pos.y += vel.dy;
    }

    for (let entity of em.query(Animation)) {
      let anim = entity.get(Animation);
      anim.frame = (anim.frame + 1) % anim.size;
    }

    for (let entity of em.query(Position, Render)) {
      if (!entity) throw new Error();
    }
  };
}
