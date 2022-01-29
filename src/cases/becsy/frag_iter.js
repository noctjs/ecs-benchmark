import { System, Type, World } from "@lastolivegames/becsy/perf.js";

export default async (count) => {
  const COMPS = Array.from(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    () =>
      class {
        static schema = {
          value: Type.int32,
        };
      }
  );

  const Z = COMPS[25];

  class Data {
    static schema = {
      value: Type.int32,
    };
  }

  class DataSystem extends System {
    entities = this.query((q) => q.current.with(Data).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(Data).value *= 2;
      }
    }
  }

  class ZSystem extends System {
    entities = this.query((q) => q.current.with(Z).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(Z).value *= 2;
      }
    }
  }

  const world = await World.create({
    maxEntities: count * COMPS.length,
    defs: [COMPS, Data, DataSystem, ZSystem],
  });

  for (let i = 0; i < count; i++) {
    for (const Comp of COMPS) {
      world.createEntity(Comp, { value: 0 }, Data, { value: 0 });
    }
  }

  return () => {
    world.execute();
  };
};
