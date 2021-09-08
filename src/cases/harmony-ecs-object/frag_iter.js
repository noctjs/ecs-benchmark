import {
  formats,
  makeEntity,
  makeQuery,
  makeSchema,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const COMPS = 26;
  const schemas = [];
  const world = makeWorld(count);
  const shape = { x: formats.float64 };

  for (let i = 0; i < COMPS; i++) {
    schemas.push(makeSchema(world, shape));
  }

  const Data = makeSchema(world, shape);
  const qdata = makeQuery(world, [Data]);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < COMPS; j++) {
      makeEntity(world, [schemas[j], Data]);
    }
  }

  return () => {
    for (let i = 0; i < qdata.length; i++) {
      const [e, [d]] = qdata[i];
      for (let j = 0; j < e.length; j++) {
        d[j].x *= 2;
      }
    }
  };
};
