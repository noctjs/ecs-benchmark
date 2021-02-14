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

  world.registerSystem({
    name: "PACKED_B",
    components: ["B"],
    update: (b) => (eid) => {
      b.value[eid] *= 2;
    },
  });

  world.registerSystem({
    name: "PACKED_C",
    components: ["C"],
    update: (c) => (eid) => {
      c.value[eid] *= 2;
    },
  });

  world.registerSystem({
    name: "PACKED_D",
    components: ["D"],
    update: (d) => (eid) => {
      d.value[eid] *= 2;
    },
  });

  world.registerSystem({
    name: "PACKED_E",
    components: ["E"],
    update: (e) => (eid) => {
      e.value[eid] *= 2;
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
