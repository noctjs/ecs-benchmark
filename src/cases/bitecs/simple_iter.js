import bitECS from "bitecs";

export default (count) => {
  let world = bitECS({ maxEntities: count * 4 });

  world.registerComponent("A", { value: "int32" });
  world.registerComponent("B", { value: "int32" });
  world.registerComponent("C", { value: "int32" });
  world.registerComponent("D", { value: "int32" });
  world.registerComponent("E", { value: "int32" });

  world.registerSystem({
    name: "AB",
    components: ["A", "B"],
    update: (a, b) => (entities) => {
      for (let i = 0; i < entities.length; i++) {
        const eid = entities[i];
        let x = a.value[eid];
        a.value[eid] = b.value[eid];
        b.value[eid] = x;
      }
    },
  });

  world.registerSystem({
    name: "CD",
    components: ["C", "D"],
    update: (c, d) => (entities) => {
      for (let i = 0; i < entities.length; i++) {
        const eid = entities[i];
        let x = c.value[eid];
        c.value[eid] = d.value[eid];
        d.value[eid] = x;
      }
    },
  });

  world.registerSystem({
    name: "CE",
    components: ["C", "E"],
    update: (c, e) => (entities) => {
      for (let i = 0; i < entities.length; i++) {
        const eid = entities[i];
        let x = c.value[eid];
        c.value[eid] = e.value[eid];
        e.value[eid] = x;
      }
    },
  });

  for (let i = 0; i < count; i++) {
    let e1 = world.addEntity();
    world.addComponent("A", e1, { value: 0 });
    world.addComponent("B", e1, { value: 1 });

    let e2 = world.addEntity();
    world.addComponent("A", e2, { value: 0 });
    world.addComponent("B", e2, { value: 1 });
    world.addComponent("C", e2, { value: 2 });

    let e3 = world.addEntity();
    world.addComponent("A", e3, { value: 0 });
    world.addComponent("B", e3, { value: 1 });
    world.addComponent("C", e3, { value: 2 });
    world.addComponent("D", e3, { value: 3 });

    let e4 = world.addEntity();
    world.addComponent("A", e4, { value: 0 });
    world.addComponent("B", e4, { value: 1 });
    world.addComponent("C", e4, { value: 2 });
    world.addComponent("E", e4, { value: 4 });
  }

  return () => {
    world.step();
  };
};
