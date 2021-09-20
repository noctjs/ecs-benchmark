import makr from "makr";

function A() {}
function B() {}

export default (count) => {
  let em = makr(A, B);

  for (let i = 0; i < count; i++) {
    em.create().add(new A());
  }

  return () => {
    for (let entity of em.query(A)) {
      entity.add(new B());
    }

    for (let entity of em.query(B)) {
      entity.remove(B);
    }
  };
};
