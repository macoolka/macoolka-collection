---
title: Constructor.ts
nav_order: 1
parent: 模块
---

# 概述

构造集合接口

---

<h2 class="text-delta">目录</h2>

- [ConstructorCollection (接口)](#constructorcollection-%E6%8E%A5%E5%8F%A3)
- [ConstructorCollectionInput (接口)](#constructorcollectioninput-%E6%8E%A5%E5%8F%A3)
- [initConstructor (函数)](#initconstructor-%E5%87%BD%E6%95%B0)

---

# ConstructorCollection (接口)

构造集合接口

**签名**

```ts
interface ConstructorCollection extends ConstructorCollectionInput {
  /**
   *空集合
   */
  empty(): Kind<F, any>
  /**
   *通过一个数字和函数构建集合
   */
  makeBy<A>(n: number, f: (i: number) => A): Kind<F, A>
  /**
   *通过一个范围和函数构建集合
   */
  makeByRange(start: number, end: number): Kind<F, number>
  /**
   *通过重复的元素构建集合
   */
  makeByRepeat<A>(n: number, a: A): Kind<F, A>
}
```

v0.2.0 中添加

# ConstructorCollectionInput (接口)

构造集合输入接口

**签名**

```ts
interface ConstructorCollectionInput {
  readonly URI: F
  /**
   *从迭代器中构建集合
   */
  from: <A = never>(collection: Iterable<A>) => Kind<F, A>
}
```

v0.2.0 中添加

# initConstructor (函数)

v0.2.0 中添加
