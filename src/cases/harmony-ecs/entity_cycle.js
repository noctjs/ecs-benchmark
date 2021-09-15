import {
  deleteEntity,
  formats,
  makeBinarySchema,
  makeEntity,
  makeQuery,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const world = makeWorld(count);
  const A = makeBinarySchema(world, formats.float64);
  const B = makeBinarySchema(world, formats.float64);
  const qa = makeQuery(world, [A]);
  const qb = makeQuery(world, [B]);
  const type = [B];

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A], [i]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        const data = [a[j]];
        makeEntity(world, type, data);
        makeEntity(world, type, data);
      }
    }
    for (let i = 0; i < qb.length; i++) {
      const [e] = qb[i];
      for (let j = e.length - 1; j >= 0; j--) {
        deleteEntity(world, e[j], B);
      }
    }
  };
};
