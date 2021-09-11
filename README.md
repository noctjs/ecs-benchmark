# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  28,991 op/s |  28,955 op/s |  18,195 op/s |  68,419 op/s |     224 op/s |  8,580 op/s |
| bitecs      | 211,808 op/s | 200,276 op/s | 111,841 op/s | 392,767 op/s |   1,056 op/s |  4,016 op/s |
| ecsy        |  13,474 op/s |   7,442 op/s |   4,928 op/s |  25,914 op/s |      30 op/s |    835 op/s |
| flock-ecs   |   3,810 op/s |   3,638 op/s |   1,695 op/s |   7,531 op/s |      90 op/s | 18,575 op/s |
| geotic      |  36,293 op/s |  43,565 op/s |  28,492 op/s |  48,515 op/s |      27 op/s |    956 op/s |
| goodluck    |  42,553 op/s |  51,312 op/s |  28,935 op/s | 103,808 op/s |  12,945 op/s | 87,892 op/s |
| javelin-ecs |  74,950 op/s |  67,306 op/s |  34,544 op/s | 112,038 op/s |     278 op/s |  3,133 op/s |
| makr        |  13,584 op/s |  10,102 op/s |   7,274 op/s |  25,681 op/s |  10,875 op/s | 27,278 op/s |
| perform-ecs |  54,800 op/s |  58,672 op/s |  73,878 op/s |  30,777 op/s |      37 op/s |    407 op/s |
| picoes      |  25,502 op/s |   7,486 op/s |   4,576 op/s |  15,819 op/s |   1,384 op/s |  4,297 op/s |
| tiny-ecs    |  20,202 op/s |  17,068 op/s |  29,495 op/s |  47,007 op/s |      49 op/s |    969 op/s |
| uecs        |  33,851 op/s |  31,990 op/s |  15,546 op/s |  67,026 op/s |     892 op/s |  5,262 op/s |
| wolf-ecs    | 332,510 op/s | 295,930 op/s | 176,768 op/s | 615,459 op/s |   3,001 op/s | 12,090 op/s |

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
