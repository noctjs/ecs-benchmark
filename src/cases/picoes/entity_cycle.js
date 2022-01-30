import { World } from "picoes";

function Box(value = 0) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  world.component("a", Box);
  world.component("b", Box);

  for (let i = 0; i < count; i++) {
    world.entity().set("a", i);
  }

  return () => {
    world.each("a", (a) => {
      world.entity().set("b", a.value);
    });

    world.each("b", (_, entity) => {
      entity.destroy();
    });
  };
};
