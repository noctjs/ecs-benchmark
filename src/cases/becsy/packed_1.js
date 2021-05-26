import { System, Type, World } from "@lastolivegames/becsy/perf.js";


export default (count) => {
  class A {
    static schema = {
      value: Type.int32
    };
  }

  class B {
    static schema = {
      value: Type.int32
    };
  }

  class C {
    static schema = {
      value: Type.int32
    };
  }

  class D {
    static schema = {
      value: Type.int32
    };
  }

  class E {
    static schema = {
      value: Type.int32
    };
  }

  class ASystem extends System {
    entities = this.query(q => q.all.with(A).write);

    execute() {
      for (const entity of this.entities.all) {
        entity.write(A).value *= 2;
      }
    }
  }

  const world = new World({
    maxEntities: count,
    defs: [A, B, C, D, E, ASystem]
  });


  for (let i = 0; i < count; i++) {
    world.createEntity(A, B, C, D, E);
  }


  return () => {
    world.execute();
  };
};
