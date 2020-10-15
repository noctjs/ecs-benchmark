import { Component, World } from "@jakeklassen/ecs";

class Position extends Component {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

class Velocity extends Component {
  constructor(dx = 0, dy = 0) {
    super();
    this.dx = dx;
    this.dy = dy;
  }
}

class Animation extends Component {
  constructor(length = 1) {
    super();
    this.frame = 0;
    this.length = length;
  }
}

class Render extends Component {
  constructor(sprite = null) {
    super();
    this.sprite = sprite;
  }
}

function insertEntities(world, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    let e2 = world.createEntity();
    let e3 = world.createEntity();
    let e4 = world.createEntity();

    world.addEntityComponents(e1, new Position());
    world.addEntityComponents(e2, new Position(), new Render());
    world.addEntityComponents(
      e3,
      new Position(),
      new Render(),
      new Animation()
    );
    world.addEntityComponents(
      e4,
      new Position(),
      new Render(),
      new Animation(),
      new Velocity()
    );

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

export const name = "@jakeklassen/ecs";

export function bench_create_delete(count) {
  let world = new World();

  return () => {
    for (let entity of insertEntities(world, count)) {
      world.deleteEntity(entity);
    }
  };
}

export function bench_update(count) {
  let world = new World();

  insertEntities(world, count);

  return () => {
    for (let comps of world.view(Position, Velocity).values()) {
      let pos = comps.get(Position);
      let vel = comps.get(Velocity);
      pos.x += vel.dx;
      pos.y += vel.dy;
    }

    for (let comps of world.view(Animation).values()) {
      let anim = comps.get(Animation);
      anim.frame = (anim.frame + 1) % anim.length;
    }

    for (let entity of world.view(Position, Velocity).keys()) {
      if (!entity) throw new Error();
    }
  };
}
