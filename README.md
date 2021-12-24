# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

| op/s        | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | -------: | ----------: | --------: | -----------: | ---------: |
| becsy       |   80,229 |   97,223 |      28,243 |    58,684 |         334  |      8,897 |
| bitecs      |  264,851 |  325,325 |     113,040 |   412,452 |         720  |      2,339 |
| ecsy        |   12,972 |    7,633 |       4,776 |    25,553 |          38  |      1,004 |
| geotic      |   43,123 |   45,559 |      27,137 |    48,405 |          31  |      1,106 |
| goodluck    |   59,089 |   53,043 |      30,322 |    71,018 |      11,018  |    270,375 |
| harmony-ecs |  272,348 |  282,760 |     124,910 |   411,343 |       1,856  |      3,284 |
| javelin-ecs |   57,735 |   65,574 |      36,077 |   110,899 |         233  |      2,760 |
| perform-ecs |   56,320 |   51,321 |      89,984 |    27,931 |          39  |        411 |
| picoes      |   25,182 |    6,666 |       4,278 |    12,657 |       1,430  |      4,234 |
| piecs       |  363,891 |  373,314 |     177,388 |   469,213 |      33,751  |     36,585 |
| tiny-ecs    |   19,055 |   15,190 |      31,062 |    39,622 |          49  |        972 |
| uecs        |   33,979 |   28,211 |      13,540 |     9,842 |         862  |      5,157 |
| wolf-ecs    |  347,279 |  347,273 |     157,798 |   537,237 |       3,187  |      9,778 |

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
