/**
 * Collection Constructor Interface
 * @desczh
 * 构造集合接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
/**
 * Collection Constructor Input Interface
 * @desczh
 * 构造集合输入接口
 * @since 0.2.0
 */
export interface ConstructorCollectionInput<F extends URIS> {
    readonly URI: F,
    /**
     * Create a new `Collection` containing the values of the provided Iterable.
     * @desczh
     * 从迭代器中构建集合
     * @since 0.2.0
     */
    from: <A = never>(collection: Iterable<A>) => Kind<F, A>,
}
/**
 * Collection Constructor Interface
 * @desczh
 * 构造集合接口
 * @since 0.2.0
 */
export interface ConstructorCollection<F extends URIS> extends ConstructorCollectionInput<F> {
    /**
     * Return An empty `Collection`
     * @desczh
     * 空集合
     * @since 0.2.0
     */
    empty(): Kind<F, any>
    /**
    * Return a `Collection` of length `n` with element `i` initialized with `f(i)`
    * @desczh
    * 通过一个数字和函数构建集合
    * @example
    * import { makeBy } from 'fp-ts/lib/List'
    *
    * const double = (n: number): number => n * 2
    * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
    *
    * @since 0.2.0
    */

    makeBy<A>(n: number, f: (i: number) => A): Kind<F, A>
    /**
      * Create an `Collection` containing a range of integers, including both endpoints
      * @desczh
      * 通过一个范围和函数构建集合
      * @example
      * import { range } from 'fp-ts/lib/List'
      *
      * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
      *
      * @since 0.2.0
      */
    makeByRange(start: number, end: number): Kind<F, number>
    /**
     * Create an `Collection` containing a value repeated the specified number of times
     * @desczh
     * 通过重复的元素构建集合
     * @example
     * import { makeByRepeat } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(makeByRepeat(3, 'a'), ['a', 'a', 'a'])
     *
     * @since 0.2.0
     */
    makeByRepeat<A>(n: number, a: A): Kind<F, A>

}
export function initConstructor<URI extends URIS>({ from, URI }: ConstructorCollectionInput<URI>): ConstructorCollection<URI> {
    function empty(): Kind<URI, any> {
        return from<any>([])
    }

    function makeBy<A>(n: number, f: (i: number) => A): Kind<URI, A> {
        const r: Array<A> = []
        for (let i = 0; i < n; i++) {
            r.push(f(i))
        }
        return from(r)
    }

    function makeByRange(start: number, end: number): Kind<URI, number> {
        return makeBy(end - start + 1, i => start + i)
    }


    function makeByRepeat<A>(n: number, a: A): Kind<URI, A> {
        return makeBy(n, () => a)
    }
    return {
        URI,
        from,
        empty,
        makeBy,
        makeByRange,
        makeByRepeat,
    }
}
