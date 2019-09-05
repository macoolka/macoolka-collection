---
title: Subset.ts
nav_order: 5
parent: Modules
---

# Overview

Subset Collection Interface

---

<h2 class="text-delta">Table of contents</h2>

- [Subset (interface)](#subset-interface)
- [SubsetCollectionInput (interface)](#subsetcollectioninput-interface)
- [initSubset (function)](#initsubset-function)

---

# Subset (interface)

**Signature**

```ts
interface Subset extends SubsetCollectionInput, IndexWriterCollection {
  /**
   *Returns a new Collection with 0 size and no values in constant time.
   */
  clear: <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *Get all but the last element of an list, creating a new list, or `None` if the list is empty
   */
  head<A>(as: Kind<F, A>): Option<Kind<F, A>>
  /**
   *Skip a number of elements from the start of an list, creating a new list
   */
  skipLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *Returns a new `Collection` of the same type which includes entries starting from when predicate first returns true.
   */
  skipLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *Returns a new Collection of the same type which includes entries starting from when predicate first returns false.
   */
  skipLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *Skip a number of elements from the end of an list, creating a new list
   */
  skipRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  spanLeft<A>(predicate: Predicate<A>): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }
  /**
   *Split an list into two parts:
   *1. the longest initial subarray for which all elements satisfy the specified predicate
   *2. the remaining elements
   */
  spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }
  /**
   *Splits an list into two pieces, the first piece has `n` elements.
   */
  splitAt(n: number): <A>(as: Kind<F, A>) => [Kind<F, A>, Kind<F, A>]
  /**
   *Get all but the first element of an list, creating a new list, or `None` if the list is empty
   */
  tail<A>(as: Kind<F, A>): Option<Kind<F, A>>
  /**
   *Keep only a number of elements from the start of an list, creating a new list.
   *`n` must be a natural number
   */
  takeLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *Returns a new Collection of the same type which includes entries from this Collection as long as the predicate returns false.
   */
  takeLeftUntil<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
  takeLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  takeLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *Returns a new Collection of the same type which includes entries from this Collection as long as the predicate returns true.
   */
  takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
  /**
   *Keep only a number of elements from the end of an list, creating a new list.
   *`n` must be a natural number
   */
  takeRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
}
```

Added in v0.2.0

# SubsetCollectionInput (interface)

**Signature**

```ts
interface SubsetCollectionInput {
  /**
   *Returns a new Collection of the same type representing a portion of this
   *Collection from start up to but not including end.
   *
   *If begin is negative, it is offset from the end of the Collection. e.g.
   *`slice(-2)` returns a Collection of the last two entries. If it is not
   *provided the new Collection will begin at the beginning of this Collection.
   *
   *If end is negative, it is offset from the end of the Collection. e.g.
   *`slice(0, -1)` returns a Collection of everything but the last entry. If
   *it is not provided, the new Collection will continue through the end of
   *this Collection.
   */
  slice: (begin: number, end?: number) => <A>(f: Kind<URI, A>) => Kind<URI, A>
}
```

Added in v0.2.0

# initSubset (function)

Added in v0.2.0
