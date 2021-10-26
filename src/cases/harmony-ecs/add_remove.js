import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.int32);
  const B = Schema.makeBinary(world, Format.int32);
  const qa = Query.make(world, [A], Query.not([B]));
  const qab = Query.make(world, [A, B]);

  for (let i = 0; i < count; i++) {
    Entity.make(world, [A]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e] = qa[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.set(world, e[j], [B]);
      }
    }
    for (let i = 0; i < qab.length; i++) {
      const [e] = qab[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.unset(world, e[j], [B]);
      }
    }
  };
};
