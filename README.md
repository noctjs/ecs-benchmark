# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  84,482 op/s |  77,909 op/s |  54,912 op/s | 156,926 op/s |   1,961 op/s | 11,675 op/s |
| bitecs      | 231,640 op/s | 217,145 op/s | 127,749 op/s | 420,728 op/s |   1,530 op/s |  3,865 op/s |
| ecsy        |  12,771 op/s |   6,915 op/s |   3,586 op/s |  23,624 op/s |      33 op/s |    752 op/s |
| flock-ecs   |   3,220 op/s |   4,691 op/s |   1,808 op/s |   7,618 op/s |      90 op/s | 17,701 op/s |
| geotic      |  34,343 op/s |  41,862 op/s |  27,224 op/s |  47,109 op/s |      30 op/s |    932 op/s |
| goodluck    |  48,187 op/s |  53,662 op/s |  26,069 op/s | 105,757 op/s |  13,547 op/s | 92,590 op/s |
| javelin-ecs |  66,177 op/s |  64,082 op/s |  39,973 op/s | 110,034 op/s |     315 op/s |  3,344 op/s |
| makr        |  11,862 op/s |  10,369 op/s |   7,051 op/s |  25,773 op/s |  10,906 op/s | 27,203 op/s |
| perform-ecs |  58,727 op/s |  58,994 op/s |  73,300 op/s |  28,323 op/s |      39 op/s |    372 op/s |
| picoes      |  25,780 op/s |   6,902 op/s |   4,092 op/s |  14,432 op/s |   1,478 op/s |  4,257 op/s |
| tiny-ecs    |  19,737 op/s |  18,779 op/s |  29,083 op/s |  44,308 op/s |      46 op/s |    962 op/s |
| wolf-ecs    | 323,647 op/s | 323,329 op/s | 157,717 op/s | 532,047 op/s |   4,540 op/s | 21,882 op/s |

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
