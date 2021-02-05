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
    state: { frame: 0, size: 1 },
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
    let e1 = ecs.createEntity();
    let e2 = ecs.createEntity();
    let e3 = ecs.createEntity();
    let e4 = ecs.createEntity();

    ecs.addComponent(e1, "Position");
    ecs.addComponent(e2, "Position");
    ecs.addComponent(e2, "Render", { sprite: "A" });
    ecs.addComponent(e3, "Position");
    ecs.addComponent(e3, "Render", { sprite: "A" });
    ecs.addComponent(e3, "Animation", { frame: 0, size: 5 });
    ecs.addComponent(e4, "Position");
    ecs.addComponent(e4, "Render", { sprite: "A" });
    ecs.addComponent(e4, "Animation", { frame: 0, size: 5 });
    ecs.addComponent(e4, "Velocity", { dx: 0.1, dy: 0.1 });

    entities.push(e1, e2, e3, e4);
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
    state.frame = (state.frame + 1) % state.size;
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
