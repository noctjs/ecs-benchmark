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
    world.entity().set("a", 0).set("b", 1);
    world.entity().set("a", 0).set("b", 1).set("c", 2);
    world.entity().set("a", 0).set("b", 1).set("c", 2).set("d", 3);
    world.entity().set("a", 0).set("b", 1).set("c", 2).set("e", 4);
  }

  return () => {
    world.each("a", "b", ({ a, b }) => {
      let x = a.value;
      a.value = b.value;
      b.value = x;
    });

    world.each("c", "d", ({ c, d }) => {
      let x = c.value;
      c.value = d.value;
      d.value = x;
    });

    world.each("c", "e", ({ c, e }) => {
      let x = c.value;
      c.value = e.value;
      e.value = x;
    });
  };
};
