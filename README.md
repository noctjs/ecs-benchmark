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
- [bitecs](https://github.com/NateTheGreatt/bitecs)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 132 op/s (±2.82%)
  ecsy: 166 op/s (±1.69%)
  ent-comp: 92 op/s (±1.21%)
  flock-ecs: 76 op/s (±20.44%)
  goodluck: 159 op/s (±0.65%)
  makr: 4,074 op/s (±0.83%)
  bitecs: 107 op/s (±0.96%)
  perform-ecs: 417 op/s (±1.50%)
  picoes: 155 op/s (±4.72%)
  tiny-ecs: 110 op/s (±1.68%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,891 op/s (±0.46%)
  ecsy: 416 op/s (±0.46%)
  ent-comp: 53,680 op/s (±12.06%)
  flock-ecs: 2,257 op/s (±2.17%)
  goodluck: 46,264 op/s (±0.59%)
  makr: 11,468 op/s (±0.66%)
  bitecs: 71,343 op/s (±10.32%)
  perform-ecs: 58,354 op/s (±0.36%)
  picoes: 1,206 op/s (±0.68%)
  tiny-ecs: 45,683 op/s (±12.74%)
```
