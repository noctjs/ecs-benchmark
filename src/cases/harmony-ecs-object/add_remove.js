import {
  formats,
  makeEntity,
  makeQuery,
  makeSchema,
  makeWorld,
  not,
  set,
  unset,
} from "harmony-ecs";

export default (count) => {
  const world = makeWorld(count);
  const shape = { x: formats.float64 };
  const A = makeSchema(world, shape);
  const B = makeSchema(world, shape);
  const qa = makeQuery(world, [A], not([B]));
  const qab = makeQuery(world, [A, B]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e] = qa[i];
      for (let j = e.length - 1; j >= 0; j--) {
        set(world, e[j], B);
      }
    }
    for (let i = 0; i < qab.length; i++) {
      const [e] = qab[i];
      for (let j = e.length - 1; j >= 0; j--) {
        unset(world, e[j], B);
      }
    }
  };
};
