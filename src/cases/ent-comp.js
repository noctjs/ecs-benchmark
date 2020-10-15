import EntComp from "ent-comp";

function setup() {
  let ecs = new EntComp();

  ecs.createComponent({
    name: "Position",
    state: { x: 0, y: 0 },
  });

  ecs.createComponent({
    name: "Velocity",
    state: { dx: 0, dy: 0 },
  });

  ecs.createComponent({
    name: "Animation",
    state: { frame: 0, length: 5 },
  });

  ecs.createComponent({
    name: "Render",
    state: { sprite: null },
  });

  return ecs;
}

function insertEntities(ecs, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(
      ecs.createEntity(["Position"]),
      ecs.createEntity(["Position", "Render"]),
      ecs.createEntity(["Position", "Render", "Animation"]),
      ecs.createEntity(["Position", "Render", "Animation", "Velocity"])
    );
  }

  return entities;
}

export const name = "ent-comp";

export function bench_create_delete(count) {
  let ecs = setup();

  return () => {
    for (let entity of insertEntities(ecs, count)) {
      ecs.deleteEntity(entity, true);
    }
  };
}

export function bench_update(count) {
  let ecs = setup();

  insertEntities(ecs, count);

  let movables = ecs.getStatesList("Velocity");
  let animations = ecs.getStatesList("Animation");
  let renderables = ecs.getStatesList("Render");
  let getPosition = ecs.getStateAccessor("Position");

  function movablesFn(state) {
    let pos = getPosition(state.__id);
    let vel = state;
    pos.x += vel.dx;
    pos.y += vel.dy;
  }

  function animationsFn(state) {
    state.frame = (state.frame + 1) % state.length;
  }

  function renderablesFn(state) {
    if (!state) throw new Error();
  }

  return () => {
    movables.forEach(movablesFn);
    animations.forEach(animationsFn);
    renderables.forEach(renderablesFn);
  };
}
