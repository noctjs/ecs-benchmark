import { World } from "picoes";

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    world.entity().set("a", 0);
  }

  return () => {
    world.each("a", (_, entity) => {
      entity.set("b", 0);
    });

    world.each("b", (_, entity) => {
      entity.remove("b");
    });
  };
};
