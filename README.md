# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

| op/s        | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | -------: | ----------: | --------: | -----------: | ---------: |
| becsy       |   74,770 |   95,250 |      25,063 |    57,351 |          331 |      7,654 |
| bitecs      |  246,659 |  323,070 |      99,514 |   424,033 |          779 |      2,244 |
| ecsy        |   13,118 |    7,324 |       3,019 |    19,249 |           29 |        935 |
| geotic      |   34,457 |   42,450 |      27,108 |    46,177 |           27 |      1,003 |
| goodluck    |   51,415 |   50,686 |      28,581 |    64,490 |       10,824 |    288,178 |
| harmony-ecs |  296,847 |  301,924 |     124,312 |   470,393 |        1,941 |      4,056 |
| javelin-ecs |   58,029 |   65,504 |      34,660 |    99,843 |          253 |      2,866 |
| perform-ecs |   55,740 |   53,823 |      72,235 |    29,529 |           39 |        381 |
| picoes      |   25,450 |    6,162 |       4,149 |    10,019 |        1,315 |      3,938 |
| piecs       |  302,328 |  350,606 |     174,518 |   401,037 |       32,910 |     17,881 |
| tiny-ecs    |   16,563 |   16,102 |      30,010 |    44,251 |           45 |        926 |
| uecs        |   33,597 |   28,129 |      12,418 |     8,734 |          849 |      5,015 |
| wolf-ecs    |  330,019 |  353,396 |     156,575 |   486,199 |        3,005 |     10,262 |

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
