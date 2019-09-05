---
title: WriterCollection.ts
nav_order: 6
parent: Modules
---

# Overview

Collection Write Interface

---

<h2 class="text-delta">Table of contents</h2>

- [WriteCollectionInput (interface)](#writecollectioninput-interface)
- [WriterCollection (interface)](#writercollection-interface)
- [initWriterCollection (function)](#initwritercollection-function)

---

# WriteCollectionInput (interface)

Collection Write Input Interface

**Signature**

```ts
interface WriteCollectionInput {
  /**
   *Attaches an element to the front of an `Collection`, creating a new non empty `Collection`
   */
  add: <A>(head: A) => (tail: Kind<URI, A>) => Kind<URI, A>
  /**
   *delete the element wtih the specified condition,
   *creating a new collection.
   */
  deleteWith: <A>(predicate: Predicate<A>) => (as: Kind<URI, A>) => Kind<URI, A>
  updateWith: <A>(predicate: Predicate<A>, updater: (a: A) => A) => (as: Kind<URI, A>) => Kind<URI, A>
}
```

Added in v0.2.0

# WriterCollection (interface)

**Signature**

```ts
interface WriterCollection extends WriteCollectionInput, ReaderCollection {}
```

Added in v0.2.0

# initWriterCollection (function)

Added in v0.2.0
