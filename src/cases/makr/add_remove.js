import makr from "makr";

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

export default (count) => {
  let em = makr(A, B);

  for (let i = 0; i < count; i++) {
    em.create().add(new A(0));
  }

  return () => {
    for (let entity of em.query(A)) {
      entity.add(new B(0));
    }

    for (let entity of em.query(B)) {
      entity.remove(B);
    }
  };
};
