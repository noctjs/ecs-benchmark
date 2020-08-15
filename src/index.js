const suite = require("./suite");

const NUM_ENTITIES = 1000;

const create_and_delete_suite = suite(
  `Create and delete (entities: ${4 * NUM_ENTITIES})`
);

const update_3_queries_suite = suite(
  `Update (entities: ${4 * NUM_ENTITIES}, queries: 3)`
);

add_implementation("@jakeklassen/ecs");
add_implementation("ent-comp");
add_implementation("flock-ecs");
add_implementation("makr");
add_implementation("modecs");
add_implementation("perform-ecs");
add_implementation("picoes");
add_implementation("tiny-ecs");
add_implementation("goodluck");

create_and_delete_suite.run();
update_3_queries_suite.run();

function add_implementation(pkg) {
  let name;
  if (pkg === "goodluck") {
    name = pkg;
  } else {
    let { version } = require(`${pkg}/package.json`);
    name = `${pkg}@${version}`;
  }

  let normalized_pkg = pkg.replace(/^@/, "").replace(/\//, "-");
  let impl_path = require.resolve(`./cases/${normalized_pkg}.js`);
  let impl = require(impl_path);

  create_and_delete_suite.add(name, impl.bench_create_delete(NUM_ENTITIES));
  update_3_queries_suite.add(name, impl.bench_update(NUM_ENTITIES));
}
