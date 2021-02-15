import bitECS from "bitecs";

export default (count) => {
  let world = bitECS();

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
    const { A, B, C, D, E } = world.registry.components
    for (let i = 0; i < packed_a.localEntities.length; i++) {
      let eid = packed_a.localEntities[i]
      A.value[eid] *= 2;
    }
    for (let i = 0; i < packed_b.localEntities.length; i++) {
      let eid = packed_b.localEntities[i]
      B.value[eid] *= 2;
    }
    for (let i = 0; i < packed_c.localEntities.length; i++) {
      let eid = packed_c.localEntities[i]
      C.value[eid] *= 2;
    }
    for (let i = 0; i < packed_d.localEntities.length; i++) {
      let eid = packed_d.localEntities[i]
      D.value[eid] *= 2;
    }
    for (let i = 0; i < packed_e.localEntities.length; i++) {
      let eid = packed_e.localEntities[i]
      E.value[eid] *= 2;
    }
  };
};
