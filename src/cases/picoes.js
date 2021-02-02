import { MemoizedQueryIndex, SimpleIndex, World } from "picoes";

function setup(memoize) {
  let world = new World(memoize ? MemoizedQueryIndex : SimpleIndex);

  world.component(
    "position",
    class {
      onCreate(_, x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
    }
  );

  world.component(
    "velocity",
    class {
      onCreate(_, dx = 0, dy = 0) {
        this.dx = dx;
        this.dy = dy;
      }
    }
  );

  world.component(
    "animation",
    class {
      onCreate(_, length = 1) {
        this.frame = 0;
        this.length = length;
      }
    }
  );

  world.component(
    "render",
    class {
      onCreate(_, sprite = null) {
        this.sprite = sprite;
      }
    }
  );

  return world;
}

function insertEntities(world, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(
      world.entity().set("position"),
      world.entity().set("position").set("render", "a"),
      world.entity().set("position").set("render", "a").set("animation", 5),
      world
        .entity()
        .set("position")
        .set("render", "a")
        .set("animation", 5)
        .set("velocity")
    );
  }

  return entities;
}

export const name = "picoes";

export function bench_create_delete(count) {
  let ecs = setup(false);

  return () => {
    for (let entity of insertEntities(ecs, count)) {
      entity.destroy();
    }
  };
}

export function bench_update(count) {
  let world = setup(true);

  insertEntities(world, count);

  function movablesFn(pos, vel) {
    pos.x += vel.dx;
    pos.y += vel.dy;
  }

  function animationsFn(anim) {
    anim.frame = (anim.frame + 1) % anim.length;
  }

  function renderablesFn(entity) {
    if (!entity) throw new Error();
  }

  return () => {
    world.every(["position", "velocity"], movablesFn);
    world.every(["animation"], animationsFn);
    world.every(["position", "render"], renderablesFn);
  };
}
