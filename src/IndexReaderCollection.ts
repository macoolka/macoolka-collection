/**
 * Collection Reader Interface
 * @desczh
 * 可读集合接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import { Predicate } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { PredicateWithIndex } from 'fp-ts/lib/FilterableWithIndex'
import * as O from 'fp-ts/lib/Option'
import { ReaderCollectionInput, ReaderCollection } from './ReaderCollection'
/**
 * Collection Reader Input Interface
 * @desczh
 * 可读集合输入接口
 */
export interface IndexReaderCollectionInput<URI extends URIS> {
    /**
    * This function  read a value at a particular index from an `Collection`
    * @desczh
    * 用key读取集合数据
    * @example
    * import { getAt } from 'fp-ts/lib/Array'
    * import { some, none } from 'fp-ts/lib/Option'
    *
    * assert.deepStrictEqual(getAt(1)([1, 2, 3]), some(2))
    * assert.deepStrictEqual(getAt(3)([1, 2, 3]), none)
    *
    * @since 0.5.0
    */
    _getAt: (i: number) => <A>(f: Kind<URI, A>) => A | undefined | null



}
/**
 * Collection Reader Output Interface
 * @desczh
 * 可读集合输出接口
 */
export interface IndexReaderCollection<F extends URIS> extends ReaderCollectionInput<F>, ReaderCollection<F> ,IndexReaderCollectionInput<F>{
    /**
    * This function read a value at a particular index from an `Collection`
    * @desczh
    * 从集合中用key得到记录
    * @example
    * import { getAt } from 'fp-ts/lib/Array'
    * import { some, none } from 'fp-ts/lib/Option'
    *
    * assert.deepStrictEqual(getAt(1)([1, 2, 3]), some(2))
    * assert.deepStrictEqual(getAt(3)([1, 2, 3]), none)
    *
    * @since 0.5.0
    */
    getAt: (i: number) => <A>(f: Kind<F, A>) => Option<A>


    /**
     * True if a particular index exists from an `Collection`
     * @desczh
     * 判断给定的key是否有对应记录
     * @example
     * import { existAt } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(existAt(1)([1, 2, 3]), true)
     * assert.deepStrictEqual(existAt(3)([1, 2, 3]), false)
     *
     * @since 2.0.0
     */
    existAt: (i: number) => <A>(f: Kind<F, A>) => boolean


    /**
     * Find the first index for which a predicate holds
     * @desczh
     * 得到第一个满足条件的key
     * @example
     * import { findFirstIndex } from 'fp-ts/lib/Array'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(findFirstIndex((n: number) => n === 2)([1, 2, 3]), some(1))
     * assert.deepStrictEqual(findFirstIndex((n: number) => n === 2)([]), none)
     *
     * @since 0.5.0
     */
    findFirstIndex: <A>(predicate: Predicate<A>) => (f: Kind<F, A>) => Option<number>

    /**
     * Returns the index of the last element of the list which matches the predicate
     * @desczh
     * 得到最后一个满足条件的key
     * @example
     * import { findLastIndex } from 'fp-ts/lib/List'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * interface X {
     *   a: number
     *   b: number
     * }
     * const xs: List<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
     * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
     * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
     *
     *
     * @since 0.5.0
     */
    findLastIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => Option<number>
    /**
     * Returns the index of the element of the list which matches the predicate
     * @desczh
     * 得到一个满足条件的key数组
     * @example
     * import { findIndex } from 'fp-ts/lib/List'
     *
     * interface X {
     *   a: number
     *   b: number
     * }
     * const xs: List<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
     * assert.deepStrictEqual(findIndex((x: { a: number }) => x.a === 1)(xs), [1])
     * assert.deepStrictEqual(findIndex((x: { a: number }) => x.a === 4)(xs), [])
     *
     *
     * @since 0.5.0
     */
    findIndex<A>(predicate: Predicate<A>): (as: Kind<F, A>) => number[]





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
    forEachIndex: <A>(f: PredicateWithIndex<number,A>) => (as: Kind<F, A>) => void


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
    everyIndex<A>(predicate: PredicateWithIndex<number,A>): (as: Kind<F, A>) => boolean

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
    someIndex<A>(predicate: PredicateWithIndex<number,A >): (as: Kind<F, A>) => boolean


}

export function initIndexReaderCollection<URI extends URIS>(options: IndexReaderCollectionInput<URI>
     & ReaderCollection<URI>): IndexReaderCollection<URI> {
    const { size: size, getiterator, _getAt, reverse } = options
    const getAt: IndexReaderCollection<URI>['getAt'] = i => as => {
        return O.fromNullable(_getAt(i)(as))
    }

     const existAt: IndexReaderCollection<URI>['existAt'] = i => as => {
        return i >= 0 && i < size(as)
    }


    const forEachIndex: IndexReaderCollection<URI>['forEachIndex'] = f => as => {

        const iterator = pipe(
            as,
            getiterator,

        )
        let i = 0;
        for (const value of iterator) {
            const a = f(i,value)
            if (a === false) {
                break
            }
            i = ++i
        }

    }
    const findIndex: IndexReaderCollection<URI>['findIndex'] = (predicate) => as => {

        const result: number[] = []
        pipe(
            as,
            forEachIndex((i,value) => {
                if (predicate(value)) {
                    result.push(i)
                    // return false
                }
                return true
            })
        )
        return result

    }
    const findFirstIndex: IndexReaderCollection<URI>['findFirstIndex'] = (predicate) => as => {

        let result: Option<number> = O.none
        pipe(
            as,
            forEachIndex((i,value) => {
                if (predicate(value)) {
                    result = O.some(i)
                    return false
                }
                return true
            })
        )
        return result

    }

    const findLastIndex: IndexReaderCollection<URI>['findLastIndex'] = predicate => as => {


        return pipe(
            as,
            reverse,
            findFirstIndex(predicate),
            O.map(value => size(as) - value - 1)
        )


    }

    const everyIndex: IndexReaderCollection<URI>['everyIndex'] = predicate => as => {
        let result = true;
        pipe(
            as,
            forEachIndex((i,a) => {
                if (!predicate(i,a)) {
                    result = false
                    return false;
                }
                return true
            })
        )
        return result
    }
    const someIndex: IndexReaderCollection<URI>['someIndex'] = predicate => as => {
        let result = false;
        pipe(
            as,
            forEachIndex((i, a) => {
                if (predicate(i, a)) {
                    result = true
                    return false;
                }
                return true
            })
        )
        return result
    }

    return {
        someIndex,
        everyIndex,
        findFirstIndex,
        findLastIndex,
        findIndex,
        forEachIndex,
        getAt,
        existAt,
        ...options
    }
}