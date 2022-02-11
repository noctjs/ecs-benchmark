import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").forEach((component) => {
    for (let i = 0; i < count; i++) {
      ecs.addEntity({ [component]: 1, Data: 1 });
    }
  });

  ecs.flush();

  const withZ = ecs.archetype("Z");
  const withData = ecs.archetype("Data");

  return () => {
    for (const entity of ecs.get(withZ)) {
      entity.Z *= 2;
    }

    for (const entity of ecs.get(withData)) {
      entity.Data *= 2;
    }
  };
};
