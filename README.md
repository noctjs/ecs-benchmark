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
  @jakeklassen/ecs: 113 op/s (±2.09%)
  bitecs: 357 op/s (±1.27%)
  ecsy: 112 op/s (±2.43%)
  ent-comp: 80 op/s (±2.70%)
  flock-ecs: 82 op/s (±17.38%)
  geotic: 62 op/s (±3.72%)
  goodluck: 1,741 op/s (±5.00%)
  makr: 3,288 op/s (±1.28%)
  perform-ecs: 387 op/s (±1.01%)
  picoes: 141 op/s (±4.35%)
  tiny-ecs: 104 op/s (±2.21%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,302 op/s (±2.21%)
  bitecs: 52,558 op/s (±10.30%)
  ecsy: 1,893 op/s (±2.32%)
  ent-comp: 41,522 op/s (±11.30%)
  flock-ecs: 1,858 op/s (±3.30%)
  geotic: 20,670 op/s (±0.79%)
  goodluck: 24,296 op/s (±1.00%)
  makr: 9,218 op/s (±0.47%)
  perform-ecs: 44,321 op/s (±0.72%)
  picoes: 1,157 op/s (±2.11%)
  tiny-ecs: 37,291 op/s (±7.64%)
```
