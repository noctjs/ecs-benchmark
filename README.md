# ECS benchmark comparison

- [Adding and deleting entities](#adding-and-deleting-entities)
- [Iterating over entities](#iterating-over-entities)

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
- [bitecs](https://github.com/NateTheGreatt/bitecs)
- [ecsy](https://github.com/ecsyjs/ecsy)
- [ent-comp](https://github.com/andyhall/ent-comp)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [geotic](https://github.com/ddmills/geotic)
- [goodluck](https://github.com/piesku/goodluck)
- [makr](https://github.com/makrjs/makr)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

The benchmarks are run on node v15.8.0.

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 92 op/s (±3.00%)
  bitecs: 324 op/s (±1.38%)
  ecsy: 89 op/s (±2.01%)
  ent-comp: 69 op/s (±1.70%)
  flock-ecs: 71 op/s (±20.99%)
  geotic: 57 op/s (±2.13%)
  goodluck: 1,491 op/s (±6.17%)
  makr: 2,975 op/s (±0.53%)
  perform-ecs: 353 op/s (±0.64%)
  picoes: 119 op/s (±4.28%)
  tiny-ecs: 81 op/s (±1.70%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,165 op/s (±4.22%)
  bitecs: 41,950 op/s (±7.81%)
  ecsy: 1,963 op/s (±1.58%)
  ent-comp: 42,141 op/s (±10.58%)
  flock-ecs: 1,842 op/s (±2.79%)
  geotic: 21,873 op/s (±1.03%)
  goodluck: 23,985 op/s (±1.27%)
  makr: 9,071 op/s (±0.60%)
  perform-ecs: 44,368 op/s (±0.56%)
  picoes: 1,173 op/s (±1.78%)
  tiny-ecs: 37,374 op/s (±7.16%)
```
