const bitECS = require("bitecs");

function setup(count) {
  let engine = bitECS({maxEntities:5000000});

  engine.registerComponent("POSITION", { x: 'float32', y: 'float32' });
  engine.registerComponent("VELOCITY", { dx: 'float32', dy: 'float32' });
  engine.registerComponent("RENDER", { sprite: 'uint32' });
  engine.registerComponent("ANIMATION", { frame: 'uint32', length: 'uint32' });

  return engine;
}

function insertEntities(engine, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    let e1 = engine.addEntity();
    engine.addComponent("POSITION", e1);

    let e2 = engine.addEntity();
    engine.addEntity(e2);
    engine.addComponent("POSITION", e2);
    engine.addComponent("RENDER", e2);

    let e3 = engine.addEntity();
    engine.addEntity(e3);
    engine.addComponent("POSITION", e3);
    engine.addComponent("RENDER", e3);
    engine.addComponent("ANIMATION", e3);

    let e4 = engine.addEntity();
    engine.addEntity(e4);
    engine.addComponent("POSITION", e4);
    engine.addComponent("RENDER", e4);
    engine.addComponent("ANIMATION", e4);
    engine.addComponent("VELOCITY", e4);

    entities.push(e1, e2, e3, e4);
  }

  return entities;
}

exports.bench_create_delete = (count) => {
  let engine = setup(count);

  return () => {
    for (let entity of insertEntities(engine, count)) {
      engine.removeEntity(entity, true);
    }
  };
};

exports.bench_update = (count) => {
  let engine = setup(count);

  let movables = engine.registerSystem({
    name: "Movable",
    components: ["POSITION", "VELOCITY"],
    update: (pos, vel) => eid => {
      pos.x[eid] += vel.dx[eid];
      pos.y[eid] += vel.dy[eid];
    }
  });

  let animations = engine.registerSystem({
    name: "Animation",
    components: ["ANIMATION"],
    update: (anim) => eid => {
      anim.frame[eid] = (anim.frame[eid] + 1) % anim.length[eid];
    }
  });

  let renderables = engine.registerSystem({
    name: "Renderable",
    components: ["POSITION", "RENDER"],
    update: (pos, render) => eid => {
      if (!render) throw new Error();
    }
  });

  insertEntities(engine, count);

  return () => {
    movables.execute();
    animations.execute();
    renderables.execute();
  };
};
