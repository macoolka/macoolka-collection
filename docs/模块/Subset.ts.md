---
title: Subset.ts
nav_order: 5
parent: 模块
---

# 概述

子集接口

---

<h2 class="text-delta">目录</h2>

- [Subset (接口)](#subset-%E6%8E%A5%E5%8F%A3)
- [SubsetCollectionInput (接口)](#subsetcollectioninput-%E6%8E%A5%E5%8F%A3)
- [initSubset (函数)](#initsubset-%E5%87%BD%E6%95%B0)

---

# Subset (接口)

**签名**

```ts
interface Subset extends SubsetCollectionInput, IndexWriterCollection {
  /**
   *清除集合,返回空集合
   */
  clear: <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *得到除了最后一个元素以外的所有元素
   */
  head<A>(as: Kind<F, A>): Option<Kind<F, A>>
  /**
   *从开始位置跳过指定数量的子集
   */
  skipLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *截取takeLeftUntil剩余部分
   */
  skipLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *截取takeLeftWhile剩余部分
   */
  skipLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *从结尾位置跳过指定数量的子集
   */
  skipRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  spanLeft<A>(predicate: Predicate<A>): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }
  /**
   *拆分一个集合到两个部分
   *1. 第一部分为takeLeftWhile截取的内容
   *2. 第二部分为剩余的内容
   */
  spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }
  /**
   *在指定的位置拆分集合
   */
  splitAt(n: number): <A>(as: Kind<F, A>) => [Kind<F, A>, Kind<F, A>]
  /**
   *得到除了第一个元素以外的所有元素
   */
  tail<A>(as: Kind<F, A>): Option<Kind<F, A>>
  /**
   *得到从开始位置截取的指定数量的集合
   */
  takeLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
  /**
   *从开始位置截取集合，截取直到指定条件第一次为true
   */
  takeLeftUntil<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
  takeLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  takeLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
  /**
   *从开始位置截取集合，截取直到指定条件第一次不为true
   */
  takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
  /**
   *得到从结尾位置截取的指定数量的集合
   */
  takeRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
}
```

v0.2.0 中添加

# SubsetCollectionInput (接口)

**签名**

```ts
interface SubsetCollectionInput {
  /**
   *从集合的开始位置到结尾位置(不包括结尾)返回一个新集合，
   */
  slice: (begin: number, end?: number) => <A>(f: Kind<URI, A>) => Kind<URI, A>
}
```

v0.2.0 中添加

# initSubset (函数)

v0.2.0 中添加
