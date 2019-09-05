/**
 * Collection Write Interface
 * @desczh
 * 可写入集合接口
 * @file
 * @since 0.2.0
 */
import { Kind, URIS } from 'fp-ts/lib/HKT'
import { ReaderCollection } from './ReaderCollection'
import { Predicate } from 'macoolka-predicate'

/**
 * Collection Write Input Interface
 * @desczh
 * 可写入集合输入接口
 * @since 0.2.0
 */
export interface WriteCollectionInput<URI extends URIS> {

    updateWith: <A>(predicate: Predicate<A>, updater: (a: A) => A) => (as: Kind<URI, A>) => Kind<URI, A>
    /**
     * delete the element wtih the specified condition,
     * creating a new collection.
     * @desczh
     * 删除一些满足条件的元素，返回删除后的集合
     * @example
     * import { deleteWith,from } from 'macoolka-array'
     * import { pipe } from 'fp-ts/lib/pipeable'
     *
     * pipe(
     *  from([1, 2, 3]),
     *  deleteWith(a => a === 2 || a===1),
     *  a => expect(a).toEqual(from([3]))
     * )
     *
     * @since 2.0.0
     */
    deleteWith: <A>(predicate: Predicate<A>) => (as: Kind<URI, A>) => Kind<URI, A>
  
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
  
    add: <A>(head: A) => (tail: Kind<URI, A>) => Kind<URI, A>
 
 

}
export interface WriterCollection<URI extends URIS> extends WriteCollectionInput<URI>, ReaderCollection<URI> {


}
export function initWriterCollection<F extends URIS>(option: WriteCollectionInput<F> & ReaderCollection<F>): WriterCollection<F> {
  return {
    ...option
  }

}