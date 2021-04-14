# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| bitecs      | 398,843 op/s | 384,813 op/s | 221,454 op/s | 791,205 op/s |   4,407 op/s |   8,491 op/s |
| ecsy        |  18,935 op/s |   9,042 op/s |   6,105 op/s |  32,452 op/s |      42 op/s |     864 op/s |
| flock-ecs   |   5,036 op/s |   6,130 op/s |   2,283 op/s |  12,780 op/s |      95 op/s |  28,341 op/s |
| geotic      |  52,929 op/s |  74,522 op/s |  46,648 op/s |  71,527 op/s |      38 op/s |   1,043 op/s |
| goodluck    |  78,407 op/s |  77,178 op/s |  36,055 op/s | 159,210 op/s |  17,637 op/s | 116,252 op/s |
| javelin-ecs | 101,249 op/s |  94,856 op/s |  74,556 op/s | 167,545 op/s |     375 op/s |   3,318 op/s |
| makr        |  17,636 op/s |  14,125 op/s |   9,427 op/s |  35,799 op/s |  13,237 op/s |  30,274 op/s |
| perform-ecs |  95,183 op/s |  94,492 op/s | 119,659 op/s |  40,631 op/s |      55 op/s |     460 op/s |
| picoes      |  31,345 op/s |   9,557 op/s |   5,778 op/s |  17,167 op/s |   1,596 op/s |   5,011 op/s |
| tiny-ecs    |  27,960 op/s |  26,597 op/s |  38,677 op/s |  68,370 op/s |      56 op/s |   1,092 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v15.12.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`makr`](https://github.com/makrjs/makr)
- [`perform-ecs`](https://github.com/fireveined/perform-ecs)
- [`picoes`](https://github.com/ayebear/picoes)
- [`tiny-ecs`](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Packed Iteration (1 query)

This benchmark is designed to test the core overheads involved in component iteration in best-case conditions.

- **Dataset:** 5,000 entities, each with `(A, B, C, D, E)` components.
- **Test:** Iterate through all entities with `A` and double its value.

### Packed Iteration (5 queries)

This benchmark is designed to test the core overheads involved in component iteration when multiple queries are run. The results are expected to match the ones from _Packed Iteration (1 query)_.

- **Dataset:** 1,000 entities, each with `(A, B, C, D, E)` components.
- **Test:**
  - Iterate through all entities with `A` and double its value.
  - Iterate through all entities with `B` and double its value.
  - Iterate through all entities with `C` and double its value.
  - Iterate through all entities with `D` and double its value.
  - Iterate through all entities with `E` and double its value.

### Simple Iteration

This benchmark is designed to test how efficiently the ECS can run multiple independent systems.

- **Dataset:**
  - 1,000 entities with `(A, B)` components
  - 1,000 entities with `(A, B, C)` components
  - 1,000 entities with `(A, B, C, D)` components
  - 1,000 entities with `(A, B, C, E)` components
- **Test:** Three systems accessing the following components, where each system swaps the values stored in each component:
  - `(A, B)`
  - `(C, D)`
  - `(C, E)`

### Fragmented Iteration

This benchmark is designed to test how the ECS handles iteration through a fragmented dataset.

- **Dataset:** 26 component types (`A` through `Z`), each with 100 entities plus a `Data` component.
- **Test:** Iterate through all entities with a `Data` component and double its value.

### Entity Cycle

This benchmark is designed to test the base cost of constructing and destroying entities into the ECS.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, and create 2 entities with a `B` component. Then iterate through all entities with a `B` component and destroy them.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
