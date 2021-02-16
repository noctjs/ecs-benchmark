import bitECS from "bitecs";

export default (count) => {
  let world = bitECS({ maxEntities: count * 4 });

  let a = world.registerComponent("A", { value: "int32" });
  let b = world.registerComponent("B", { value: "int32" });

  world.registerSystem({
    name: "SPAWN_B",
    components: ["A"],
    update: (entities) => {
      for (let i = 0; i < entities.length; i++) {
        let value = a.value[entities[i]];
        world.addComponent("B", world.addEntity(), { value });
        world.addComponent("B", world.addEntity(), { value });
      }
    },
  });

  world.registerSystem({
    name: "KILL_B",
    components: ["B"],
    update: (entities) => {
      for (let i = 0; i < entities.length; i++) {
        world.removeEntity(entities[i]);
      }
    },
  });

  for (let i = 0; i < count; i++) {
    world.addComponent("A", world.addEntity(), { value: i });
  }

  return () => {
    world.step();
  };
};
