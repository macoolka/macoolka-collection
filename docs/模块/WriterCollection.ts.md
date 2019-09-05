---
title: WriterCollection.ts
nav_order: 6
parent: 模块
---

# 概述

可写入集合接口

---

<h2 class="text-delta">目录</h2>

- [WriteCollectionInput (接口)](#writecollectioninput-%E6%8E%A5%E5%8F%A3)
- [WriterCollection (接口)](#writercollection-%E6%8E%A5%E5%8F%A3)
- [initWriterCollection (函数)](#initwritercollection-%E5%87%BD%E6%95%B0)

---

# WriteCollectionInput (接口)

可写入集合输入接口

**签名**

```ts
interface WriteCollectionInput {
  /**
   *插入一个元素到集合头,返回新集合.
   */
  add: <A>(head: A) => (tail: Kind<URI, A>) => Kind<URI, A>
  /**
   *删除一些满足条件的元素，返回删除后的集合
   */
  deleteWith: <A>(predicate: Predicate<A>) => (as: Kind<URI, A>) => Kind<URI, A>
  updateWith: <A>(predicate: Predicate<A>, updater: (a: A) => A) => (as: Kind<URI, A>) => Kind<URI, A>
}
```

v0.2.0 中添加

# WriterCollection (接口)

**签名**

```ts
interface WriterCollection extends WriteCollectionInput, ReaderCollection {}
```

v0.2.0 中添加

# initWriterCollection (函数)

v0.2.0 中添加
