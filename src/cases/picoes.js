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
      onCreate(_, frame = 0, size = 1) {
        this.frame = frame;
        this.size = size;
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
      world.entity().set("position").set("render", "A"),
      world.entity().set("position").set("render", "A").set("animation", 0, 5),
      world
        .entity()
        .set("position")
        .set("render", "A")
        .set("animation", 0, 5)
        .set("velocity", 0.1, 0.1)
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
    anim.frame = (anim.frame + 1) % anim.size;
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
