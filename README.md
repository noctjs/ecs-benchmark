# ECS benchmark comparison

- [Adding and deleting entities](#adding-and-deleting-entities)
- [Iterating over entities](#iterating-over-entities)

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
- [ecsy](https://github.com/ecsyjs/ecsy)
- [ent-comp](https://github.com/andyhall/ent-comp)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [goodluck](https://github.com/piesku/goodluck)
- [makr](https://github.com/makrjs/makr)
- [modecs](https://github.com/NateTheGreatt/modecs)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 123 op/s (±1.83%)
  ecsy: 164 op/s (±3.53%)
  ent-comp: 86 op/s (±3.26%)
  flock-ecs: 82 op/s (±22.68%)
  goodluck: 1,930 op/s (±4.28%)
  makr: 3,492 op/s (±1.09%)
  modecs: 9 op/s (±1.04%)
  perform-ecs: 386 op/s (±0.93%)
  picoes: 134 op/s (±4.75%)
  tiny-ecs: 106 op/s (±1.59%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,415 op/s (±0.81%)
  ecsy: 1,989 op/s (±2.30%)
  ent-comp: 43,434 op/s (±9.39%)
  flock-ecs: 1,877 op/s (±2.19%)
  goodluck: 29,800 op/s (±1.08%)
  makr: 7,784 op/s (±1.55%)
  modecs: 2,491 op/s (±1.58%)
  perform-ecs: 45,783 op/s (±1.22%)
  picoes: 1,192 op/s (±1.83%)
  tiny-ecs: 43,122 op/s (±8.24%)
```
