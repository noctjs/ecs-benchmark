import { System, Type, World } from "@lastolivegames/becsy/perf.js";

export default (count) => {

  const COMPS = Array.from(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    () =>
      class {
        static schema = {
          value: Type.int32
        };
      }
  );

  class Data {
    static schema = {
      value: Type.int32
    };
  }

  class DataSystem extends System {
    entities = this.query(q => q.all.with(Data).write);

    execute() {
      for (const entity of this.entities.all) {
        entity.write(Data).value *= 2;
      }
    }
  }

  const world = new World({
    maxEntities: count * COMPS.length,
    defs: [COMPS, Data, DataSystem]
  });

  for (let i = 0; i < count; i++) {
    for (const Comp of COMPS) {
      world.createEntity(Comp, {value: 0}, Data, {value: 0});
    }
  }

  return () => {
    world.execute();
  };
};
