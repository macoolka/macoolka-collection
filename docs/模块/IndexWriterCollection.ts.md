---
title: IndexWriterCollection.ts
nav_order: 3
parent: 模块
---

# 概述

可写入集合接口

---

<h2 class="text-delta">目录</h2>

- [IndexWriteCollectionInput (接口)](#indexwritecollectioninput-%E6%8E%A5%E5%8F%A3)
- [IndexWriterCollection (接口)](#indexwritercollection-%E6%8E%A5%E5%8F%A3)
- [initWriter (函数)](#initwriter-%E5%87%BD%E6%95%B0)

---

# IndexWriteCollectionInput (接口)

可写入集合输入接口

**签名**

```ts
interface IndexWriteCollectionInput {
  /**
   *删除一个指定位置的元素，返回删除后的集合
   */
  _deleteAt: <A>(i: number) => (as: Kind<URI, A>) => Kind<URI, A>
  /**
   *修改一个指定位置的元素，返回修改后的集合
   */
  _setAt: <A>(i: number, a: A) => (as: Kind<URI, A>) => Kind<URI, A>
  /**
   *插入一个指定位置的元素，返回插入后的集合
   */
  _insertAt<A>(i: number, a: A): (as: Kind<URI, A>) => Kind<URI, A>
}
```

v0.2.0 中添加

# IndexWriterCollection (接口)

**签名**

```ts
interface IndexWriterCollection extends IndexWriteCollectionInput, WriterCollection, IndexReaderCollection {
  /**
   *插入一个元素到集合头,返回新集合.
   */
  cons: <A>(head: A) => (tail: Kind<F, A>) => Kind<F, A>
  /**
   *删除一个指定位置的元素，返回删除后的集合
   */
  deleteAt: <A>(i: number) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *插入一个元素到集合尾部,返回新集合.是snoc的别名.
   */
  push: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>
  /**
   *修改一个指定位置的元素，返回修改后的集合
   */
  setAt: <A>(i: number, a: A) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *插入一个元素到集合尾部,返回新集合.
   */
  snoc: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>
  /**
   *修改一个指定位置的元素，返回修改后的集合
   */
  updateAt: <A>(i: number, updater: (a: A) => A) => (as: Kind<F, A>) => Option<Kind<F, A>>
  /**
   *插入一个指定位置的元素，返回插入后的集合
   */
  insertAt<A>(i: number, a: A): (as: Kind<F, A>) => Option<Kind<F, A>>
}
```

v0.2.0 中添加

# initWriter (函数)

v0.2.0 中添加
