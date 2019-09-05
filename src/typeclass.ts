import { Kind, URIS, URIS2, URIS3, Kind2, Kind3, HKT } from 'fp-ts/lib/HKT'
import { Subset } from './Subset'
import {
    pipe, PipeableFunctorWithIndex1, PipeableChain1, PipeableFilterableWithIndex1,
    PipeableFoldable1, PipeableAlt1, PipeableExtend1
} from 'fp-ts/lib/pipeable';
import { sequenceS } from 'fp-ts/lib/Apply'
import { Monoid } from 'fp-ts/lib/Monoid';
import { Monad1 } from 'fp-ts/lib/Monad';
import { foldM } from 'fp-ts/lib/Foldable'
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C } from 'fp-ts/lib/Applicative'
import { constant } from 'fp-ts/lib/function'
import { Unfoldable1 } from 'fp-ts/lib/Unfoldable'
import { Predicate } from 'fp-ts/lib/function'
import { PredicateWithIndex } from 'fp-ts/lib/FilterableWithIndex'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { Ord } from 'fp-ts/lib/Ord'
import { Eq } from 'fp-ts/lib/Eq'
import { Show } from 'fp-ts/lib/Show'
import { fromCompare, ordNumber } from 'fp-ts/lib/Ord'
import * as _Array from 'fp-ts/lib/Array'
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Witherable1 } from 'fp-ts/lib/Witherable'
import { TraversableWithIndex1 } from 'fp-ts/lib/TraversableWithIndex'
import * as R from 'fp-ts/lib/Record'
import { omit } from 'macoolka-object'
type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;
export interface GroupOption<A, B> {
    getValue: (a: A) => B
    show: Show<B>
}
export interface Typeclass<F extends URIS, I = number> extends Subset<F>,
    PipeableChain1<F> {
    /**
    * Returns a new `Collection` with values passed through a mapper function.
    *
    * @example
    * import { mapWithIndex } from 'fp-ts/lib/List'
    *
    * assert.deepStrictEqual(mapWithIndex((i,a)=>a+i)([1, 2, 3]), [1, 3, 5])
    *
    * @since 0.5.0
    */
    readonly mapWithIndex: PipeableFunctorWithIndex1<F, number>['mapWithIndex']

    /**
    * Returns a new `Collection` with values passed through a mapper function.
    *
    * @example
    * import { map } from 'fp-ts/lib/List'
    *
    * assert.deepStrictEqual(map(a=>a+1)([1, 2, 3]), [2, 3, 4])
    *
    * @since 0.5.0
    */
    readonly map: PipeableChain1<F>['map']
    readonly ap: PipeableChain1<F>['ap']
    readonly apFirst: PipeableChain1<F>['apFirst']
    readonly apSecond: PipeableChain1<F>['apSecond']
    readonly zero: Alternative1<F>['zero']
    readonly alt: PipeableAlt1<F>['alt']
    readonly chain: PipeableChain1<F>['chain']
    readonly chainFirst: PipeableChain1<F>['chainFirst']
    readonly flatten: PipeableChain1<F>['flatten']
    readonly reduce: PipeableFoldable1<F>['reduce']
    readonly foldMap: PipeableFoldable1<F>['foldMap']
    readonly reduceRight: PipeableFoldable1<F>['reduceRight']
    foldM<M extends URIS>(M: Monad1<M>): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind<M, B>) => Kind<M, B>;
    traverse_<M extends URIS3>(
        M: Applicative3<M>,

    ): <R, E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, void>
    traverse_<M extends URIS2>(
        M: Applicative2<M>,

    ): <E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
    traverse_<M extends URIS2, E>(
        M: Applicative2C<M, E>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
    traverse_<M extends URIS>(
        M: Applicative1<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<M, B>) => Kind<M, void>
    traverse_<M>(
        M: Applicative<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
    traverse_<M>(
        M: Applicative<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
    of: <A>(a: A) => Kind<F, A>
    sequenceT<T extends Array<Kind<F, any>>>(
        ...t: T & { 0: Kind<F, any> }
    ): Kind<F, any>
    sequenceS<NER extends Record<string, Kind<F, any>>>(r: EnforceNonEmptyRecord<NER>): Kind<F, {
        [K in keyof NER]: [NER[K]] extends [Kind<F, infer A>] ? A : never;
    }>;
    sequenceS<NER extends Record<string, Kind<F, any>>>(r: EnforceNonEmptyRecord<NER>): Kind<F, any>;
    readonly unfold: <A, B>(b: B, f: (b: B) => O.Option<[A, B]>) => Kind<F, A>;

    readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
    readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
    readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B

    readonly filter: PipeableFilterableWithIndex1<F, number>['filter']

    readonly filterMap: PipeableFilterableWithIndex1<F, number>['filterMap']
    readonly partition: PipeableFilterableWithIndex1<F, number>['partition']


    readonly partitionMap: PipeableFilterableWithIndex1<F, number>['partitionMap']

    readonly compact: PipeableFilterableWithIndex1<F, number>['compact']
    readonly separate: PipeableFilterableWithIndex1<F, number>['separate']
    readonly sequence: Witherable1<F>['sequence']
    readonly traverse: Witherable1<F>['traverse']
    readonly wilt: Witherable1<F>['wilt']
    readonly wither: Witherable1<F>['wither']
    readonly traverseWithIndex: TraversableWithIndex1<F, number>['traverseWithIndex']



    readonly filterWithIndex: PipeableFilterableWithIndex1<F, number>['filterWithIndex']


    readonly filterMapWithIndex: PipeableFilterableWithIndex1<F, number>['filterMapWithIndex']

    readonly partitionWithIndex: PipeableFilterableWithIndex1<F, number>['partitionWithIndex']

    readonly partitionMapWithIndex: PipeableFilterableWithIndex1<F, number>['partitionMapWithIndex']

    readonly extend: PipeableExtend1<F>['extend']
    readonly duplicate: PipeableExtend1<F>['duplicate']

    /**
      * Extracts from an list of `Either` all the `Right` elements. All the `Right` elements are extracted in order
      *
      * @example
      * import { rights } from 'fp-ts/lib/List'
      * import { right, left } from 'fp-ts/lib/Either'
      *
      * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
      *
      * @since 0.5.0
      */
    rights<E, A>(as: Kind<F, E.Either<E, A>>): Kind<F, A>

    /**
     * Extracts from an list of `Either` all the `Left` elements. All the `Left` elements are extracted in order
     *
     * @example
     * import { lefts } from 'fp-ts/lib/List'
     * import { left, right } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
     *
     * @since 0.5.0
     */
    lefts<E, A>(as: Kind<F, E.Either<E, A>>): Kind<F, E>
    /**
      * Sort the elements of an list in increasing order, creating a new list
      *
      * @example
      * import { sort } from 'fp-ts/lib/List'
      * import { ordNumber } from 'fp-ts/lib/Ord'
      *
      * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
      *
      * @since 0.5.0
      */

    sort<A>(O: Ord<A>): (as: Kind<F, A>) => Kind<F, A>

    /**
     * Sort the elements of an list in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
     * etc...
     *
     * @example
     * import { sortBy } from 'fp-ts/lib/List'
     * import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'
     *
     * interface Person {
     *   name: string
     *   age: number
     * }
     * const byName = ord.contramap(ordString, (p: Person) => p.name)
     * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
     *
     * const sortByNameByAge = sortBy([byName, byAge])
     *
     * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
     * assert.deepStrictEqual(sortByNameByAge(persons), [
     *   { name: 'a', age: 1 },
     *   { name: 'b', age: 2 },
     *   { name: 'b', age: 3 },
     *   { name: 'c', age: 2 }
     * ])
     *
     * @since 0.5.0
     */
    sortBy<A>(ords: Array<Ord<A>>): (as: Kind<F, A>) => Kind<F, A>

    /**
      * Returns the maximum value in this `collection`. 
      * If any values are comparatively equivalent, the first one found will be returned.
      *
      * @example
      * import { max } from 'fp-ts/lib/List'
      * import { ordNumber } from 'fp-ts/lib/Ord'
      *
      * assert.deepStrictEqual(max(ordNumber)([3, 2, 1]), 3)
      *
      * @since 0.5.0
      */
    max<A>(O: Ord<A>): (as: Kind<F, A>) => O.Option<A>

    /**
     * Like max, but also accepts a comparatorValueMapper which allows for comparing by more sophisticated means:
     * Compare the elements of an list in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
     * etc...
     *
     * @example
     * import { maxBy } from 'fp-ts/lib/List'
     * import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'
     *
     * interface Person {
     *   name: string
     *   age: number
     * }
     * const byName = ord.contramap(ordString, (p: Person) => p.name)
     * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
     *
     * const maxByNameByAge = maxBy([byName, byAge])
     *
     * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
     * assert.deepStrictEqual(sortByNameByAge(persons), 
     *   { name: 'c', age: 2 }
     * )
     *
     * @since 0.5.0
     */
    maxBy<A>(ords: Array<Ord<A>>): (as: Kind<F, A>) => O.Option<A>

    /**
      * Returns the minimum value in this `collection`. 
      * If any values are comparatively equivalent, the first one found will be returned.
      *
      * @example
      * import { min } from 'fp-ts/lib/List'
      * import { ordNumber } from 'fp-ts/lib/Ord'
      *
      * assert.deepStrictEqual(min(ordNumber)([3, 2, 1]), 1)
      *
      * @since 0.5.0
      */
    min<A>(O: Ord<A>): (as: Kind<F, A>) => O.Option<A>


    /**
     * Like min, but also accepts a Array which allows for comparing by more sophisticated means:
     * Compare the elements of an list in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
     * etc...
     *
     * @example
     * import { minBy } from 'fp-ts/lib/List'
     * import { ord, ordString, ordNumber } from 'fp-ts/lib/Ord'
     *
     * interface Person {
     *   name: string
     *   age: number
     * }
     * const byName = ord.contramap(ordString, (p: Person) => p.name)
     * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
     *
     * const minByNameByAge = minBy([byName, byAge])
     *
     * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
     * assert.deepStrictEqual(sortByNameByAge(persons), 
     *   { name: 'a', age: 1 }
     * )
     *
     * @since 0.5.0
     */
    minBy<A>(ords: Array<Ord<A>>): (as: Kind<F, A>) => O.Option<A>


    /**
     * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new list.
     * 
     * If one input list is short, excess elements of the longer list are discarded.
     *
     * @example
     * import { zipWith } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
     *
     * @since 0.5.0
     */
    zipWith<A, B, C>(fa: Kind<F, A>, fb: Kind<F, B>, f: (a: A, b: B) => C): Kind<F, C>

    /**
     * Takes two arrays and returns an list of corresponding pairs. If one input list is short, excess elements of the
     * longer list are discarded
     *
     * @example
     * import { zip } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
     *
     * @since 0.5.0
     */
    zip<A, B>(fa: Kind<F, A>, fb: Kind<F, B>): Kind<F, [A, B]>
    /**
     * The function is reverse of `zip`. Takes an list of pairs and return two corresponding arrays
     *
     * @example
     * import { unzip } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
     *
     * @since 0.5.0
     */
    unzip<A, B>(as: Kind<F, [A, B]>): [Kind<F, A>, Kind<F, B>]

    /**
     * Rotate an list to the right by `n` steps
     *
     * @example
     * import { rotate } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
     *
     * @since 0.5.0
     */
    rotate(n: number): <A>(as: Kind<F, A>) => Kind<F, A>

    /**
     * Test if a value is a member of an list. Takes a `Eq<A>` as a single
     * argument which returns the function to use to search for a value of type `A` in
     * an list of type `Kind<F, A>`.
     *
     * @example
     * import { includes } from 'fp-ts/lib/List'
     * import { eqNumber } from 'fp-ts/lib/Eq'
     *
     * assert.strictEqual(includes(eqNumber)(1, [1, 2, 3]), true)
     * assert.strictEqual(includes(eqNumber)(4, [1, 2, 3]), false)
     *
     * @since 0.5.0
     */
    includes<A>(E: Eq<A>): (a: A, as: Kind<F, A>) => boolean

    /**
     * Remove duplicates from an list, keeping the first occurance of an element.
     *
     * @example
     * import { uniq } from 'fp-ts/lib/List'
     * import { eqNumber } from 'fp-ts/lib/Eq'
     *
     * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
     *
     * @since 0.5.0
     */
    uniq<A>(E: Eq<A>): (as: Kind<F, A>) => Kind<F, A>


    /**
     * Creates an list of unique values, in order, from all given arrays using a `Eq` for equality comparisons
     *
     * @example
     * import { union } from 'fp-ts/lib/List'
     * import { eqNumber } from 'fp-ts/lib/Eq'
     *
     * assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
     *
     * @since 0.5.0
     */
    union<A>(E: Eq<A>): (xs: Kind<F, A>, ys: Kind<F, A>) => Kind<F, A>

    /**
     * Creates an list of unique values that are included in all given arrays using a `Eq` for equality
     * comparisons. The order and references of result values are determined by the first list.
     *
     * @example
     * import { intersection } from 'fp-ts/lib/List'
     * import { eqNumber } from 'fp-ts/lib/Eq'
     *
     * assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
     *
     * @since 0.5.0
     */
    intersection<A>(E: Eq<A>): (xs: Kind<F, A>, ys: Kind<F, A>) => Kind<F, A>
    /**
     * Creates an list of list values not included in the other given list using a `Eq` for equality
     * comparisons. The order and references of result values are determined by the first list.
     *
     * @example
     * import { difference } from 'fp-ts/lib/List'
     * import { eqNumber } from 'fp-ts/lib/Eq'
     *
     * assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
     *
     * @since 0.5.0
     */
    difference<A>(E: Eq<A>): (xs: Kind<F, A>, ys: Kind<F, A>) => Kind<F, A>

    toRecord<A extends Record<string, any>, K extends keyof A>(key: K): (as: Kind<F, A>) => Record<string, Omit<A, K>>

    fromRecord<K extends string>(key: K): <A extends Record<string, any>>(as: Record<string, A>) => Kind<F, A & { [key in K]: string }>

    scanLeft<A, B>(b: B, f: (b: B, a: A) => B): (as: Kind<F, A>) => Kind<F, B>
    /**
     * Fold an list from the right, keeping all intermediate results instead of only the final result
     *
     * @example
     * import { scanRight } from 'fp-ts/lib/List'
     *
     * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
     *
     * @since 0.5.0
     */
    scanRight<A, B>(b: B, f: (a: A, b: B) => B): (as: Kind<F, A>) => Kind<F, B>

    /**
     * Array comprehension
     *
     * ```
     * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
     * ```
     *
     * @example
     * import { comprehension } from 'fp-ts/lib/Array'
     * import { tuple } from 'fp-ts/lib/function'
     *
     * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
     *   [1, 'a'],
     *   [1, 'b'],
     *   [3, 'a'],
     *   [3, 'b']
     * ])
     *
     * @since 2.0.0
     */
    comprehension<A, B, C, D, R>(
        input: [Kind<F, A>, Kind<F, B>, Kind<F, C>, Kind<F, D>],
        f: (a: A, b: B, c: C, d: D) => R,
        g?: (a: A, b: B, c: C, d: D) => boolean
    ): Kind<F, R>
    comprehension<A, B, C, R>(
        input: [Kind<F, A>, Kind<F, B>, Kind<F, C>],
        f: (a: A, b: B, c: C) => R,
        g?: (a: A, b: B, c: C) => boolean
    ): Kind<F, R>
    comprehension<A, R>(input: [Kind<F, A>], f: (a: A) => R, g?: (a: A) => boolean): Kind<F, R>
    comprehension<A, B, R>(
        input: [Kind<F, A>, Kind<F, B>],
        f: (a: A, b: B) => R,
        g?: (a: A, b: B) => boolean
    ): Kind<F, R>
    comprehension<A, R>(input: [Kind<F, A>], f: (a: A) => boolean, g?: (a: A) => R): Kind<F, R>
    comprehension<R>(
        input: [F, Kind<F, any>],
        f: (...xs: any[]) => R,
        g: (...xs: any[]) => boolean
    ): Kind<F, R>

    /**
     * A useful recursion pattern for processing an `collection` to produce a new `collection`, often used for "chopping" up the input
     * `collection`. Typically chop is called with some function that will consume an initial prefix of the array and produce a
     * value and the rest of the array.
     *
     * @example
     * import { Eq, eqNumber } from 'fp-ts/lib/Eq'
     * import { chop, spanLeft } from 'fp-ts/lib/Array'
     *
     * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
     *   return chop(as => {
     *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
     *     return [init, rest]
     *   })
     * }
     * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
     *
     * @since 2.0.0
     */
    chop<A, B>(f: (as: Kind<F, A>) => [B, Kind<F, A>]): (as: Kind<F, A>) => Kind<F, B>

    foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: Kind<F, A>) => B): (as: Kind<F, A>) => B
    foldRight<A, B>(onNil: () => B, onCons: (init: Kind<F, A>, last: A) => B): (as: Kind<F, A>) => B
    /**
     * Group by a mehtod
     * @example
     * pipe(
     *   from([1, 1, 2, 1, 1, 3, 3, 4]),
     *   groupByOption({ getValue: (a: number) => a, show: showNumber }),
     *   expect({
     *       '1': from([1, 1, 1, 1]),
     *       '2': from([2]),
     *       '3': from([3, 3]),
     *       '4': from([4])
     *   }).toEqual
     * )
     * 
     */
    groupBy<A, B>({ getValue, show: { show } }: GroupOption<A, B>): (as: Kind<F, A>) => Record<string, Kind<F, A>>
    getShow<A>(S: Show<A>): Show<Kind<F, A>>
    getEq: <A>(eq: Eq<A>) => Eq<Kind<F, A>>
    getMonoid: <A = never>() => Monoid<Kind<F, A>>
    getOrd: <A>(O: Ord<A>) => Ord<Kind<F, A>>

    collection: Monad1<F> & Unfoldable1<F> & Alternative1<F>
    & Witherable1<F> & TraversableWithIndex1<F, number>
}



