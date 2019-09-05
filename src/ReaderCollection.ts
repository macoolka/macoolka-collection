/**
 * Collection Reader Interface
 * @desczh
 * 可读集合接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { Predicate, Refinement } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { ConstructorCollection } from './Constructor'
import { not } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { cloneDeep } from 'macoolka-object'
/**
 * Collection Reader Input Interface
 * @desczh
 * 可读集合输入接口
 */
export interface ReaderCollectionInput<URI extends URIS> {
    /**
    *  Returns the size of this `Collection`.
    * @desczh
    * 获取集合数据数量
    * @example
    * import { count } from 'fp-ts/lib/Array'
    *
    * assert.deepStrictEqual(count([1, 2, 3]), 3)
    *
    * @since 0.5.0
    */
    size: <A>(f: Kind<URI, A>) => number

    /**
     * Return An iterator of this Collection's values.
     * @desczh
     * 获取集合迭代器
     * @example
     * import { getiterator } from 'fp-ts/lib/Array'
     *
     * const iterator = getiterator(['1','2'])
     *
     * @since 0.5.0
     */
    getiterator: <A>(f: Kind<URI, A>) => Iterable<A>



    /**
     * Reverse an list, creating a new list
     * @desczh
     * 翻转一个集合
     * @example
     * import { reverse } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
     *
     * @since 0.5.0
     */
    reverse<A>(as: Kind<URI, A>): Kind<URI, A>

}
/**
 * Collection Reader Output Interface
 * @desczh
 * 可读集合输出接口
 */
export interface ReaderCollection<F extends URIS> extends ReaderCollectionInput<F>, ConstructorCollection<F> {

    /**
     * True if a `Collection` size equal zero
     * @desczh
     * 判断集合是否为空
     * @example
     * import { isEmpty } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(isEmpty([1, 2, 3]), false)
     * assert.deepStrictEqual(isEmpty([1, 2, 3]), true)
     *
     * @since 0.5.0
     */

    isEmpty: <A>(f: Kind<F, A>) => boolean
    /**
     * False if a `Collection` size equal zero
     * @desczh
     * 判断集合是否为非空
     * @example
     * import { notEmpty } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(notEmpty([1, 2, 3]), false)
     * assert.deepStrictEqual(notEmpty([1, 2, 3]), true)
     *
     * @since 0.5.0
     */

    notEmpty: <A>(f: Kind<F, A>) => boolean

    /**
    * Get the first element in an list, or `None` if the list is empty
    * @desczh
    * 返回第一条记录
    * @example
    * import { first } from 'fp-ts/lib/List'
    * import { some, none } from 'fp-ts/lib/Option'
    *
    * assert.deepStrictEqual(first([1, 2, 3]), some(1))
    * assert.deepStrictEqual(first([]), none)
    *
    * @since 0.5.0
    */
    first<A>(as: Kind<F, A>): Option<A>

    /**
     * Get the last element in an list, or `None` if the list is empty
     * @desczh
     * 返回最后一条记录
     * @example
     * import { getLast } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(last([1, 2, 3]), some(3))
     * assert.deepStrictEqual(last([]), none)
     *
     * @since 0.5.0
     */
    last<A>(as: Kind<F, A>): Option<A>

    /**
     * True if a particular condition exists 
     * @desczh
     * 判断给定的条件是否存在记录
     * @example
     * import { exist } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(exist()([1, 2, 3]), some(1))
     * assert.deepStrictEqual(first([]), none)
     *
     * @since 0.5.0
     */
    exist<A>(predicate: Predicate<A>): (f: Kind<F, A>) => boolean

    /**
     * Find the first element which satisfies a predicate (or a refinement) function
     * @desczh
     * 获得第一个满足条件的元素
     * @example
     * import { findFirst } from 'fp-ts/lib/List'
     * import { some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(findFirst((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 1 }))
     *
     * @since 0.5.0
     */
    findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
    findFirst<A>(predicate: Predicate<A>): (f: Kind<F, A>) => Option<A>

