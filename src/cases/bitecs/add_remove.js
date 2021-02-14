import bitECS from "bitecs";

export default (count) => {
  let world = bitECS();

  world.registerComponent("A", { value: "int32" });
  world.registerComponent("B", { value: "int32" });

  world.registerSystem({
    name: "ADD_B",
    components: ["A"],
    update: () => (eid) => {
      world.addComponent("B", eid, { value: 0 });
    },
  });

  world.registerSystem({
    name: "REM_B",
    components: ["B"],
    update: () => (eid) => {
      world.removeComponent("B", eid);
    },
  });

  for (let i = 0; i < count; i++) {
    let eid = world.addEntity();
    world.addComponent("A", eid, { value: 0 });
  }

  return () => {
    world.step();
  };
};
