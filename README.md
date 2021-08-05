# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  31,365 op/s |  36,042 op/s |  20,042 op/s |  59,558 op/s |     218 op/s |  8,308 op/s |
| bitecs      | 235,089 op/s | 207,659 op/s | 115,812 op/s | 451,724 op/s |   1,302 op/s |  4,457 op/s |
| ecsy        |  12,589 op/s |   7,537 op/s |   4,609 op/s |  24,726 op/s |      35 op/s |    846 op/s |
| flock-ecs   |   3,312 op/s |   3,145 op/s |   1,738 op/s |   7,470 op/s |      94 op/s | 18,144 op/s |
| geotic      |  37,355 op/s |  41,713 op/s |  26,426 op/s |  45,248 op/s |      27 op/s |    822 op/s |
| goodluck    |  51,630 op/s |  53,048 op/s |  28,136 op/s | 100,559 op/s |  12,679 op/s | 89,410 op/s |
| javelin-ecs |  66,776 op/s |  67,414 op/s |  38,804 op/s | 103,980 op/s |     301 op/s |  3,393 op/s |
| makr        |  14,031 op/s |  10,264 op/s |   7,241 op/s |  27,371 op/s |  10,812 op/s | 27,231 op/s |
| perform-ecs |  56,882 op/s |  58,701 op/s |  77,554 op/s |  31,243 op/s |      35 op/s |    314 op/s |
| picoes      |  26,502 op/s |   7,274 op/s |   4,518 op/s |  15,414 op/s |   1,372 op/s |  4,061 op/s |
| tiny-ecs    |  19,935 op/s |  17,047 op/s |  29,792 op/s |  50,206 op/s |      45 op/s |  1,010 op/s |
| wolf-ecs    | 313,292 op/s | 279,654 op/s | 156,069 op/s | 529,318 op/s |   5,256 op/s | 23,150 op/s |

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
