---
title: Constructor.ts
nav_order: 1
parent: Modules
---

# Overview

Collection Constructor Interface

---

<h2 class="text-delta">Table of contents</h2>

- [ConstructorCollection (interface)](#constructorcollection-interface)
- [ConstructorCollectionInput (interface)](#constructorcollectioninput-interface)
- [initConstructor (function)](#initconstructor-function)

---

# ConstructorCollection (interface)

Collection Constructor Interface

**Signature**

```ts
interface ConstructorCollection extends ConstructorCollectionInput {
  /**
   *Return An empty `Collection`
   */
  empty(): Kind<F, any>
  /**
   *Return a `Collection` of length `n` with element `i` initialized with `f(i)`
   */
  makeBy<A>(n: number, f: (i: number) => A): Kind<F, A>
  /**
   *Create an `Collection` containing a range of integers, including both endpoints
   */
  makeByRange(start: number, end: number): Kind<F, number>
  /**
   *Create an `Collection` containing a value repeated the specified number of times
   */
  makeByRepeat<A>(n: number, a: A): Kind<F, A>
}
```

Added in v0.2.0

# ConstructorCollectionInput (interface)

Collection Constructor Input Interface

**Signature**

```ts
interface ConstructorCollectionInput {
  readonly URI: F
  /**
   *Create a new `Collection` containing the values of the provided Iterable.
   */
  from: <A = never>(collection: Iterable<A>) => Kind<F, A>
}
```

Added in v0.2.0

# initConstructor (function)

Added in v0.2.0
