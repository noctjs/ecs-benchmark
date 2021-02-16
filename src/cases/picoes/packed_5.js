import { World } from "picoes";

function Box(value = 0) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  world.component("a", Box);
  world.component("b", Box);
  world.component("c", Box);
  world.component("d", Box);
  world.component("e", Box);

  for (let i = 0; i < count; i++) {
    world.entity().set("a", 0).set("b", 0).set("c", 0).set("d", 0).set("e", 0);
  }

  return () => {
    world.each("a", ({ a }) => {
      a.value *= 2;
    });

    world.each("b", ({ b }) => {
      b.value *= 2;
    });

    world.each("c", ({ c }) => {
      c.value *= 2;
    });

    world.each("d", ({ d }) => {
      d.value *= 2;
    });

    world.each("e", ({ e }) => {
      e.value *= 2;
    });
  };
};
