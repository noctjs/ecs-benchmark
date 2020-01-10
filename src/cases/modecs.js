const ModECS = require("modecs");

function setup() {
  let engine = ModECS();

  engine.registerComponent("POSITION", { x: 0, y: 0 });
  engine.registerComponent("VELOCITY", { dx: 0, dy: 0 });
  engine.registerComponent("RENDER", { sprite: null });
  engine.registerComponent("ANIMATION", { frame: 0, length: 1 });

  return engine;
}

function insertEntities(engine, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = engine.createEntity();
    engine.addEntity(e1);
    engine.addComponent(e1, "POSITION");

    let e2 = engine.createEntity();
    engine.addEntity(e2);
    engine.addComponent(e2, "POSITION");
    engine.addComponent(e2, "RENDER");

    let e3 = engine.createEntity();
    engine.addEntity(e3);
    engine.addComponent(e3, "POSITION");
    engine.addComponent(e3, "RENDER");
    engine.addComponent(e3, "ANIMATION");

    let e4 = engine.createEntity();
    engine.addEntity(e4);
    engine.addComponent(e4, "POSITION");
    engine.addComponent(e4, "RENDER");
    engine.addComponent(e4, "ANIMATION");
    engine.addComponent(e4, "VELOCITY");

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

exports.bench_create_delete = count => {
  let engine = setup();

  return () => {
    for (let entity of insertEntities(engine, count)) {
      engine.removeEntity(entity, true);
    }
  };
};

exports.bench_update = count => {
  let engine = setup();

  let movables = engine.registerSystem(
    "Movable",
    ["POSITION", "VELOCITY"],
    () => (pos, vel) => {
      pos.x += vel.dx;
      pos.y += vel.dy;
    }
  );

  let animations = engine.registerSystem(
    "Animation",
    ["ANIMATION"],
    () => anim => {
      anim.frame = (anim.frame + 1) % anim.length;
    }
  );

  let renderables = engine.registerSystem(
    "Renderable",
    ["POSITION", "RENDER"],
    () => (pos, render) => {
      if (!render) throw new Error();
    }
  );

  insertEntities(engine, count);

  return () => {
    movables.process();
    animations.process();
    renderables.process();
  };
};
