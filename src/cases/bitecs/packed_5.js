import bitECS from "../../../../bitECS/src/index.js";

export default (count) => {
  let world = bitECS({maxEntities:5000});

  world.registerComponent("A", { value: "int32" });
  world.registerComponent("B", { value: "int32" });
  world.registerComponent("C", { value: "int32" });
  world.registerComponent("D", { value: "int32" });
  world.registerComponent("E", { value: "int32" });

  const packed_a = world.registerSystem({
    name: "PACKED_A",
    components: ["A"]
  });

  const packed_b = world.registerSystem({
    name: "PACKED_B",
    components: ["B"]
  });

  const packed_c = world.registerSystem({
    name: "PACKED_C",
    components: ["C"]
  });

  const packed_d = world.registerSystem({
    name: "PACKED_D",
    components: ["D"]
  });

  const packed_e = world.registerSystem({
    name: "PACKED_E",
    components: ["E"]
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
    for (let i = 0; i < packed_a.localEntities.length; i++) {
      world.registry.components.A.value[i] *= 2;
    }
    for (let i = 0; i < packed_b.localEntities.length; i++) {
      world.registry.components.B.value[i] *= 2;
    }
    for (let i = 0; i < packed_c.localEntities.length; i++) {
      world.registry.components.C.value[i] *= 2;
    }
    for (let i = 0; i < packed_d.localEntities.length; i++) {
      world.registry.components.D.value[i] *= 2;
    }
    for (let i = 0; i < packed_e.localEntities.length; i++) {
      world.registry.components.E.value[i] *= 2;
    }
  };
};
