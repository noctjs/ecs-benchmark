# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| becsy       |  84,273 op/s |  76,489 op/s |  54,115 op/s | 153,480 op/s |   1,896 op/s | 11,223 op/s |
| bitecs      | 234,608 op/s | 218,055 op/s | 133,733 op/s | 452,260 op/s |   1,266 op/s |  3,988 op/s |
| ecsy        |   9,601 op/s |   7,080 op/s |   3,079 op/s |  23,755 op/s |      31 op/s |    718 op/s |
| flock-ecs   |   3,742 op/s |   4,606 op/s |   1,822 op/s |   7,866 op/s |      82 op/s | 18,164 op/s |
| geotic      |  34,400 op/s |  43,287 op/s |  27,159 op/s |  46,498 op/s |      29 op/s |    914 op/s |
| goodluck    |  46,008 op/s |  53,443 op/s |  27,988 op/s | 102,591 op/s |  13,634 op/s | 92,730 op/s |
| javelin-ecs |  67,306 op/s |  66,801 op/s |  39,770 op/s | 114,093 op/s |     285 op/s |  3,274 op/s |
| makr        |  13,253 op/s |  10,086 op/s |   7,135 op/s |  25,167 op/s |  10,752 op/s | 26,686 op/s |
| perform-ecs |  59,418 op/s |  59,047 op/s |  73,860 op/s |  27,874 op/s |      40 op/s |    374 op/s |
| picoes      |  26,304 op/s |   6,886 op/s |   4,065 op/s |  12,619 op/s |   1,425 op/s |  3,576 op/s |
| tiny-ecs    |  15,788 op/s |  14,873 op/s |  26,729 op/s |  43,586 op/s |      39 op/s |    880 op/s |
| wolf-ecs    | 317,003 op/s | 314,997 op/s | 151,010 op/s | 517,377 op/s |   4,019 op/s | 19,486 op/s |

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
