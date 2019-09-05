---
title: ReaderCollection.ts
nav_order: 4
parent: 模块
---

# 概述

可读集合接口

---

<h2 class="text-delta">目录</h2>

- [ReaderCollection (接口)](#readercollection-%E6%8E%A5%E5%8F%A3)
- [ReaderCollectionInput (接口)](#readercollectioninput-%E6%8E%A5%E5%8F%A3)
- [initReaderCollection (函数)](#initreadercollection-%E5%87%BD%E6%95%B0)

---

# ReaderCollection (接口)

可读集合输出接口

**签名**

```ts
interface ReaderCollection extends ReaderCollectionInput, ConstructorCollection {
  /**
   *遍历每一个元素
   *函数返回false时，中断遍历
   */
  forEach: <A>(f: Predicate<A>) => (as: Kind<F, A>) => void
  /**
   *判断集合是否为空
   */
  isEmpty: <A>(f: Kind<F, A>) => boolean
  /**
   *判断集合是否为非空
   */
  notEmpty: <A>(f: Kind<F, A>) => boolean
  /**
   *转换集合到数组
   */
  toArray: <A>(as: Kind<F, A>) => Array<A>
  /**
   *判断是否所有元素都满足条件
   */
  every<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean
  /**
   *判断给定的条件是否存在记录
   */
  exist<A>(predicate: Predicate<A>): (f: Kind<F, A>) => boolean
  /**
   *获得第一个满足条件的元素
   */
  findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
  findFirst<A>(predicate: Predicate<A>): (f: Kind<F, A>) => Option<A>
  /**
   *获得第一个满足条件的元素，并转换元素
   */
  findFirstMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>
  /**
   *获得最后一个满足条件的元素
   */
  findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
  findLast<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<A>
  /**
   *获得最后一个满足条件的元素，并转换元素
   */
  findLastMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>
  /**
   *返回第一条记录
   */
  first<A>(as: Kind<F, A>): Option<A>
  /**
   *返回最后一条记录
   */
  last<A>(as: Kind<F, A>): Option<A>
  /**
   *判断是否有一个元素都满足条件
   */
  some<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean
}
```

v0.2.0 中添加

# ReaderCollectionInput (接口)

可读集合输入接口

**签名**

```ts
interface ReaderCollectionInput {
  /**
   *获取集合迭代器
   */
  getiterator: <A>(f: Kind<URI, A>) => Iterable<A>
  /**
   *获取集合数据数量
   */
  size: <A>(f: Kind<URI, A>) => number
  /**
   *翻转一个集合
   */
  reverse<A>(as: Kind<URI, A>): Kind<URI, A>
}
```

v0.2.0 中添加

# initReaderCollection (函数)

v0.2.0 中添加
