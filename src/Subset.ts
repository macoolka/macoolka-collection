/**
 * Subset Collection  Interface
 * @desczh
 * 子集接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { Predicate, Refinement } from 'fp-ts/lib/function'
import { IndexWriterCollection } from './IndexWriterCollection'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable';
import {not} from 'fp-ts/lib/function'
export interface SubsetCollectionInput<URI extends URIS> {
    /**
     * Returns a new Collection of the same type representing a portion of this
     * Collection from start up to but not including end.
     *
     * If begin is negative, it is offset from the end of the Collection. e.g.
     * `slice(-2)` returns a Collection of the last two entries. If it is not
     * provided the new Collection will begin at the beginning of this Collection.
     *
     * If end is negative, it is offset from the end of the Collection. e.g.
     * `slice(0, -1)` returns a Collection of everything but the last entry. If
     * it is not provided, the new Collection will continue through the end of
     * this Collection.
     * @desczh
     * 从集合的开始位置到结尾位置(不包括结尾)返回一个新集合，
     * @example
     * import { slice } from 'fp-ts/lib/slice'
     *
     * assert.deepStrictEqual(slice(1)([1, 2, 3]), [2, 3])
     * assert.deepStrictEqual(slice([0,2]), [1, 2])
     *
     * @since 0.5.0
     */
    slice: (begin: number, end?: number) => <A>(f: Kind<URI, A>) => Kind<URI, A>


}
export interface Subset<F extends URIS> extends SubsetCollectionInput<F>, IndexWriterCollection<F> {
    /**
     * Get all but the first element of an list, creating a new list, or `None` if the list is empty
     * @desczh
     * 得到除了第一个元素以外的所有元素
     * @example
     * import { tail } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
     * assert.deepStrictEqual(tail([]), none)
     *
     * @since 0.5.0
     */
    tail<A>(as: Kind<F, A>): Option<Kind<F, A>>


    /**
     * Get all but the last element of an list, creating a new list, or `None` if the list is empty
     * @desczh
     * 得到除了最后一个元素以外的所有元素
     * @example
     * import { head } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(head([1, 2, 3]), some([1, 2]))
     * assert.deepStrictEqual(head([]), none)
     *
     * @since 0.5.0
     */
    head<A>(as: Kind<F, A>): Option<Kind<F, A>>

    /**
     * Keep only a number of elements from the start of an list, creating a new list.
     * `n` must be a natural number
     * @desczh
     * 得到从开始位置截取的指定数量的集合
     * @example
     * import { takeLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
     * 
     * @since 0.5.0
     */
    takeLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>

    /**
     * Keep only a number of elements from the end of an list, creating a new list.
     * `n` must be a natural number
     * @desczh
     * 得到从结尾位置截取的指定数量的集合
     * @example
     * import { takeRight } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
     *
     * @since 0.5.0
     */
    takeRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>
    /**
     * Returns a new Collection of the same type which includes entries from this Collection as long as the predicate returns true.
     * @desczh
     * 从开始位置截取集合，截取直到指定条件第一次不为true
     * @example
     * import { takeLeftWhile } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
     *
     * @since 0.5.0
     */
    takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
    takeLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>