type IndexAToB<A, B, I = number> = (i: I, a: A) => B;
type AToB<A, B> = (a: A) => B;
const indexAToA = <A, B>(fai: AToB<A, B>): IndexAToB<A, B> => {
    return (_, a) => fai(a)
}

const swip = <A, B, C>(f: ((a: A, b: B) => C)) =>
    (b: B, a: A) => f(a, b)

export function initTypeclass<F extends URIS>(option: Subset<F>): Typeclass<F> {
    const { from, forEachIndex, slice, URI, toArray, size, getAt,
        first, last, notEmpty,  empty, snoc,everyIndex, findFirstIndex } = option

    function mapWithIndex<A, B>(mapper: (i: number, a: A) => B): (fa: Kind<F, A>) => Kind<F, B> {
        return fa => {
            const container: B[] = []
            pipe(
                fa,
                forEachIndex<A>((index,a) => {
                    container.push(mapper(index, a))
                    return true
                })

            )
            return from(container)
        }
    }
    function map<A, B>(mapper: (a: A) => B): (as: Kind<F, A>) => Kind<F, B> {
        return pipe(
            mapper,
            indexAToA,
            mapWithIndex,
        )

    }

    const ap = <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>): Kind<F, B> => {

        return pipe(
            fab,
            map(ab =>
                pipe(
                    fa,
                    map(ab)
                )
            ),
            flatten
        )
    }
    const chain: Typeclass<F>['chain'] = f => ma => {
        return pipe(
            ma,
            map(f),
            flatten
        )

    }
    const of: Typeclass<F>['of'] = a => from([a])

    const apFirst: Typeclass<F>['apFirst'] = fb => fa =>
        collection.ap(collection.map(fa, a => (_: any) => a), fb)

    // collection.ap(collection.map(fa,a=>()=>a),fb)


    // = fb => fa => I.ap(I.map(fa, a => () => a), fb)
    const apSecond: Typeclass<F>['apSecond'] = fb => fa =>
        collection.ap(collection.map(fa, _ => (value: any) => value), fb)
    const chainFirst: Typeclass<F>['chainFirst'] = _ => fa => fa
    const flatten: Typeclass<F>['flatten'] = mma => {
        const result: any[] = []
        pipe(
            mma,
            map(
                pipe(
                    map(a => {
                        result.push(a)
                    })
                )
            )
        )
        return from(result);
    }
    const sequenceT: Typeclass<F>['sequenceT'] = (...args) => {

        const fst = args[0]
        const others = args.slice(1)
        let fas: Kind<F, Array<any>> = collection.map(fst, a => [a])
        for (const fa of others) {
            fas = collection.ap(
                collection.map(fas, as => (a: any) => {
                    as.push(a)
                    return as
                }),
                fa
            )
        }
        return flatten(fas as any)
    }
    const reduceWithIndex: Typeclass<F>['reduceWithIndex'] = (b, f) => as => {
        let result = b;
        pipe(
            as,
            mapWithIndex((i, a) => {
                result = f(i, result, a)
            })
        )
        return result;
    }
    const reduceRightWithIndex: Typeclass<F>['reduceRightWithIndex'] = (b, f) => as => {
        let result = b;
        pipe(
            as,
            mapWithIndex((i, a) => {
                result = f(i, a, result)
            })
        )
        return result;
    }


    const foldMapWithIndex: Typeclass<F>['foldMapWithIndex'] = m => f => as => {
        return pipe(
            as,
            reduceWithIndex(m.empty, (i, b, a) => {
                return m.concat(b, f(i, a))
            })
        )

    }
    const reduce: Typeclass<F>['reduce'] = (b, f) => as => {
        let result = b;
        pipe(
            as,
            map(a => {
                result = f(result, a)
            })
        )
        return result;
    }
    const reduceRight: Typeclass<F>['reduceRight'] = (b, f) => as =>

        reduce(b, swip(f))(as)

    const foldMap: Typeclass<F>['foldMap'] = m => f => as => {
        return pipe(
            as,
            reduce(m.empty, (b, a) => {
                return m.concat(b, f(a))
            })
        )

    }
    function traverse_<M extends URIS3>(
        M: Applicative3<M>,

    ): <R, E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, void>
    function traverse_<M extends URIS2>(
        M: Applicative2<M>,

    ): <E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
    function traverse_<M extends URIS2, E>(
        M: Applicative2C<M, E>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
    function traverse_<M extends URIS>(
        M: Applicative1<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<M, B>) => Kind<M, void>
    function traverse_<M>(
        M: Applicative<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
    function traverse_<M>(
        M: Applicative<M>,

    ): <A, B>(fa: Kind<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> {
        const applyFirst = <B>(mu: HKT<M, void>, mb: HKT<M, B>): HKT<M, void> => M.ap(M.map(mu, constant), mb)
        const mu: HKT<M, void> = M.of(undefined)
        return (fa, f) => collection.reduce(fa, mu, (mu, a) => applyFirst(mu, f(a)))
    }
    const unfold: Typeclass<F>['unfold'] = (b, f) => {
        let ret: Array<any> = []
        let bb = b
        while (true) {
            const mt = f(bb)
            if (O.isSome(mt)) {
                const [a, b] = mt.value
                ret.push(a)
                bb = b
            } else {
                break
            }
        }
        return from(ret)
    }
    const partitionWithIndex: Typeclass<F>['partitionWithIndex'] = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (fa: Kind<F, A>) => {


        const left: A[] = []
        const right: A[] = []
        pipe(
            fa,
            mapWithIndex((i, a) => {
                pipe(
                    predicateWithIndex(i, a),
                    (result) => result ? right.push(a) : left.push(a)
                )
            })
        )
        return {
            left: from(left),
            right: from(right)
        }


    }

    const filterWithIndex: Typeclass<F>['filterWithIndex'] = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (fa: Kind<F, A>) => {
        const result: any[] = [];
        pipe(
            fa,
            mapWithIndex((i, a) => {
                pipe(
                    predicateWithIndex(i, a),
                    (value) => {
                        if (value) {
                            result.push(a)
                        }
                    }
                )
            })
        )
        return from(result)
    }

    const partitionMapWithIndex: Typeclass<F>['partitionMapWithIndex'] = f => fa => {
        const left: any[] = [];
        const right: any[] = [];
        pipe(
            fa,
            mapWithIndex((i, a) => {
                pipe(
                    f(i, a),
                    E.fold(l => left.push(l), r => right.push(r))

                )
            })
        )
        return { left: from(left), right: from(right) }
    }
    const filterMapWithIndex: Typeclass<F>['filterMapWithIndex'] = f => fa => {
        const result: any[] = [];
        pipe(
            fa,
            mapWithIndex((i, a) => {
                pipe(
                    f(i, a),
                    (value) => {
                        if (O.isSome(value)) {
                            result.push(value.value)
                        }
                    }
                )
            })
        )
        return from(result)
    }

    const filter: Typeclass<F>['filter'] = <A>(predicate: Predicate<A>) => (fa: Kind<F, A>) => {

        const result: any[] = [];
        pipe(
            fa,
            map(a => {
                pipe(
                    predicate(a),
                    (value) => {
                        if (value) {
                            result.push(a)
                        }
                    }
                )
            })
        )
        return from(result)

    }
    const filterMap: Typeclass<F>['filterMap'] = f => as =>
        pipe(
            as,
            filterMapWithIndex((_, a) => f(a))
        )


    const partition: Typeclass<F, number>['partition'] = <A>(predicate: Predicate<A>) => (fa: Kind<F, A>) => {
        const left: A[] = []
        const right: A[] = []
        pipe(
            fa,
            map((a) => {
                pipe(
                    predicate(a),
                    (result) => result ? right.push(a) : left.push(a)
                )
            })
        )
        return {
            left: from(left),
            right: from(right)
        }

    }


    const partitionMap: Typeclass<F>['partitionMap'] = f => as =>
        pipe(
            as,
            partitionMapWithIndex((_, a) => f(a))
        )
    const compact: Typeclass<F>['compact'] = fa => pipe(fa,
        filterMap(a => a)
    )

    const separate: Typeclass<F>['separate'] = fa => pipe(
        fa,
        partitionMap(a => a)
    )

    const traverse: Typeclass<F>['traverse'] = <T>(App: Applicative<T>) =>
        <A, B>(ta: Kind<F, A>, f: (a: A) => HKT<T, B>): HKT<T, Kind<F, B>> => {
            const traverseWithIndexF = traverseWithIndex(App)
            return traverseWithIndexF(ta, (_, a) => f(a))
        }

    const traverseWithIndex: Typeclass<F>['traverseWithIndex'] = <T>(App: Applicative<T>) =>
        <A, B>(ta: Kind<F, A>, f: (i: number, a: A) => HKT<T, B>): HKT<T, Kind<F, B>> => {
            return pipe(
                ta,
                reduceWithIndex(
                    App.of(zero()),
                    (i, fbs, a) => {
                        return App.ap(
                            App.map(fbs,
                                bs => (b: B) => {
                                    return snoc(b)(bs)
                                }), f(i, a)
                        )
                        // const result= f(i,a)
                    }

                )

            )
        }

    const sequence: Typeclass<F>['sequence'] = <T>(App: Applicative<T>) =>
        <A>(ta: Kind<F, HKT<T, A>>): HKT<T, Kind<F, A>> => {
            return pipe(
                ta,
                reduce(
                    App.of(empty()),
                    (fas, fa) =>
                        App.ap(App.map(fas, as => (a: A) => snoc(a)(as)), fa))
            )


        }
    const wilt: Typeclass<F>['wilt'] = <T>(App: Applicative<T>) =>
        <A, B, C>(ta: Kind<F, A>, f: (a: A) => HKT<T, E.Either<B, C>>) => {
            const traverseF = traverse(App)
            return App.map(traverseF(ta, f), separate)

        }
    const wither: Typeclass<F>['wither'] = <T>(App: Applicative<T>) =>
        <A, B>(ta: Kind<F, A>, f: (a: A) => HKT<T, O.Option<B>>) => {
            const traverseF = traverse(App)
            return App.map(traverseF(ta, f), compact)

        }
    const extend: Typeclass<F>['extend'] = f => fa => {
        return pipe(
            fa,
            mapWithIndex((i) => f(slice(i)(fa)))
        )
    }
    const duplicate: Typeclass<F>['duplicate'] = fa => {
        return pipe(
            fa,
            extend(a => a)
        )
    }
    const sort: Typeclass<F>['sort'] = (Ord) => (as) =>
        pipe(
            as,
            toArray,
            ar => ar.sort(Ord.compare),
            from,
        )
    const sortBy: Typeclass<F>['sortBy'] = (E) => as => {
        return from(_Array.sortBy(E)(toArray(as)))

    }
    const min: Typeclass<F>['min'] = (Ord) => (as) =>
        pipe(
            as,
            sort(Ord),
            first

        )
    const minBy: Typeclass<F>['minBy'] = (Ord) => (as) =>
        pipe(
            as,
            sortBy(Ord),
            first
        )
    const max: Typeclass<F>['max'] = (Ord) => (as) =>
        pipe(
            as,
            sort(Ord),
            last

        )
    const maxBy: Typeclass<F>['maxBy'] = (Ord) => (as) =>
        pipe(
            as,
            sortBy(Ord),
            first
        )
    const zipWith: Typeclass<F>['zipWith'] = (fa, fb, f) => {
        const fc = []
        const len = Math.min(size(fa), size(fb))
        for (let i = 0; i < len; i++) {
            const va = getAt(i)(fa)
            const vb = getAt(i)(fb)
            if (O.isNone(va) || O.isNone(vb)) {
                throw new Error(`The given index ${i} not exist `)
            }
            fc[i] = f(va.value, vb.value)
        }
        return from(fc)

    }

    const rotate: Typeclass<F>['rotate'] = i => as => {
        return from(_Array.rotate(i)(toArray(as)))
    }
    const zip: Typeclass<F>['zip'] = (fa, fb) => {
        return zipWith(fa, fb, (a, b) => [a, b])
    }


    const unzip: Typeclass<F>['unzip'] = (as) => {
        const fa = []
        const fb = []
        const ar = toArray(as)
        for (let i = 0; i < ar.length; i++) {
            fa[i] = ar[i][0]
            fb[i] = ar[i][1]
        }

        return [from(fa), from(fb)]

    }




    const includes: Typeclass<F>['includes'] = (E) => (a, as) => {

        const predicate = (element: any) => E.equals(element, a)
        return O.isSome(findFirstIndex(predicate)(as))
    }

    const uniq: Typeclass<F>['uniq'] = (E) => as => {

        return from(_Array.uniq(E)(toArray(as)))


    }
    const union: Typeclass<F>['union'] = (E) => (xs, ys) => {
        return from(_Array.union(E)(toArray(xs), toArray(ys)))

    }
    const intersection: Typeclass<F>['intersection'] = (E) => (xs, ys) => {
        return from(_Array.intersection(E)(toArray(xs), toArray(ys)))

    }

    const difference: Typeclass<F>['difference'] = (E) => (xs, ys) => {
        return from(_Array.difference(E)(toArray(xs), toArray(ys)))

    }



    const scanLeft: Typeclass<F>['scanLeft'] = (b, f) => as => {
        return from(_Array.scanLeft(b, f)(toArray(as)))

    }
    const scanRight: Typeclass<F>['scanRight'] = (b, f) => as => {
        return from(_Array.scanRight(b, f)(toArray(as)))

    }

    const concat = <A>(x: Kind<F, A>, y: Kind<F, A>) => from(toArray(x).concat(toArray(y)))

    const getMonoid: Typeclass<F>['getMonoid'] = <A>() => {
        return {
            concat: (x: Kind<F, A>, y: Kind<F, A>) => concat(x, y),
            empty: empty(),
        }
    }
    const getEq: Typeclass<F>['getEq'] = (eq) => {
        return {
            equals: (xs, ys) => size(xs) === size(ys) && pipe(
                xs,
                everyIndex((i,a) => {
                    return pipe(
                        ys,
                        getAt(i),
                        O.map(value => eq.equals(value, a)),
                        O.getOrElse((): boolean => false)
                    )

                })
            )
        }
    }
    const getOrd: Typeclass<F>['getOrd'] = (Ord) => {
        return fromCompare((a, b) => {
            const aLen = size(a)
            const bLen = size(b)

            const len = Math.min(aLen, bLen)
            for (let i = 0; i < len; i++) {
                const va = getAt(i)(a)
                if (O.isNone(va)) {
                    return -1
                }
                const vb = getAt(i)(b)
                if (O.isNone(vb)) {
                    return 1
                }

                const ordering = Ord.compare(va.value, vb.value)
                if (ordering !== 0) {
                    return ordering
                }
            }
            return ordNumber.compare(aLen, bLen)
        })
    }
    const getShow: Typeclass<F>['getShow'] = (S) => {
        return {
            show: as => `[${
                pipe(
                    as,
                    map(S.show),
                    toArray
                )
                    .join(', ')
                }]`
        }
    }

    const rights: Typeclass<F>['rights'] = as => {
        const result: any[] = []
        pipe(
            as,
            map(a => {
                if (E.isRight(a)) {
                    result.push(a.right)
                }
            })
        )
        return from(result)
    }

    const lefts: Typeclass<F>['lefts'] = as => {
        const result: any[] = []
        pipe(
            as,
            map(a => {
                if (E.isLeft(a)) {
                    result.push(a.left)
                }
            })
        )
        return from(result)
    }
    const foldLeft = <A, B>(onNil: () => B, onCons: (head: A, tail: Kind<F, A>) => B) => (as: Kind<F, A>): B => {
        return pipe(
            as,
            first,
            O.map(head => {
                return onCons(head, slice(1)(as))
            }),
            O.getOrElse(() => {
                return onNil()
            })
        )
    }
    const foldRight = <A, B>(onNil: () => B, onCons: (init: Kind<F, A>, last: A) => B) => (as: Kind<F, A>): B => {
        return pipe(
            as,
            last,
            O.map(value => {
                return onCons(slice(0, size(as) - 1)(as), value)
            }),
            O.getOrElse(() => {
                return onNil()
            })
        )
    }

    const chop: Typeclass<F>['chop'] = f => as => {

        let result = zero<any>()
        let cs = as
        while (notEmpty(cs)) {
            const [b, c] = f(cs)
            result = snoc(b)(result)
            cs = c
        }
        return result

    }


    const groupByOption: Typeclass<F>['groupBy'] =
        <A, B>({ getValue, show: { show } }: GroupOption<A, B>) => (as: Kind<F, A>): Record<string, Kind<F, A>> => {


            const result: Record<string, Kind<F, A>> = {};
            const add = (a: A) => {
                const b = getValue(a)
                const key = show(b)
                pipe(
                    O.fromNullable(result[key]),
                    O.fold(() => {
                        result[key] = from([a])
                    }, bs => {
                        result[key] = snoc(a)(bs)
                    })
                )

            }

            pipe(
                as,
                map(add)

            )
            return result

        }
    const toRecord: Typeclass<F>['toRecord'] = key => as => {
        return pipe(
            as,
            reduce({} as any, (b, a) => ({ ...b, [a[key]]: omit(a, [key]) }))
        )
    }
    const fromRecord: Typeclass<F>['fromRecord'] = (key) => as => {
        return pipe(
            as,
            R.reduceWithIndex(
                empty() as any,
                (k, b, a) => ([...b, { ...a, [key]: k }])
            )

        )
    }
    const comprehension: Typeclass<F>['comprehension'] = <R>(
        input: Array<any>,
        f: (...xs: any[]) => R,
        g: (...xs: any[]) => boolean = () => true
    ): Kind<F, R> => {
        const go = (scope: Kind<F, any>, input: Array<Kind<F, any>>): Kind<F, R> => {
            if (input.length === 0) {
                return g(...scope) ? of(f(...scope)) : empty()
            } else {
                return collection.chain(input[0], x => go(snoc(x)(scope), input.slice(1)))
            }
        }
        return go(empty(), input)
    }
    const zero: Typeclass<F>['zero'] = () => empty()
    const alt: Typeclass<F>['alt'] = fy => fx => concat(fx, fy())
    const collection: Typeclass<F>['collection'] = {
        URI,
        of: a => of(a),
        map: (as, a) => map(a)(as),
        mapWithIndex: (as, f) => mapWithIndex(f)(as),
        ap: (fab, fa) => ap(fa)(fab),
        chain: (fa, f) => chain(f)(fa),
        reduce: (as, b, f) => reduce(b, f)(as),
        reduceRight: (as, b, f) => reduceRight(b, f)(as),
        foldMap: M => (as, f) => foldMap(M)(f)(as),
        reduceWithIndex: (fa, b, f) => reduceWithIndex(b, f)(fa),
        reduceRightWithIndex: (fa, b, f) => reduceRightWithIndex(b, f)(fa),
        foldMapWithIndex: (M) => (fa, f) => foldMapWithIndex(M)(f)(fa),
        compact,
        separate,
        unfold,
        alt: (fx, fy) => alt(fy)(fx),
        zero,
        wilt,
        wither,
        traverse,
        sequence,
        partition: <A>(fa: Kind<F, A>, predicate: Predicate<A>) => partition(predicate)(fa),
        partitionMap: (fa, f) => partitionMap(f)(fa),
        filter: <A>(fa: Kind<F, A>, predicate: Predicate<A>) => filter(predicate)(fa),
        filterMap: (fa, f) => filterMap(f)(fa),
        traverseWithIndex,
    };
    return {
        zero,
        alt,
        sequenceS: sequenceS(collection),
        sequenceT: sequenceT,
        collection,
        foldM: M => foldM(M, collection),
        map,
        mapWithIndex,
        ap,
        apFirst,
        apSecond,
        chain,
        chainFirst,
        flatten,
        of,
        reduce,
        reduceRight,
        traverse_,
        foldMap,
        reduceWithIndex,
        reduceRightWithIndex,
        foldMapWithIndex,
        unfold,
        filter,
        filterMap,
        filterWithIndex,
        filterMapWithIndex,
        partition,
        partitionMap,
        partitionMapWithIndex,
        partitionWithIndex,
        compact,
        separate,
        sort,
        sortBy,
        min,
        minBy,
        max,
        maxBy,
        intersection,
        union,
        difference,
        zip,
        zipWith,
        unzip,
        uniq,
        includes,
        rotate,
        scanLeft,
        scanRight,
        getEq,
        getMonoid,
        getShow,
        getOrd,
        lefts,
        rights,
        foldLeft,
        foldRight,
        traverse,
        traverseWithIndex,
        sequence,
        wilt,
        wither,
        extend,
        duplicate,
        chop,
        groupBy: groupByOption,
        comprehension,
        toRecord,
        fromRecord,
        ...option
    }

}

