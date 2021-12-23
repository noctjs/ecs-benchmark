# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       |  80,229 op/s |  97,223 op/s |  28,243 op/s |  58,684 op/s |     334 op/s |   8,897 op/s |
| bitecs      | 264,851 op/s | 325,325 op/s | 113,040 op/s | 412,452 op/s |     720 op/s |   2,339 op/s |
| ecsy        |  12,972 op/s |   7,633 op/s |   4,776 op/s |  25,553 op/s |      38 op/s |   1,004 op/s |
| geotic      |  43,123 op/s |  45,559 op/s |  27,137 op/s |  48,405 op/s |      31 op/s |   1,106 op/s |
| goodluck    |  59,089 op/s |  53,043 op/s |  30,322 op/s |  71,018 op/s |  11,018 op/s | 270,375 op/s |
| harmony-ecs | 272,348 op/s | 282,760 op/s | 124,910 op/s | 411,343 op/s |   1,856 op/s |   3,284 op/s |
| javelin-ecs |  57,735 op/s |  65,574 op/s |  36,077 op/s | 110,899 op/s |     233 op/s |   2,760 op/s |
| perform-ecs |  56,320 op/s |  51,321 op/s |  89,984 op/s |  27,931 op/s |      39 op/s |     411 op/s |
| picoes      |  25,182 op/s |   6,666 op/s |   4,278 op/s |  12,657 op/s |   1,430 op/s |   4,234 op/s |
| piecs       | 363,891 op/s | 373,314 op/s | 177,388 op/s | 469,213 op/s |  33,751 op/s |  36,585 op/s |
| tiny-ecs    |  19,055 op/s |  15,190 op/s |  31,062 op/s |  39,622 op/s |      49 op/s |     972 op/s |
| uecs        |  33,979 op/s |  28,211 op/s |  13,540 op/s |   9,842 op/s |     862 op/s |   5,157 op/s |
| wolf-ecs    | 347,279 op/s | 347,273 op/s | 157,798 op/s | 537,237 op/s |   3,187 op/s |   9,778 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v17.3.0.

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
- [`piecs`](https://github.com/sondresj/piecs)
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
