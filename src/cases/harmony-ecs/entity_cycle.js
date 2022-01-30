import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.float64);
  const B = Schema.makeBinary(world, Format.float64);
  const qa = Query.make(world, [A]);
  const qb = Query.make(world, [B]);
  const type = [B];

  for (let i = 0; i < count; i++) {
    Entity.make(world, [A], [i]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        Entity.make(world, type, [a[j]]);
      }
    }
    for (let i = 0; i < qb.length; i++) {
      const [e] = qb[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.destroy(world, e[j], B);
      }
    }
  };
};
