# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  30,675 op/s |  34,081 op/s |  20,510 op/s |  72,589 op/s |     221 op/s |  8,986 op/s |
| bitecs      | 266,696 op/s | 338,227 op/s | 127,762 op/s | 514,527 op/s |     677 op/s |  2,584 op/s |
| ecsy        |  13,749 op/s |   6,709 op/s |   3,158 op/s |  24,386 op/s |      32 op/s |    742 op/s |
| flock-ecs   |   3,612 op/s |   3,906 op/s |   1,508 op/s |   7,366 op/s |      81 op/s | 18,705 op/s |
| geotic      |  38,504 op/s |  45,366 op/s |  27,218 op/s |  50,565 op/s |      29 op/s |  1,007 op/s |
| goodluck    |  62,091 op/s |  58,892 op/s |  37,499 op/s | 107,384 op/s |  13,696 op/s | 91,853 op/s |
| javelin-ecs |  76,104 op/s |  69,740 op/s |  36,918 op/s | 124,824 op/s |     327 op/s |  3,205 op/s |
| makr        |  14,118 op/s |  10,569 op/s |   7,373 op/s |  26,455 op/s |  11,269 op/s | 27,373 op/s |
| perform-ecs |  58,015 op/s |  60,366 op/s |  76,008 op/s |  30,932 op/s |      37 op/s |    427 op/s |
| picoes      |  26,849 op/s |   7,362 op/s |   4,710 op/s |  16,269 op/s |   1,330 op/s |  4,122 op/s |
| tiny-ecs    |  19,776 op/s |  17,681 op/s |  30,650 op/s |  43,464 op/s |      46 op/s |  1,017 op/s |
| uecs        |  32,918 op/s |  27,437 op/s |  14,171 op/s |  64,666 op/s |     841 op/s |  5,309 op/s |
| wolf-ecs    | 352,294 op/s | 305,495 op/s | 163,904 op/s | 536,748 op/s |   3,237 op/s | 12,717 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v16.3.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`makr`](https://github.com/makrjs/makr)
- [`perform-ecs`](https://github.com/fireveined/perform-ecs)
- [`picoes`](https://github.com/ayebear/picoes)
- [`tiny-ecs`](https://github.com/bvalosek/tiny-ecs)
- [`uecs`](https://github.com/jprochazk/uecs)
- [`wolf-ecs`](https://github.com/EnderShadow8/wolf-ecs)

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
