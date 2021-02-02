import { suite } from "./suite.js";
import * as bitecs from "./cases/bitecs.js";
import * as ecsy from "./cases/ecsy.js";
import * as ent_comp from "./cases/ent-comp.js";
import * as flock_ecs from "./cases/flock-ecs.js";
import * as geotic from "./cases/geotic.js";
import * as goodluck from "./cases/goodluck.js";
import * as jakeklassen__ecs from "./cases/jakeklassen__ecs.js";
import * as js13k_ecs from "./cases/js13k-ecs.js";
import * as makr from "./cases/makr.js";
import * as perform_ecs from "./cases/perform-ecs.js";
import * as picoes from "./cases/picoes.js";
import * as tiny_ecs from "./cases/tiny-ecs.js";

const NUM_ENTITIES = 1000;

const create_and_delete_suite = suite(
  `Create and delete (entities: ${4 * NUM_ENTITIES})`
);

const update_3_queries_suite = suite(
  `Update (entities: ${4 * NUM_ENTITIES}, queries: 3)`
);

add_implementation(jakeklassen__ecs);
add_implementation(bitecs);
add_implementation(ecsy);
add_implementation(ent_comp);
add_implementation(flock_ecs);
add_implementation(geotic);
add_implementation(goodluck);
add_implementation(js13k_ecs);
add_implementation(makr);
add_implementation(perform_ecs);
add_implementation(picoes);
add_implementation(tiny_ecs);

create_and_delete_suite.run();
update_3_queries_suite.run();

function add_implementation(mod) {
  create_and_delete_suite.add(mod.name, mod.bench_create_delete(NUM_ENTITIES));
  update_3_queries_suite.add(mod.name, mod.bench_update(NUM_ENTITIES));
}
