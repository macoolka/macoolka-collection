---
title: ReaderCollection.ts
nav_order: 4
parent: Modules
---

# Overview

Collection Reader Interface

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderCollection (interface)](#readercollection-interface)
- [ReaderCollectionInput (interface)](#readercollectioninput-interface)
- [initReaderCollection (function)](#initreadercollection-function)

---

# ReaderCollection (interface)

Collection Reader Output Interface

**Signature**

```ts
interface ReaderCollection extends ReaderCollectionInput, ConstructorCollection {
  /**
   *The sideEffect is executed for every entry in the `Collection`.
   *
   *break when function return false
   */
  forEach: <A>(f: Predicate<A>) => (as: Kind<F, A>) => void
  /**
   *True if a `Collection` size equal zero
   */
  isEmpty: <A>(f: Kind<F, A>) => boolean
  /**
   *False if a `Collection` size equal zero
   */
  notEmpty: <A>(f: Kind<F, A>) => boolean
  /**
   *Shallowly converts this `collection` to an Array.
   */
  toArray: <A>(as: Kind<F, A>) => Array<A>
  /**
   *True if predicate returns true for all entries in the `Collection`.
   */
  every<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean
  /**
   *True if a particular condition exists
   */
  exist<A>(predicate: Predicate<A>): (f: Kind<F, A>) => boolean
  /**
   *Find the first element which satisfies a predicate (or a refinement) function
   */
  findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
  findFirst<A>(predicate: Predicate<A>): (f: Kind<F, A>) => Option<A>
  /**
   *Find the first element returned by an option based selector function
   */
  findFirstMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>
  /**
   *Find the last element which satisfies a predicate function
   */
  findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
  findLast<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<A>
  /**
   *Find the last element returned by an option based selector function
   */
  findLastMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>
  /**
   *Get the first element in an list, or `None` if the list is empty
   */
  first<A>(as: Kind<F, A>): Option<A>
  /**
   *Get the last element in an list, or `None` if the list is empty
   */
  last<A>(as: Kind<F, A>): Option<A>
  /**
   *True if predicate returns true for any entry in the `Collection`.
   */
  some<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean
}
```

Added in v0.2.0

# ReaderCollectionInput (interface)

Collection Reader Input Interface

**Signature**

```ts
interface ReaderCollectionInput {
  /**
   *Return An iterator of this Collection's values.
   */
  getiterator: <A>(f: Kind<URI, A>) => Iterable<A>
  /**
   *Returns the size of this `Collection`.
   */
  size: <A>(f: Kind<URI, A>) => number
  /**
   *Reverse an list, creating a new list
   */
  reverse<A>(as: Kind<URI, A>): Kind<URI, A>
}
```

Added in v0.2.0

# initReaderCollection (function)

Added in v0.2.0
