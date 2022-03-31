import { World } from "miniplex";

export default async (count) => {
  const ecs = new World();

  Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").forEach((component) => {
    for (let i = 0; i < count; i++) {
      ecs.addEntity({ [component]: 1, Data: 1 });
    }
  });

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
