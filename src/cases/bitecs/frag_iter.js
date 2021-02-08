import bitECS from "bitecs";

const COMPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default (count) => {
  let world = bitECS();

  for (let comp of COMPS) {
    world.registerComponent(comp, { value: "int32" });
  }

  world.registerComponent("DATA", { value: "int32" });
  world.registerSystem({
    name: "DATA",
    components: ["DATA"],
    update: (data) => (eid) => {
      data.value[eid] *= 2;
    },
  });

  for (let i = 0; i < count; i++) {
    for (let comp of COMPS) {
      let e = world.addEntity();
      world.addComponent(comp, e, { value: 0 });
      world.addComponent("DATA", e, { value: 0 });
    }
  }

  return () => {
    world.step();
  };
};
