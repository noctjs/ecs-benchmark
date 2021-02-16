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
    em.create().add(new A(i));
  }

  return () => {
    for (let entity of em.query(A)) {
      let a = entity.get(A);
      em.create().add(new B(a.value));
      em.create().add(new B(a.value));
    }

    for (let entity of em.query(B)) {
      entity.destroy();
    }
  };
};
