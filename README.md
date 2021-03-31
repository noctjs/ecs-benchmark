# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| bitecs      | 348,080 op/s | 313,344 op/s | 194,103 op/s | 668,794 op/s |   3,322 op/s |  6,309 op/s |
| ecsy        |  11,324 op/s |   6,218 op/s |   4,566 op/s |  23,978 op/s |      28 op/s |    705 op/s |
| flock-ecs   |   3,584 op/s |   4,531 op/s |   1,588 op/s |   7,452 op/s |      88 op/s | 19,139 op/s |
| geotic      |  40,668 op/s |  46,973 op/s |  27,485 op/s |  47,237 op/s |      30 op/s |    853 op/s |
| goodluck    |  52,052 op/s |  52,954 op/s |  29,037 op/s | 111,839 op/s |  13,884 op/s | 89,526 op/s |
| javelin-ecs |  78,667 op/s |  55,237 op/s |  41,673 op/s | 124,992 op/s |     330 op/s |  3,441 op/s |
| makr        |  13,483 op/s |  11,180 op/s |   6,900 op/s |  26,212 op/s |  10,364 op/s | 27,469 op/s |
| perform-ecs |  57,223 op/s |  58,849 op/s |  75,751 op/s |  29,045 op/s |      38 op/s |    324 op/s |
| picoes      |   3,835 op/s |   2,704 op/s |   1,893 op/s |   5,477 op/s |   1,038 op/s |  2,650 op/s |
| tiny-ecs    |  19,493 op/s |  18,211 op/s |  28,154 op/s |  49,216 op/s |      39 op/s |    854 op/s |

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
