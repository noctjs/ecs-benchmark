const EntComp = require("./cases/ent-comp");
const makr = require("./cases/makr");
const ModECS = require("./cases/modecs");
const PerformECS = require("./cases/perform-ecs");
const PicoES = require("./cases/picoes");
const TinyECS = require("./cases/tiny-ecs");
const JakeklassenECS = require("./cases/jakeklassen-ecs");
const suite = require("./suite");

const NUM_ENTITIES = 1000;

suite(`Create and delete (entities: ${4 * NUM_ENTITIES})`)
  .add("makr", makr.bench_create_delete(NUM_ENTITIES))
  .add("ModECS", ModECS.bench_create_delete(NUM_ENTITIES))
  .add("Perform-ECS", PerformECS.bench_create_delete(NUM_ENTITIES))
  .add("PicoES", PicoES.bench_create_delete(NUM_ENTITIES))
  .add("TinyECS", TinyECS.bench_create_delete(NUM_ENTITIES))
  .add("ent-comp", EntComp.bench_create_delete(NUM_ENTITIES))
  .add("@jakeklassen/ecs", JakeklassenECS.bench_create_delete(NUM_ENTITIES))
  .run();

suite(`Update (entities: ${4 * NUM_ENTITIES}, queries: 3)`)
  .add("ent-comp", EntComp.bench_update(NUM_ENTITIES))
  .add("makr", makr.bench_update(NUM_ENTITIES))
  .add("ModECS", ModECS.bench_update(NUM_ENTITIES))
  .add("Perform-ECS", PerformECS.bench_update(NUM_ENTITIES))
  .add("PicoES", PicoES.bench_update(NUM_ENTITIES))
  .add("TinyECS", TinyECS.bench_update(NUM_ENTITIES))
  .add("@jakeklassen/ecs", JakeklassenECS.bench_update(NUM_ENTITIES))
  .run();
