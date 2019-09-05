/**
 * Collection Write Interface
 * @desczh
 * 可写入集合接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { Option } from 'fp-ts/lib/Option'
import * as O from 'fp-ts/lib/Option'
import { IndexReaderCollection } from './IndexReaderCollection'
import { WriterCollection } from './WriterCollection'
import { pipe } from 'fp-ts/lib/pipeable';
/**
 * Collection Write Input Interface
 * @desczh
 * 可写入集合输入接口
 * @since 0.2.0
 */
export interface IndexWriteCollectionInput<URI extends URIS> {

    /**
      * Delete the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
      * @desczh
      * 删除一个指定位置的元素，返回删除后的集合
      * @example
      * import { deleteAt } from 'fp-ts/lib/Array'
      * import { some, none } from 'fp-ts/lib/Option'
      *
      * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
      * assert.deepStrictEqual(deleteAt(1)([]), none)
      *
      * @since 2.0.0
      */
    _deleteAt: <A>(i: number) => (as: Kind<URI, A>) => Kind<URI, A>
    /**
     * Change the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
     * @desczh
     * 修改一个指定位置的元素，返回修改后的集合
     * @example
     * import { setAt } from 'fp-ts/lib/Array'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(setAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
     * assert.deepStrictEqual(setAt(1, 1)([]), none)
     *
     * @since 2.0.0
     */
    _setAt: <A>(i: number, a: A) => (as: Kind<URI, A>) => Kind<URI, A>
    /**
      * Insert an element at the specified index, creating a new list, or returning `None` if the index is out of bounds
      * @desczh
      * 插入一个指定位置的元素，返回插入后的集合
      * @example
      * import { insertAt } from 'fp-ts/lib/List'
      * import { some } from 'fp-ts/lib/Option'
      *
      * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
      *
      * @since 0.5.0
      */
    _insertAt<A>(i: number, a: A): (as: Kind<URI, A>) => Kind<URI, A>

}
export interface IndexWriterCollection<F extends URIS> extends IndexWriteCollectionInput<F>, WriterCollection<F>, IndexReaderCollection<F> {
    /**
    * Delete the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
    * @desczh
    * 删除一个指定位置的元素，返回删除后的集合
    * @example
    * import { deleteAt } from 'fp-ts/lib/Array'
    * import { some, none } from 'fp-ts/lib/Option'
    *
    * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
    * assert.deepStrictEqual(deleteAt(1)([]), none)
    * 
    * @since 2.0.0
    */
    deleteAt: <A>(i: number) => (as: Kind<F, A>) => Option<Kind<F, A>>
    /**
     * Change the element at the specified index, creating a new collection, or returning `None` if the index is out of bounds
     * @desczh
     * 修改一个指定位置的元素，返回修改后的集合
     * @example
     * import { setAt } from 'fp-ts/lib/Array'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(setAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
     * assert.deepStrictEqual(setAt(1, 1)([]), none)
     *
     * @since 2.0.0
     */
    setAt: <A>(i: number, a: A) => (as: Kind<F, A>) => Option<Kind<F, A>>
    /**
      * Insert an element at the specified index, creating a new list, or returning `None` if the index is out of bounds
      * @desczh
      * 插入一个指定位置的元素，返回插入后的集合
      * @example
      * import { insertAt } from 'fp-ts/lib/List'
      * import { some } from 'fp-ts/lib/Option'
      *
      * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
      *
      * @since 0.5.0
      */
    insertAt<A>(i: number, a: A): (as: Kind<F, A>) => Option<Kind<F, A>>

    /**
     * Change the element at the specified index and current item, creating a new collection, or returning `None` if the index is out of bounds
     * @desczh
     * 修改一个指定位置的元素，返回修改后的集合
     * @example
     * import { updateAt } from 'fp-ts/lib/Array'
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(updateAt(1, a=>a+1)([1, 2, 3]), some([1, 3, 3]))
     *
     * @since 2.0.0
     */
    updateAt: <A>(i: number, updater: (a: A) => A) => (as: Kind<F, A>) => Option<Kind<F, A>>


