# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  81,530 op/s |  72,749 op/s |  51,767 op/s | 155,600 op/s |   1,860 op/s | 11,467 op/s |
| bitecs      | 230,644 op/s | 202,796 op/s | 126,155 op/s | 437,654 op/s |   1,410 op/s |  3,591 op/s |
| ecsy        |  10,525 op/s |   7,025 op/s |   3,484 op/s |  21,655 op/s |      29 op/s |    697 op/s |
| flock-ecs   |   2,919 op/s |   4,242 op/s |   1,689 op/s |   7,454 op/s |      83 op/s | 17,319 op/s |
| geotic      |  32,658 op/s |  40,978 op/s |  25,714 op/s |  45,494 op/s |      27 op/s |    827 op/s |
| goodluck    |  44,763 op/s |  49,619 op/s |  23,960 op/s |  99,079 op/s |  11,594 op/s | 81,137 op/s |
| javelin-ecs |  60,103 op/s |  62,170 op/s |  36,342 op/s | 103,790 op/s |     250 op/s |  3,011 op/s |
| makr        |  11,716 op/s |   8,860 op/s |   6,396 op/s |  23,131 op/s |   9,526 op/s | 23,321 op/s |
| perform-ecs |  53,401 op/s |  51,617 op/s |  69,409 op/s |  24,572 op/s |      33 op/s |    306 op/s |
| picoes      |  22,460 op/s |   6,069 op/s |   3,799 op/s |  13,110 op/s |   1,316 op/s |  3,879 op/s |
| tiny-ecs    |  17,897 op/s |  16,248 op/s |  26,178 op/s |  41,737 op/s |      41 op/s |    834 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v15.12.0.

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
