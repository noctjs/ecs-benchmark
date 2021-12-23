# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       | 123,999 op/s | 118,951 op/s |  51,516 op/s |  94,653 op/s |     269 op/s |  14,225 op/s |
| bitecs      | 434,469 op/s | 429,215 op/s | 176,029 op/s | 567,812 op/s |   1,043 op/s |   4,006 op/s |
| ecsy        |  21,146 op/s |  11,244 op/s |   6,851 op/s |  28,666 op/s |      52 op/s |   1,319 op/s |
| geotic      |  61,863 op/s |  71,653 op/s |  52,234 op/s |  59,168 op/s |      46 op/s |   1,367 op/s |
| goodluck    |  82,030 op/s |  78,068 op/s |  55,714 op/s | 120,164 op/s |  22,974 op/s | 488,034 op/s |
| harmony-ecs | 467,302 op/s | 442,276 op/s | 255,896 op/s | 697,671 op/s |   3,356 op/s |   6,520 op/s |
| javelin-ecs |  83,788 op/s |  82,870 op/s |  94,569 op/s | 138,895 op/s |     467 op/s |   5,046 op/s |
| perform-ecs |  75,420 op/s |  85,416 op/s | 132,313 op/s |  43,410 op/s |      68 op/s |     630 op/s |
| picoes      |  42,467 op/s |  11,540 op/s |   7,542 op/s |  18,535 op/s |   1,878 op/s |   6,170 op/s |
| tiny-ecs    |  31,270 op/s |  27,891 op/s |  53,389 op/s |  61,539 op/s |      74 op/s |   1,300 op/s |
| uecs        |  59,538 op/s |  53,452 op/s |  25,691 op/s |  19,715 op/s |   1,261 op/s |   9,474 op/s |
| wolf-ecs    | 464,820 op/s | 451,553 op/s | 239,341 op/s | 681,642 op/s |   5,777 op/s |  18,559 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v16.3.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`harmony-ecs`](https://github.com/3mcd/harmony-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
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
- **Test:**
  - Iterate through all entities with a `Data` component and double its value.
  - Iterate through all entities with a `Z` component and double its value.

### Entity Cycle

This benchmark is designed to test the base cost of constructing and destroying entities into the ECS.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, and create 2 entities with a `B` component. Then iterate through all entities with a `B` component and destroy them.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
