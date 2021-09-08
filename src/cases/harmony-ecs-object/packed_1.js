import {
  formats,
  makeEntity,
  makeQuery,
  makeSchema,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const world = makeWorld(count);
  const shape = { x: formats.float64 };
  const A = makeSchema(world, shape);
  const B = makeSchema(world, shape);
  const C = makeSchema(world, shape);
  const D = makeSchema(world, shape);
  const E = makeSchema(world, shape);
  const qa = makeQuery(world, [A]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A, B, C, D, E]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        a[j].x *= 2;
      }
    }
  };
};
