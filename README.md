# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       |  51,190 op/s |  50,086 op/s |  31,206 op/s | 112,899 op/s |     265 op/s |  15,600 op/s |
| bitecs      | 298,655 op/s | 277,278 op/s | 165,247 op/s | 582,927 op/s |   2,175 op/s |   6,287 op/s |
| ecsy        |  21,736 op/s |  11,502 op/s |   7,624 op/s |  37,010 op/s |      51 op/s |   1,135 op/s |
| flock-ecs   |   6,444 op/s |   6,667 op/s |   3,442 op/s |  15,968 op/s |      82 op/s |  34,906 op/s |
| geotic      |  63,373 op/s |  75,198 op/s |  52,179 op/s |  61,011 op/s |      45 op/s |   1,366 op/s |
| goodluck    |  78,374 op/s |  78,026 op/s |  47,739 op/s | 152,774 op/s |  23,435 op/s | 156,170 op/s |
| harmony-ecs | 470,681 op/s | 459,190 op/s | 257,990 op/s | 737,658 op/s |   3,338 op/s |  19,106 op/s |
| javelin-ecs |  84,780 op/s |  84,259 op/s |  94,732 op/s | 147,187 op/s |     471 op/s |   4,619 op/s |
| makr        |  23,137 op/s |  17,981 op/s |  12,956 op/s |  46,582 op/s |  17,151 op/s |  42,759 op/s |
| perform-ecs |  76,504 op/s |  86,067 op/s | 150,647 op/s |  43,888 op/s |      68 op/s |     619 op/s |
| picoes      |  41,597 op/s |  11,636 op/s |   7,523 op/s |  22,980 op/s |   1,951 op/s |   6,609 op/s |
| tiny-ecs    |  32,023 op/s |  29,886 op/s |  53,893 op/s |  64,815 op/s |      74 op/s |   1,308 op/s |
| wolf-ecs    | 465,165 op/s | 453,973 op/s | 241,026 op/s | 803,376 op/s |   5,830 op/s |  20,498 op/s |

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
