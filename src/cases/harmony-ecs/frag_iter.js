import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const COMPS = 26;
  const schemas = [];
  const world = World.make(count);

  for (let i = 0; i < COMPS; i++) {
    schemas.push(Schema.makeBinary(world, Format.int32));
  }

  const Z = schemas[25];
  const Data = Schema.makeBinary(world, Format.int32);
  const qdata = Query.make(world, [Data]);
  const qz = Query.make(world, [Z]);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < COMPS; j++) {
      Entity.make(world, [schemas[j], Data]);
    }
  }

  return () => {
    for (let i = 0; i < qdata.length; i++) {
      const [e, [d]] = qdata[i];
      for (let j = 0; j < e.length; j++) {
        d[j] *= 2;
      }
    }
    for (let i = 0; i < qz.length; i++) {
      const [e, [z]] = qz[i];
      for (let j = 0; j < e.length; j++) {
        z[j] *= 2;
      }
    }
  };
};
