---
title: IndexReaderCollection.ts
nav_order: 2
parent: Modules
---

# Overview

Collection Reader Interface

---

<h2 class="text-delta">Table of contents</h2>

- [IndexReaderCollection (interface)](#indexreadercollection-interface)
- [IndexReaderCollectionInput (interface)](#indexreadercollectioninput-interface)
- [initIndexReaderCollection (function)](#initindexreadercollection-function)

---

# IndexReaderCollection (interface)

Collection Reader Output Interface

**Signature**

```ts
interface IndexReaderCollection extends ReaderCollectionInput, ReaderCollection, IndexReaderCollectionInput {
  /**
   *True if a particular index exists from an `Collection`
   */
  existAt: (i: number) => <A>(f: Kind<F, A>) => boolean
  /**
   *Find the first index for which a predicate holds
   */
  findFirstIndex: <A>(predicate: Predicate<A>) => (f: Kind<F, A>) => Option<number>
  /**
   *The sideEffect is executed for every entry in the `Collection`.
   *
   *break when function return false
   */
  forEachIndex: <A>(f: PredicateWithIndex<number, A>) => (as: Kind<F, A>) => void
  /**
   *This function read a value at a particular index from an `Collection`
   */
  getAt: (i: number) => <A>(f: Kind<F, A>) => Option<A>
  /**
   *True if predicate returns true for all entries in the `Collection`.
   */
  everyIndex<A>(predicate: PredicateWithIndex<number, A>): (as: Kind<F, A>) => boolean
  /**
   *Returns the index of the element of the list which matches the predicate
   */
  findIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => number[]
  /**
   *Returns the index of the last element of the list which matches the predicate
   */
  findLastIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<number>
  /**
   *True if predicate returns true for any entry in the `Collection`.
   */
  someIndex<A>(predicate: PredicateWithIndex<number, A>): (as: Kind<F, A>) => boolean
}
```

Added in v0.2.0

# IndexReaderCollectionInput (interface)

Collection Reader Input Interface

**Signature**

```ts
interface IndexReaderCollectionInput {
  /**
   *This function  read a value at a particular index from an `Collection`
   */
  _getAt: (i: number) => <A>(f: Kind<URI, A>) => A | undefined | null
}
```

Added in v0.2.0

# initIndexReaderCollection (function)

Added in v0.2.0