    /**
     * Returns a new Collection of the same type which includes entries from this Collection as long as the predicate returns false.
     * @desczh
     * 从开始位置截取集合，截取直到指定条件第一次为true
     * @example
     * import { takeLeftUntil } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeftUntil((n: number) => n % 2 === 1)([2, 4, 3, 6]), [2, 4])
     *
     * @since 0.5.0
     */
    takeLeftUntil<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<F, A>) => Kind<F, B>
    takeLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>
    /**
     * Split an list into two parts:
     * 1. the longest initial subarray for which all elements satisfy the specified predicate
     * 2. the remaining elements
     * @desczh
     * 拆分一个集合到两个部分
     * 1. 第一部分为takeLeftWhile截取的内容
     * 2. 第二部分为剩余的内容
     * @example
     * import { spanLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
     *
     * @since 0.5.0
     */
    spanLeft<A, B extends A>(
        refinement: Refinement<A, B>
    ): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }
    spanLeft<A>(predicate: Predicate<A>): (as: Kind<F, A>) => { init: Kind<F, A>; rest: Kind<F, A> }


    /**
     * Skip a number of elements from the start of an list, creating a new list
     * @desczh
     * 从开始位置跳过指定数量的子集
     * @example
     * import { skipLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipLeft(2)([1, 2, 3]), [3])
     *
     * @since 0.5.0
     */
    skipLeft(n: number): <A>(as: Kind<F, A>) => Kind<F, A>

    /**
     * Skip a number of elements from the end of an list, creating a new list
     * @desczh
     * 从结尾位置跳过指定数量的子集
     * @example
     * import { skipRight } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
     *
     * @since 0.5.0
     */
    skipRight(n: number): <A>(as: Kind<F, A>) => Kind<F, A>

    /**
     * Returns a new Collection of the same type which includes entries starting from when predicate first returns false.
     * @desczh
     * 截取takeLeftWhile剩余部分
     * @example
     * import { skipLeftWhile } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
     *
     * @since 0.5.0
     */
    skipLeftWhile<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>

    /**
     * Returns a new `Collection` of the same type which includes entries starting from when predicate first returns true.
     * @desczh
     * 截取takeLeftUntil剩余部分
     * @example
     * import { skipLeftUntil } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipLeftUntil((n: number) => n % 2 === 0)([1, 3, 2, 4, 5]), [2, 4, 5])
     *
     * @since 0.5.0
     */
    skipLeftUntil<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Kind<F, A>

    /**
      * Returns a new Collection with 0 size and no values in constant time.
      * @desczh
      * 清除集合,返回空集合
      * @example
      * import { clear } from 'fp-ts/lib/List'
      *
      * assert.deepStrictEqual(clear([1, 2, 3, 4]), []))
      *
      * @since 0.5.0
      */
    clear: <A>(as: Kind<F, A>) => Kind<F, A>


    /**
     * Splits an list into two pieces, the first piece has `n` elements.
     * @desczh
     * 在指定的位置拆分集合
     * @example
     * import { splitAt } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
     *
     * @since 0.5.0
     */
    splitAt(n: number): <A>(as: Kind<F, A>) => [Kind<F, A>, Kind<F, A>]

}
export function initSubset <URI extends URIS>(option: SubsetCollectionInput<URI> & IndexWriterCollection<URI>): Subset<URI>  {
    const { slice,  notEmpty,
        size, empty, findFirstIndex } = option
    /**
     * Get all but the first element of an list, creating a new list, or `None` if the list is empty
     *
     * @example
     * import { tail } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
     * assert.deepStrictEqual(tail([]), none)
     *
     * @since 0.5.0
     */
    function tail<A>(as: Kind<URI, A>): Option<Kind<URI, A>> {
        return pipe(
            as,
            O.fromPredicate(notEmpty),
            O.map(() => slice(1)(as))
        )
    }

    /**
     * Get all but the last element of an list, creating a new list, or `None` if the list is empty
     *
     * @example
     * import { head } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(head([1, 2, 3]), some([1, 2]))
     * assert.deepStrictEqual(head([]), none)
     *
     * @since 0.5.0
     */
    function head<A>(as: Kind<URI, A>): Option<Kind<URI, A>> {
        return pipe(
            as,
            O.fromPredicate(notEmpty),
            O.map(() => slice(0, size(as) - 1)(as))
        )
    }

    /**
     * Keep only a number of elements from the start of an list, creating a new list.
     * `n` must be a natural number
     *
     * @example
     * import { takeLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
     *
     * @since 0.5.0
     */
    function takeLeft(n: number): <A>(as: Kind<URI, A>) => Kind<URI, A> {
        return as => n <= 0 ? empty() : slice(0, n)(as)
    }

    /**
     * Keep only a number of elements from the end of an list, creating a new list.
     * `n` must be a natural number
     *
     * @example
     * import { takeRight } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
     *
     * @since 0.5.0
     */
    function takeRight(n: number): <A>(as: Kind<URI, A>) => Kind<URI, A> {
        return as => n <= 0 ? empty() : slice(-n)(as)
    }


    /**
     * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new list
     *
     * @example
     * import { takeLeftWhile } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
     *
     * @since 0.5.0
     */
    function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<URI, A>) => Kind<URI, B>
    function takeLeftWhile<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A>
    function takeLeftWhile<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A> {
        return as => {
            return pipe(
                as,
                findFirstIndex(not(predicate)),
                O.map(index => index===0?empty():slice(0,index)(as)),
                O.getOrElse(() => as)

            )
         }

    }

    /**
     * Returns a new Collection of the same type which includes entries from this Collection as long as the predicate returns false.
     *
     * @example
     * import { takeLeftUntil } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(takeLeftUntil((n: number) => n % 2 === 1)([2, 4, 3, 6]), [2, 4])
     *
     * @since 0.5.0
     */
    function takeLeftUntil<A, B extends A>(refinement: Refinement<A, B>): (as: Kind<URI, A>) => Kind<URI, B>
    function takeLeftUntil<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A>
    function takeLeftUntil<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A>{
        return as => {
            return pipe(
                as,
                findFirstIndex((predicate)),
                O.map(index => index===0?empty():slice(0,index)(as)),
                O.getOrElse(() => as)

            )
         }
    }

    /**
     * Split an list into two parts:
     * 1. the longest initial subarray for which all elements satisfy the specified predicate
     * 2. the remaining elements
     *
     * @example
     * import { spanLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
     *
     * @since 0.5.0
     */
    function spanLeft<A, B extends A>(
        refinement: Refinement<A, B>
    ): (as: Kind<URI, A>) => { init: Kind<URI, A>; rest: Kind<URI, A> }
    function spanLeft<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => { init: Kind<URI, A>; rest: Kind<URI, A> }
    function spanLeft<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => { init: Kind<URI, A>; rest: Kind<URI, A> } {
        return as => {
            const init = takeLeftWhile(predicate)(as)

            return {
                init: init,
                rest: slice(size(init))(as)
            }
        }
    }

    /**
     * Skip a number of elements from the start of an list, creating a new list
     *
     * @example
     * import { dropLeft } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
     *
     * @since 0.5.0
     */
    function skipLeft(n: number): <A>(as: Kind<URI, A>) => Kind<URI, A> {
        return as => n < 0 ? empty() : slice(n)(as)
    }

    /**
     * Skip a number of elements from the end of an list, creating a new list
     *
     * @example
     * import { dropRight } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
     *
     * @since 0.5.0
     */
    function skipRight(n: number): <A>(as: Kind<URI, A>) => Kind<URI, A> {
        return as => size(as) - n < 0 ? empty() : slice(0, size(as) - n)(as)
    }

    /**
     * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new list
     *
     * @example
     * import { skipLeftWhile } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
     *
     * @since 0.5.0
     */
    function skipLeftWhile<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A> {
        return as => {
            return pipe(
                as,
                findFirstIndex(not(predicate)),
                O.map(index => index===0?as:slice(index)(as)),
                O.getOrElse(() => empty())

            )
        }
    }

    /**
     * Returns a new `Collection` of the same type which includes entries starting from when predicate first returns true.
     *
     * @example
     * import { skipLeftUntil } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(skipLeftUntil((n: number) => n % 2 === 0)([1, 3, 2, 4, 5]), [2, 4, 5])
     *
     * @since 0.5.0
     */
    function skipLeftUntil<A>(predicate: Predicate<A>): (as: Kind<URI, A>) => Kind<URI, A>{
        return as => {
            return pipe(
                as,
                findFirstIndex((predicate)),
                O.map(index => index===0?as:slice(index)(as)),
                O.getOrElse(() => empty())

            )
        }
    }

    /**
      * Returns a new Collection with 0 size and no values in constant time.
      *
      * @example
      * import { clear } from 'fp-ts/lib/List'
      *
      * assert.deepStrictEqual(clear([1, 2, 3, 4]), []))
      *
      * @since 0.5.0
      */
    function clear<A>(as: Kind<URI, A>): Kind<URI, A> {
        return empty()
    }


    /**
     * Splits an list into two pieces, the first piece has `n` elements.
     *
     * @example
     * import { splitAt } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
     *
     * @since 0.5.0
     */
    function splitAt(n: number): <A>(as: Kind<URI, A>) => [Kind<URI, A>, Kind<URI, A>] {
        return as => {
            return [slice(0, n)(as), slice(n)(as)]
        }
    }
    return {
        ...option,
        head,
        tail,
        takeLeft,
        takeLeftWhile,
        takeLeftUntil,
        takeRight,
        skipLeft,
        skipLeftWhile,
        skipLeftUntil,
        skipRight,
        splitAt,
        spanLeft,
        clear
    }
}
