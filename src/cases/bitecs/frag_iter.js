import bitECS from "bitecs";

const COMPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default (count) => {
  let world = bitECS({ maxEntities: count * COMPS.length });

  for (let COMP of COMPS) {
    world.registerComponent(COMP, { value: "int32" });
  }

  world.registerComponent("DATA", { value: "int32" });
  world.registerSystem({
    name: "DATA",
    components: ["DATA"],
    update: (data) => (entities) => {
      for (let i = 0; i < entities.length; i++) {
        const eid = entities[i];
        data.value[eid] *= 2;
      }
    },
  });

  for (let i = 0; i < count; i++) {
    for (let COMP of COMPS) {
      let e = world.addEntity();
      world.addComponent(COMP, e, { value: 0 });
      world.addComponent("DATA", e, { value: 0 });
    }
  }

  return () => {
    world.step();
  };
};
