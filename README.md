# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       | 118,702 op/s | 109,875 op/s | 39,985 op/s  | 91,093 op/s  | 194 op/s     | 10,847 op/s  |
| bitecs      | 353,193 op/s | 347,264 op/s | 150,595 op/s | 485,247 op/s | 756 op/s     | 2,769 op/s   |
| ecsy        | 20,797 op/s  | 10,013 op/s  | 5,207 op/s   | 30,513 op/s  | 43 op/s      | 1,058 op/s   |
| flock-ecs   | 4,908 op/s   | 5,120 op/s   | 2,491 op/s   | 7,709 op/s   | 63 op/s      | 26,122 op/s  |
| geotic      | 55,601 op/s  | 73,514 op/s  | 45,676 op/s  | 62,414 op/s  | 37 op/s      | 1,130 op/s   |
| goodluck    | 80,443 op/s  | 78,027 op/s  | 42,853 op/s  | 116,808 op/s | 16,767 op/s  | 408,906 op/s |
| harmony-ecs | 369,856 op/s | 372,349 op/s | 208,677 op/s | 572,107 op/s | 2,591 op/s   | 14,430 op/s  |
| javelin-ecs | 86,170 op/s  | 94,223 op/s  | 77,841 op/s  | 154,307 op/s | 373 op/s     | 3,395 op/s   |
| makr        | 16,478 op/s  | 13,675 op/s  | 9,452 op/s   | 27,520 op/s  | 12,916 op/s  | 32,138 op/s  |
| perform-ecs | 81,150 op/s  | 81,790 op/s  | 114,294 op/s | 37,622 op/s  | 54 op/s      | 510 op/s     |
| picoes      | 31,788 op/s  | 9,189 op/s   | 5,856 op/s   | 13,099 op/s  | 1,550 op/s   | 4,886 op/s   |
| piecs       | 382,083 op/s | 372,615 op/s | 207,575 op/s | 516,286 op/s | 42,165 op/s  | 39,105 op/s  |
| tiny-ecs    | 26,761 op/s  | 25,864 op/s  | 42,116 op/s  | 60,721 op/s  | 62 op/s      | 1,095 op/s   |
| uecs        | 50,328 op/s  | 42,833 op/s  | 20,659 op/s  | 49,268 op/s  | 930 op/s     | 6,569 op/s   |
| wolf-ecs    | 309,806 op/s | 379,701 op/s | 196,084 op/s | 574,841 op/s | 3,722 op/s   | 14,752 op/s  |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v16.1.0 on an AMD 3800X CPU.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`harmony-ecs`](https://github.com/3mcd/harmony-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`makr`](https://github.com/makrjs/makr)
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