    /**
    * Find the first element returned by an option based selector function
    * @desczh
    * 获得第一个满足条件的元素，并转换元素
    * @example
    * import { findFirstMap } from 'fp-ts/lib/List'
    * import { some, none } from 'fp-ts/lib/Option'
    *
    * interface Person {
    *   name: string
    *   age?: number
    * }
    *
    * const persons: List<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
    *
    * // returns the name of the first person that has an age
    * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
    *
    * @since 0.5.0
    */
    findFirstMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>

    /**
     * Find the last element which satisfies a predicate function
     * @desczh
     * 获得最后一个满足条件的元素
     * @example
     * import { findLast } from 'fp-ts/lib/List'
     * import { some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
     *
     * @since 0.5.0
     */
    findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Option<B>
    findLast<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<A>

    /**
     * Find the last element returned by an option based selector function
     * @desczh
     * 获得最后一个满足条件的元素，并转换元素
     * @example
     * import { findLastMap } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * interface Person {
     *   name: string
     *   age?: number
     * }
     *
     * const persons: List<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
     *
     * // returns the name of the last person that has an age
     * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
     *
     * @since 0.5.0
     */
    findLastMap<A, B>(f: (a: A) => Option<B>): (as: Kind<F, A>) => Option<B>



    /**
    * The sideEffect is executed for every entry in the `Collection`.
    * 
    * break when function return false
    * @desczh
    * 遍历每一个元素
    * 函数返回false时，中断遍历
    * @example
    * import { forEach } from 'fp-ts/lib/Array'
    *
    * const values=[]
    * forEach(a=>values.push(a))([1, 2, 3])
    * assert.deepStrictEqual(values, [1, 2, 3])
    *
    * @since 0.5.0
    */
    forEach: <A>(f: Predicate<A>) => (as: Kind<F, A>) => void

    /**
     * Shallowly converts this `collection` to an Array.
     * @desczh
     * 转换集合到数组
     * @example
     * import { toArray } from 'fp-ts/lib/Array'
     *
     * const values=[]
     * assert.deepStrictEqual(toArray([1,2,3]), [1,2,3])
     *
     * @since 0.5.0
     */
    toArray: <A>(as: Kind<F, A>) => Array<A>
    /**
      * True if predicate returns true for all entries in the `Collection`.
      * @desczh
      * 判断是否所有元素都满足条件
      * @example
      * import { every } from 'fp-ts/lib/Array'
      *
      * const values=[]
      * assert.deepStrictEqual(every(a=>a==1)([1,2,3]), false)
      *
      * @since 0.5.0
      */
    every<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean

    /**
      * True if predicate returns true for any entry in the `Collection`.
      * @desczh
      * 判断是否有一个元素都满足条件
      * @example
      * import { some } from 'fp-ts/lib/Array'
      *
      * assert.deepStrictEqual(some(a=>a===1)([1,2,3]), true)
      *
      * @since 0.5.0
      */
    some<A>(predicate: Predicate<A>): (as: Kind<F, A>) => boolean


}

