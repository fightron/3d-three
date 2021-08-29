# @fightron/skeleton-three

[![build](https://github.com/fightron/skeleton-three/actions/workflows/node.js.yml/badge.svg)](https://github.com/fightron/skeleton-three/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fightron/skeleton-three.svg)](https://lgtm.com/projects/g/fightron/skeleton-three/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fightron/skeleton-three.svg)](https://lgtm.com/projects/g/fightron/skeleton-three/context:javascript)

[THREE](https://github.com/mrdoob/three.js) wrapper around [@fightron/skeleton](https://github.com/fightron/skeleton-js).

## Usage

```javascript
import { Skeleton } from '@fightron/skeleton'
import { SkeletonThreeBuilder } from '@fightron/skeleton-three'

var skeleton = new Skeleton(/* ... */)

// This will build skeleton.renderable,
// which will be a THREE.Skeleton instance
// with a collection of THREE.Bone instances.
SkeletonThreeBuilder.run(skeleton)

// After building the renderable, you can then
// manipulate the joints, and the renderable
// will be updated.
var spine = skeleton.joints.get('spine')
spine.rotationY = 0.4

// With poses:
var pose = new Pose(/* ... */)
pose.apply(skeleton)

// You can also directly manipulate the renderable:
var skeleton3 = skeleton.renderable // THREE.Skeleton
skeleton.bones[1].rotation.y = 0.4
```
