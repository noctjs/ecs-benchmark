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
- [js13k-ecs](https://github.com/kutuluk/js13k-ecs)
- [makr](https://github.com/makrjs/makr)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 111 op/s (±2.15%)
  bitecs: 98 op/s (±0.61%)
  ecsy: 105 op/s (±2.23%)
  ent-comp: 77 op/s (±2.74%)
  flock-ecs: 79 op/s (±19.40%)
  geotic: 63 op/s (±4.27%)
  goodluck: 1,665 op/s (±6.60%)
  js13k-ecs: 70 op/s (±1.48%)
  makr: 3,112 op/s (±1.59%)
  perform-ecs: 366 op/s (±1.66%)
  picoes: 134 op/s (±4.97%)
  tiny-ecs: 93 op/s (±1.86%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,006 op/s (±3.27%)
  bitecs: 42,784 op/s (±7.28%)
  ecsy: 1,506 op/s (±5.13%)
  ent-comp: 44,785 op/s (±7.42%)
  flock-ecs: 1,933 op/s (±2.89%)
  geotic: 18,772 op/s (±1.25%)
  goodluck: 22,509 op/s (±1.56%)
  js13k-ecs: 10,814 op/s (±3.40%)
  makr: 8,446 op/s (±1.25%)
  perform-ecs: 43,760 op/s (±0.61%)
  picoes: 1,174 op/s (±1.11%)
  tiny-ecs: 36,374 op/s (±7.96%)
```
