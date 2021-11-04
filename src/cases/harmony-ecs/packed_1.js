import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.float64);
  const B = Schema.makeBinary(world, Format.float64);
  const C = Schema.makeBinary(world, Format.float64);
  const D = Schema.makeBinary(world, Format.float64);
  const E = Schema.makeBinary(world, Format.float64);
  const qa = Query.make(world, [A]);

  for (let i = 0; i < count; i++) {
    Entity.make(world, [A, B, C, D, E]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        a[j] *= 2;
      }
    }
  };
};