export function initReaderCollection<URI extends URIS>(
    options: ReaderCollectionInput<URI> & ConstructorCollection<URI>): ReaderCollection<URI> {
    const { size: size, getiterator, reverse } = options

    /**
    * True if a `Collection` size equal zero
    *
    * @example
    * import { isEmpty } from 'fp-ts/lib/Array'
    *
    * assert.deepStrictEqual(isEmpty([1, 2, 3]), false)
    * assert.deepStrictEqual(isEmpty([1, 2, 3]), true)
    *
    * @since 0.5.0
    */

    function isEmpty<A>(as: Kind<URI, A>): boolean {
        return size(as) === 0
    }
    /**
     * False if a `Collection` size equal zero
     *
     * @example
     * import { notEmpty } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(notEmpty([1, 2, 3]), false)
     * assert.deepStrictEqual(notEmpty([1, 2, 3]), true)
     *
     * @since 0.5.0
     */

    function notEmpty<A>(as: Kind<URI, A>): boolean {
        return pipe(
            as,
            not(isEmpty)
        )

    }


    function first<A>(as: Kind<URI, A>): Option<A> {

        return pipe(
            getiterator(as),
            as => as[Symbol.iterator]().next(),
            result => O.fromNullable(cloneDeep(result.value))
        )
    }

    /**
     * Get the last element in an list, or `None` if the list is empty
     *
     * @example
     * import { getLast } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(getLast([1, 2, 3]), some(3))
     * assert.deepStrictEqual(getLast([]), none)
     *
     * @since 0.5.0
     */
    function last<A>(as: Kind<URI, A>): Option<A> {
        return pipe(
            as,
            reverse,
            getiterator,
            as => as[Symbol.iterator]().next(),
            result => O.fromNullable(cloneDeep(result.value))
        )
    }
    const forEach: ReaderCollection<URI>['forEach'] = f => as => {

        const iterator = pipe(
            as,
            getiterator,

        )
        let i = 0;
        for (const value of iterator) {
            const a = f(value)
            if (a === false) {
                break
            }
            i = ++i
        }

    }

    function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<URI, A>) => Option<B>
    function findFirst<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Option<A>
    function findFirst<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Option<A> {
        return as => {
            let result: Option<A> = O.none
            pipe(
                as,
                forEach((value) => {
                    if (predicate(value)) {
                        result = O.some(value)
                        return false
                    }
                    return true
                })
            )
            return result
        }
    }

    /**
     * Find the first element returned by an option based selector function
     *
     * @example
     * import { findFirstMap } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * interface Person {
     *   name: string
     *   age?: number
     * }
     *
     * const persons: List<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
     *
     * // returns the name of the first person that has an age
     * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
     *
     * @since 0.5.0
     */
    function findFirstMap<A, B>(f: (a: A) => Option<B>): (as: Kind<URI, A>) => Option<B> {
        return as => {
            let result: Option<B> = O.none;
            pipe(
                as,
                findFirst(a => {
                    result = f(a)
                    return O.isSome(result)
                })
            )
            return result


        }
    }

    /**
     * Find the last element which satisfies a predicate function
     *
     * @example
     * import { findLast } from 'fp-ts/lib/List'
     * import { some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
     *
     * @since 0.5.0
     */
    function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<URI, A>) => Option<B>
    function findLast<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Option<A>
    function findLast<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Option<A> {
        return as => {
            return pipe(
                as,
                reverse,
                findFirst(predicate),

            )

        }
    }

    /**
     * Find the last element returned by an option based selector function
     *
     * @example
     * import { findLastMap } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * interface Person {
     *   name: string
     *   age?: number
     * }
     *
     * const persons: List<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
     *
     * // returns the name of the last person that has an age
     * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
     *
     * @since 0.5.0
     */
    function findLastMap<A, B>(f: (a: A) => Option<B>): (as: Kind<URI, A>) => Option<B> {
        return as => {
            return pipe(
                as,
                reverse,
                findFirstMap(f)
            )
        }
    }


    function toArray<A>(as: Kind<URI, A>): Array<A> {
        return [...getiterator(as)]
    }

    const every: ReaderCollection<URI>['every'] = predicate => as => {
        let result = true;
        pipe(
            as,
            forEach((a) => {
                if (!predicate(a)) {
                    result = false
                    return false;
                }
                return true
            })
        )
        return result
    }
    const some: ReaderCollection<URI>['some'] = predicate => as => {
        let result = false;
        pipe(
            as,
            forEach((i) => {
                if (predicate(i)) {
                    result = true
                    return false;
                }
                return true
            })
        )
        return result
    }
    const exist: ReaderCollection<URI>['exist'] = predicate => as => {
        let result = false;
        pipe(
            as,
            findFirst(predicate),
            O.isSome

        )
        return result
    }
    return {
        isEmpty,
        notEmpty,
        findFirst,
        findFirstMap,
        findLast,
        findLastMap,
        first,

        last,
        forEach,
        exist,
        toArray,
        every,
        some,
        ...options
    }
}