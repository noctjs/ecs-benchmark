import bitECS from "bitecs";

export default (count) => {
  let world = bitECS();

  world.registerComponent("A", { value: "int32" });
  world.registerComponent("B", { value: "int32" });
  world.registerComponent("C", { value: "int32" });
  world.registerComponent("D", { value: "int32" });
  world.registerComponent("E", { value: "int32" });

  world.registerSystem({
    name: "PACKED_A",
    components: ["A"],
    update: (a) => (eid) => {
      a.value[eid] *= 2;
    },
  });

  for (let i = 0; i < count; i++) {
    let e = world.addEntity();
    world.addComponent("A", e, { value: 0 });
    world.addComponent("B", e, { value: 0 });
    world.addComponent("C", e, { value: 0 });
    world.addComponent("D", e, { value: 0 });
    world.addComponent("E", e, { value: 0 });
  }

  return () => {
    world.step();
  };
};
