---
title: IndexWriterCollection.ts
nav_order: 3
parent: Modules
---

# Overview

Collection Write Interface

---

<h2 class="text-delta">Table of contents</h2>

- [IndexWriteCollectionInput (interface)](#indexwritecollectioninput-interface)
- [IndexWriterCollection (interface)](#indexwritercollection-interface)
- [initWriter (function)](#initwriter-function)

---

# IndexWriteCollectionInput (interface)

Collection Write Input Interface

**Signature**

```ts
interface IndexWriteCollectionInput {
  /**
   *Delete the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
   */
  _deleteAt: <A>(i: number) => (as: Kind<URI, A>) => Kind<URI, A>
  /**
   *Change the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
   */
  _setAt: <A>(i: number, a: A) => (as: Kind<URI, A>) => Kind<URI, A>
  /**
   *Insert an element at the specified index, creating a new list, or returning `None` if the index is out of bounds
   */
  _insertAt<A>(i: number, a: A): (as: Kind<URI, A>) => Kind<URI, A>
}
```

Added in v0.2.0

# IndexWriterCollection (interface)

**Signature**

```ts
interface IndexWriterCollection extends IndexWriteCollectionInput, WriterCollection, IndexReaderCollection {
  /**
   *Attaches an element to the front of an `Collection`, creating a new non empty `Collection`
   */
  cons: <A>(head: A) => (tail: Kind<F, A>) => Kind<F, A>
  /**
   *Delete the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
   */
  deleteAt: <A>(i: number) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *Append an element to the end of an `Collection`, creating a new `Collection`
   */
  push: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>
  /**
   *Change the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
   */
  setAt: <A>(i: number, a: A) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *Append an element to the end of an `Collection`, creating a new `Collection`
   */
  snoc: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>
  /**
   *Change the element at the specified index and current item, creating a new collection, or returning `None` if the index is out of bounds
   */
  updateAt: <A>(i: number, updater: (a: A) => A) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *Insert an element at the specified index, creating a new list, or returning `None` if the index is out of bounds
   */
  insertAt<A>(i: number, a: A): (as: Kind<F, A>) => Option<Kind<F, A>>
}
```

Added in v0.2.0

# initWriter (function)

Added in v0.2.0