    /**
     * Attaches an element to the front of an `Collection`, creating a new non empty `Collection`
     * @desczh
     * 插入一个元素到集合头,返回新集合.
     * @example
     * import { cons } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(cons(0)([1, 2, 3]), [0, 1, 2, 3])
     *
     * @since 2.0.0
     */

    cons: <A>(head: A) => (tail: Kind<F, A>) => Kind<F, A>
    /**
     * Append an element to the end of an `Collection`, creating a new `Collection`
     * @desczh
     * 插入一个元素到集合尾部,返回新集合.
     * @example
     * import { snoc } from 'fp-ts/lib/Array'
     *
     * assert.deepStrictEqual(snoc(4)([1, 2, 3]), [1, 2, 3, 4])
     *
     * @since 2.0.0
     */
    snoc: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>
    /**
   * Append an element to the end of an `Collection`, creating a new `Collection`
   * @alias snoc
   * @desczh
   * 插入一个元素到集合尾部,返回新集合.是snoc的别名.
   * @example
   * import { push } from 'fp-ts/lib/Array'
   *
   * assert.deepStrictEqual(push(4)([1, 2, 3]), [1, 2, 3, 4])
   *
   * @since 2.0.0
   */
    push: <A>(end: A) => (init: Kind<F, A>) => Kind<F, A>

}
export function initWriter<F extends URIS>(option: IndexReaderCollection<F> & IndexWriteCollectionInput<F>): IndexWriterCollection<F> {
    const { size, _insertAt, _deleteAt, getAt, _setAt, existAt, findIndex, _getAt } = option

    const insertAt: IndexWriterCollection<F>['insertAt'] = (i, a) => as => {
        return pipe(
            as,
            O.fromPredicate(as => i <= size(as) && i >= 0),
            O.map(
                pipe(
                    _insertAt(i, a)
                )

            )
        )
    }
    const deleteAt: IndexWriterCollection<F>['deleteAt'] = (i) => as => {
        return pipe(
            as,
            O.fromPredicate(existAt(i)),
            O.map(
                pipe(
                    _deleteAt(i)
                )

            )
        )
    }
    const setAt: IndexWriterCollection<F>['setAt'] = (i, a) => as => {
        return pipe(
            as,
            O.fromPredicate(existAt(i)),
            O.map(
                pipe(
                    _setAt(i, a)
                )

            )
        )
    }
    const cons: IndexWriterCollection<F>['cons'] = (head) => as => {
        return pipe(
            as,
            insertAt(0, head),

            O.getOrElse(() => as)
        )
    }

    const snoc: IndexWriterCollection<F>['cons'] = (end) => as => {
        return pipe(
            as,
            insertAt(size(as), end),

            O.getOrElse(() => as)
        )
    }
    const updateAt: IndexWriterCollection<F>['updateAt'] = (i, updater) => as => {
        return pipe(
            as,
            getAt(i),
            O.chain(value => {
                return pipe(
                    as,
                    setAt(i, updater(value))
                )
            })

        )
    }

    const deleteWith: IndexWriterCollection<F>['deleteWith'] = predicate => as => pipe(
        as,
        findIndex(predicate),
        indexs => {
            const ns = indexs.reverse()
            let store: Kind<F, any> = as;
            ns.map(i => {
                store = _deleteAt(i)(store)
            })

            return store
        }

    )
    const upateWith: IndexWriterCollection<F>['updateWith'] = (predicate, updater) => as => pipe(
        as,
        findIndex(predicate),
        indexs => {
            const ns = indexs.reverse()

            let store: Kind<F, any> = as;
            ns.map(i => {
                store = _setAt(i, updater(_getAt(i)(store)))(store)

            })

            return store
        }

    )


    return {
        cons,
        snoc,
        push: snoc,
        updateAt,
        insertAt,
        setAt,
        deleteWith,
        updateWith: upateWith,
        deleteAt,
        add: snoc,
        ...option
    }

}