---
title: IndexReaderCollection.ts
nav_order: 2
parent: 模块
---

# 概述

可读集合接口

---

<h2 class="text-delta">目录</h2>

- [IndexReaderCollection (接口)](#indexreadercollection-%E6%8E%A5%E5%8F%A3)
- [IndexReaderCollectionInput (接口)](#indexreadercollectioninput-%E6%8E%A5%E5%8F%A3)
- [initIndexReaderCollection (函数)](#initindexreadercollection-%E5%87%BD%E6%95%B0)

---

# IndexReaderCollection (接口)

可读集合输出接口

**签名**

```ts
interface IndexReaderCollection extends ReaderCollectionInput, ReaderCollection, IndexReaderCollectionInput {
  /**
   *判断给定的key是否有对应记录
   */
  existAt: (i: number) => <A>(f: Kind<F, A>) => boolean
  /**
   *得到第一个满足条件的key
   */
  findFirstIndex: <A>(predicate: Predicate<A>) => (f: Kind<F, A>) => Option<number>
  /**
   *遍历每一个元素
   *函数返回false时，中断遍历
   */
  forEachIndex: <A>(f: PredicateWithIndex<number, A>) => (as: Kind<F, A>) => void
  /**
   *从集合中用key得到记录
   */
  getAt: (i: number) => <A>(f: Kind<F, A>) => Option<A>
  /**
   *判断是否所有元素都满足条件
   */
  everyIndex<A>(predicate: PredicateWithIndex<number, A>): (as: Kind<F, A>) => boolean
  /**
   *得到一个满足条件的key数组
   */
  findIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => number[]
  /**
   *得到最后一个满足条件的key
   */
  findLastIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<number>
  /**
   *判断是否有一个元素都满足条件
   */
  someIndex<A>(predicate: PredicateWithIndex<number, A>): (as: Kind<F, A>) => boolean
}
```

v0.2.0 中添加

# IndexReaderCollectionInput (接口)

可读集合输入接口

**签名**

```ts
interface IndexReaderCollectionInput {
  /**
   *用key读取集合数据
   */
  _getAt: (i: number) => <A>(f: Kind<URI, A>) => A | undefined | null
}
```

v0.2.0 中添加

# initIndexReaderCollection (函数)

v0.2.0 中添加
