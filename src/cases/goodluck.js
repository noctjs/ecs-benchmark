import goodluck from "goodluck";

const { BaseWorld, destroyEntity, instantiate } = goodluck;

// Component masks and storage.

const HAS_POSITION = 1 << 0;
const HAS_VELOCITY = 1 << 1;
const HAS_ANIMATION = 1 << 2;
const HAS_RENDER = 1 << 3;

class World extends BaseWorld {
  Position = [];
  Velocity = [];
  Animation = [];
  Render = [];
}

// Component data mixins.

function position(x = 0, y = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_POSITION;
    world.Position[entity] = { x, y };
  };
}

function velocity(dx = 0, dy = 0) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_VELOCITY;
    world.Velocity[entity] = { dx, dy };
  };
}

function animation(frame = 0, size = 1) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_ANIMATION;
    world.Animation[entity] = { frame, size };
  };
}

function render(sprite = null) {
  return (world, entity) => {
    world.Signature[entity] |= HAS_RENDER;
    world.Render[entity] = { sprite };
  };
}

// Scene setup.

function insertEntities(world, count) {
  for (let i = 0; i < count; i++) {
    instantiate(world, {
      Using: [position(0, 0)],
    });
    instantiate(world, {
      Using: [position(0, 0), render("A")],
    });
    instantiate(world, {
      Using: [position(0, 0), render("A"), animation(0, 5)],
    });
    instantiate(world, {
      Using: [position(0, 0), render("A"), animation(0, 5), velocity(0.1, 0.1)],
    });
  }
}

// Benchmarks.

export const name = "goodluck";

export function bench_create_delete(count) {
  let world = new World();
  return () => {
    insertEntities(world, count);
    for (let i = 0; i < world.Signature.length; i++) {
      destroyEntity(world, i);
    }
  };
}

export function bench_update(count) {
  let world = new World();
  insertEntities(world, count);

  const QUERY_MOVABLES = HAS_POSITION | HAS_VELOCITY;
  function sys_movables(world) {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_MOVABLES) === QUERY_MOVABLES) {
        let position = world.Position[i];
        let velocity = world.Velocity[i];
        position.x += velocity.dx;
        position.y += velocity.dy;
      }
    }
  }

  const QUERY_ANIMATIONS = HAS_ANIMATION;
  function sys_animations(world) {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_ANIMATIONS) === QUERY_ANIMATIONS) {
        let animation = world.Animation[i];
        animation.frame = (animation.frame + 1) % animation.size;
      }
    }
  }

  const QUERY_RENDERABLES = HAS_POSITION | HAS_RENDER;
  function sys_renderables(world) {
    for (let i = 0; i < world.Signature.length; i++) {
      if ((world.Signature[i] & QUERY_RENDERABLES) === QUERY_RENDERABLES) {
        let render = world.Render[i];
        if (!render.sprite) {
          throw new Error();
        }
      }
    }
  }

  return () => {
    sys_movables(world);
    sys_animations(world);
    sys_renderables(world);
  };
}
