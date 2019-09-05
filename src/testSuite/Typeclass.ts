
import { Collection } from '../Collection'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { URIS } from 'fp-ts/lib/HKT'
import { getFunctorComposition } from 'fp-ts/lib/Functor'
import { pipe } from 'fp-ts/lib/pipeable';
import { monoidString, monoidSum, fold as foldMonoid } from 'fp-ts/lib/Monoid'
import { ordString, ordNumber, ord } from 'fp-ts/lib/Ord'
import { eq, Eq, eqNumber } from 'fp-ts/lib/Eq'
import { Basic, data } from './fixtures/basic'
import { getStructShow, showString, showNumber } from 'fp-ts/lib/Show'

import { Kind } from 'fp-ts/lib/HKT'
import * as I from 'fp-ts/lib/Identity'
function test  <F extends URIS>({
    _getAt,
    spanLeft,
    from,
    empty,
    of,
    reverse,
    size,
    collection,
    alt,
    zero,
    mapWithIndex,
    map,
    flatten,
    toArray,
    sequenceS,
    sequenceT,
    ap,
    apFirst,
    apSecond,
    chain,
    chainFirst,
    reduce,
    reduceRight,
    foldMap,
    foldM,
    reduceWithIndex,
    reduceRightWithIndex,
    foldMapWithIndex,
    unfold,
    compact,
    separate,
    filter,
    filterMap,
    filterMapWithIndex,
    filterWithIndex,
    partition,
    partitionMap,
    partitionMapWithIndex,
    partitionWithIndex,
    getEq,
    getOrd,
    getShow,
    getMonoid,
    rights,
    lefts,
    rotate,
    zip,
    zipWith,
    unzip,
    sort,
    sortBy,
    scanLeft,
    scanRight,
    uniq,
    intersection,
    union,
    difference,
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
    groupBy,
    comprehension,
    toRecord,
    fromRecord
}: Collection<F>) {
    const as = from([1, 2, 3])
    const toEqual = (a: any) => (b: any) => expect(a).toEqual(b)
    describe('Collection Reader', () => {
        it('alt', () => {
            expect(alt(() => from([3, 4]))(from([1, 2]))).toEqual(from([1, 2, 3, 4]))
            expect(collection.alt(from([1, 2]), () => from([3, 4]))).toEqual(from([1, 2, 3, 4]))
        })
        it('zero', () => {
            expect(zero()).toEqual(empty())
        })
        it('map', () => {
            pipe(
                as,
                map(n => n * 2),
                expect(from([2, 4, 6])).toEqual
            )
            pipe(
                from(Object.entries({name:'1',value:'2'})),
                map(([n]) => n),
                expect(from(['name','value'])).toEqual
            )
            pipe(
                empty(),
                map(n => n * 2),
                expect(empty()).toEqual
            )
            pipe(
                collection.map(as, n => n * 2),
                expect(from([2, 4, 6])).toEqual
            )
            pipe(
                collection.map(empty(), n => n * 2),
                expect(empty()).toEqual
            )
        })
        it('mapWithIndex', () => {
            pipe(
                as,
                mapWithIndex((i, n) => n * 2 + i),
                expect(from([2, 5, 8])).toEqual
            )
            pipe(
                collection.mapWithIndex(as, (i, n) => n * 2 + i),
                expect(from([2, 5, 8])).toEqual
            )
        })
        it('getFunctorComposition', () => {

            const L = getFunctorComposition(collection, O.option);
            const optionList = from([O.some(1), O.some(2), O.some(3), O.none])
            const result = L.map(optionList, a => a * 2)
            expect(result).toEqual(from([O.some(2), O.some(4), O.some(6), O.none]))

            const L1 = getFunctorComposition(O.option, collection);
            const optionList1 = O.some(as)
            const result1 = L1.map(optionList1, a => a * 2)

            if (O.isSome(result1)) {
                expect(result1.value).toEqual(from([2, 4, 6]))
            } else {
                throw new Error('can not none')
            }
        })

        it('ap', () => {
            pipe(

                from([(x: number) => x * 2, (x: number) => x * 3]),
                ap(from([1, 2, 3])),
                expect(from([2, 4, 6, 3, 6, 9])).toEqual
            )
            const as = collection.ap(from([(x: number) => x * 2, (x: number) => x * 3]), from([1, 2, 3]))
            expect(as).toEqual(from([2, 4, 6, 3, 6, 9]))
        })


        it('apFirst', () => {
            pipe(

                from([1]),
                apFirst(from([2])),
                expect(from([1])).toEqual
            )
        })
        it('apSecond', () => {
            pipe(

                from([1]),
                apSecond(from([2])),
                expect(from([2])).toEqual
            )
        })

        it('sequenceS', () => {
            pipe(
                {
                    a: from(['1']),
                    b: from([2])
                },
                sequenceS,
                expect(from([{ a: '1', b: 2 }])).toEqual
            )

        })
        it('sequenceT', () => {
            pipe(
                sequenceT(
                    from([1]),
                    from([2])
                ),
                toArray,
                expect([1, 2]).toEqual
            )

        })

        it('chain', () => {
            pipe(
                from([1, 2, 3]),
                chain(n => from([n, n + 1])),
                expect(from([1, 2, 2, 3, 3, 4])).toEqual
            )
            pipe(

                collection.chain(from([1, 2, 3]), n => from([n, n + 1])),
                expect(from([1, 2, 2, 3, 3, 4])).toEqual
            )

        })
        it('chainFirst', () => {
            pipe(

                from([1]),
                chainFirst(n => from([n, n + 1])),
                expect(from([1])).toEqual
            )

        })
        it('flatten', () => {
            pipe(
                from([from([1]), from([2]), from([3])]),
                flatten,
                toArray,
                expect([1, 2, 3]).toEqual
            )

        })
        it('reduce', () => {
            pipe(
                as,
                reduce('', (a, b) => a + b.toString()),
                expect('123').toEqual
            )
            pipe(

                collection.reduce(as, '', (a, b) => a + b.toString()),
                expect('123').toEqual
            )

        })
        it('reduceWithIndex', () => {
            pipe(
                as,
                reduceWithIndex('', (i, a, b) => i + a + b.toString()),
                expect('210123').toEqual
            )
            pipe(

                collection.reduceWithIndex(as, '', (i, a, b) => i + a + b.toString()),
                expect('210123').toEqual
            )
        })

        it('foldMap', () => {
            pipe(
                as,
                foldMap(monoidString)(a => a.toString()),
                expect('123').toEqual
            )
            pipe(
                empty(),
                foldMap(monoidString)(a => a.toString()),
                expect('').toEqual
            )
            pipe(

                collection.foldMap(monoidString)(as, a => a.toString()),
                expect('123').toEqual
            )
            pipe(

                collection.foldMap(monoidString)(empty(), a => a.toString()),
                expect('').toEqual
            )

        })
        it('foldMapWithIndex', () => {
            pipe(
                as,
                foldMapWithIndex(monoidString)((i, a) => i + a.toString()),
                expect('011223').toEqual
            )
            pipe(
                empty(),
                foldMapWithIndex(monoidString)(a => a.toString()),
                expect('').toEqual
            )
            pipe(

                collection.foldMapWithIndex(monoidString)(as, (i, a) => i + a.toString()),
                expect('011223').toEqual
            )
            pipe(

                collection.foldMapWithIndex(monoidString)(empty(), a => a.toString()),
                expect('').toEqual
            )

        })

        it('reduceRight', () => {
            pipe(
                as,
                reduceRight('', (b, a) => a + b.toString()),
                expect('123').toEqual
            )
            pipe(

                collection.reduceRight(as, '', (b, a) => a + b.toString()),
                expect('123').toEqual
            )

        })
        it('reduceRightWithIndex', () => {
            pipe(
                as,
                reduceRightWithIndex('', (i, b, a) => i + a + b.toString()),
                expect('210123').toEqual
            )
            pipe(

                collection.reduceRightWithIndex(as, '', (i, b, a) => i.toString() + a + b.toString()),
                expect('210123').toEqual
            )

        })
        it('foldM', () => {
            expect(foldM(O.option)(as, 0, (a, b) => O.some(a + b))).toEqual(O.some(6))

        })
        it('unfold', () => {
            const as = unfold(5, n => (n > 0 ? O.some([n, n - 1]) : O.none))
            expect(as).toEqual(from([5, 4, 3, 2, 1]))

        })
        it('compact', () => {
            expect(compact(empty())).toEqual(empty())
            const a = compact(from([O.some(1), O.some(2), O.none]))

            expect(a).toEqual(from([1, 2]))

        })

        it('separate', () => {
            expect(separate(empty())).toEqual({ left: empty(), right: empty() })
            expect(separate(from([E.left(123), E.right('123')]))).toEqual({ left: from([123]), right: from(['123']) })

        })

        it('filter', () => {

            const g = (n: number) => n % 2 === 1
            expect(filter(g)(as)).toEqual(from([1, 3]))

            pipe(
                [O.some(3), O.some(2), O.some(1)],
                from,
                filter(O.isSome),
                toArray,
                expect([O.some(3), O.some(2), O.some(1)]).toEqual
            )
            pipe(
                [O.some(3), O.some(2), O.some(1), O.none],
                from,
                filter(O.isSome),
                toArray,
                expect([O.some(3), O.some(2), O.some(1)]).toEqual
            )

        })

        it('filterWithIndex', () => {
            const f = (n: number) => n % 2 === 1
            pipe(
                as,
                filterWithIndex(f),
                expect(from([2])).toEqual
            )


        })

        it('filterMap', () => {
            const f = (n: number) => (n % 2 === 0 ? O.none : O.some(n))
            expect(filterMap(f)(as)).toEqual(from([1, 3]))

        })
        it('filterMapWithIndex', () => {
            const f = (n: number) => (n % 2 ? O.none : O.some(n))
            pipe(
                as,
                filterMapWithIndex(f),
                expect(from([0, 2])).toEqual
            )
        })
        it('partition', () => {
            const f = (n: number) => (n % 2 === 1)
            expect(partition(_ => true)(empty())).toEqual({ left: empty(), right: empty() })
            expect(partition(f)(as)).toEqual({ left: from([2]), right: from([1, 3]) })
        })
        it('partitionWithIndex', () => {
            const f = (n: number) => (n % 2 === 1)
            pipe(
                as,
                partitionWithIndex(f),
                expect({ left: from([1, 3]), right: from([2,]) }).toEqual
            )
        })
        it('partitionMap', () => {
            const f = (n: number) => (n % 2 === 0 ? E.left(n) : E.right(n))
            expect(partitionMap(_ => E.left(1))(empty())).toEqual({ left: empty(), right: empty() })
            expect(partitionMap(f)(as)).toEqual({ left: from([2]), right: from([1, 3]) })

        })
        it('partitionMapWithIndex', () => {
            const f = (n: number) => (n % 2 === 0 ? E.left(n) : E.right(n))
            pipe(
                as,
                partitionMapWithIndex(f),
                expect({ left: from([0, 2]), right: from([1]) }).toEqual
            )

        })
        it('getMonoid', () => {
            const M = getMonoid<number>()
            expect(M.concat(from([1, 2]), from([3, 4]))).toEqual(from([1, 2, 3, 4]))
            expect(M.concat(from([1, 2]), M.empty)).toEqual(from([1, 2]))
            expect(M.concat(M.empty, from([1, 2]))).toEqual(from([1, 2]))
        })

        it('getEq', () => {
            const O = getEq(ordString)
            expect(O.equals(from<string>([]), from<string>([]))).toEqual(true)
            expect(O.equals(from(['a']), from(['a']))).toEqual(true)
            expect(O.equals(from(['a', 'b']), from(['a', 'b']))).toEqual(true)
            expect(O.equals(from(['a']), from<string>([]))).toEqual(false)

        })

        it('getOrd', () => {
            const O = getOrd(ordString)
            expect(O.compare(from<string>([]), from<string>([]))).toEqual(0)
            expect(O.compare(from(['a']), from(['a']))).toEqual(0)

            expect(O.compare(from(['b']), from(['a']))).toEqual(1)
            expect(O.compare(from(['a']), from(['b']))).toEqual(-1)

            expect(O.compare(from(['a']), from<string>([]))).toEqual(1)
            expect(O.compare(from<string>([]), from(['a']))).toEqual(-1)
            expect(O.compare(from(['a', 'a']), from(['a']))).toEqual(1)
            expect(O.compare(from(['a', 'a']), from(['b']))).toEqual(-1)

            expect(O.compare(from(['a', 'a']), from(['a', 'a']))).toEqual(0)
            expect(O.compare(from(['a', 'b']), from(['a', 'b']))).toEqual(0)

            expect(O.compare(from(['a', 'a']), from(['a', 'b']))).toEqual(-1)
            expect(O.compare(from(['a', 'b']), from(['a', 'a']))).toEqual(1)

            expect(O.compare(from(['a', 'b']), from(['b', 'a']))).toEqual(-1)
            expect(O.compare(from(['b', 'a']), from(['a', 'a']))).toEqual(1)
            expect(O.compare(from(['b', 'a']), from(['a', 'b']))).toEqual(1)
            expect(O.compare(from(['b', 'b']), from(['b', 'a']))).toEqual(1)
            expect(O.compare(from(['b', 'a']), from(['b', 'b']))).toEqual(-1)
        })
        it('getShow', () => {
            const show = getStructShow<Basic>({
                id: showString,
                name: showString,

            })
            expect(getShow(show).show(from(data))).toMatchSnapshot()
            const S = getShow(showString)
            expect(S.show(from<string>([]))).toEqual(`[]`)
            expect(S.show(from(['a']))).toEqual(`["a"]`)
            expect(S.show(from(['a', 'b']))).toEqual(`["a", "b"]`)

        })
        it('rights', () => {
            pipe(
                rights(from([E.right(1), E.left('foo'), E.right(2)])),
                toArray,
                expect([1, 2]).toEqual
            )
            pipe(
                rights(empty()),
                toArray,
                expect([]).toEqual
            )
        })

        it('lefts', () => {
            pipe(
                lefts(from([E.right(1), E.left('foo'), E.right(2)])),
                toArray,
                expect(['foo']).toEqual
            )
            pipe(
                lefts(empty()),
                toArray,
                expect([]).toEqual
            )

        })


        it('rotate', () => {
            pipe(
                empty(),
                rotate(1),
                toArray,
                expect([]).toEqual
            )
            pipe(
                from([1, 2]),
                rotate(1),
                toArray,
                expect([2, 1]).toEqual
            )


        })
        it('zipWith', () => {
            pipe(

                zipWith(from([1, 2, 3]), from(['a', 'b', 'c', 'd']), (n, s) => s + n),
                toArray,
                expect(['a1', 'b2', 'c3']).toEqual
            )

        })

        it('zip', () => {
            pipe(

                zip(from([1, 2, 3]), from(['a', 'b', 'c', 'd'])),
                toArray,
                expect([[1, 'a'], [2, 'b'], [3, 'c']]).toEqual
            )

        })

        it('unzip', () => {
            pipe(

                unzip(from([

                    [1, 'a'],
                    [2, 'b'],
                    [3, 'c']
                ])),

                expect([from([1, 2, 3]), from(['a', 'b', 'c'])]).toEqual
            )

        })
        it('scanLeft', () => {
            const f = (b: number, a: number) => b - a
            pipe(
                as,
                scanLeft(10, f),
                toArray,
                expect([10, 9, 7, 4]).toEqual
            )
            pipe(
                from([0]),
                scanLeft(10, f),
                toArray,
                expect([10, 10]).toEqual
            )
            pipe(
                empty(),
                scanLeft(10, f),
                toArray,
                expect([10]).toEqual
            )
        })

        it('scanRight', () => {
            const f = (b: number, a: number) => b - a
            pipe(
                as,
                scanRight(10, f),
                toArray,
                expect([-8, 9, -7, 10]).toEqual
            )
            pipe(
                from([0]),
                scanRight(10, f),
                toArray,
                expect([-10, 10]).toEqual
            )
            pipe(
                empty(),
                scanRight(10, f),
                toArray,
                expect([10]).toEqual
            )

        })
        it('sort', () => {
            pipe(
                from([3, 2, 1]),
                sort(ordNumber),
                toArray,
                expect([1, 2, 3]).toEqual
            )

        })
        it('sortBy', () => {
            interface Person {
                name: string
                age: number
            }
            const byName = ord.contramap(ordString, (p: Person) => p.name)
            const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
            const sortByNameByAge = sortBy([byName, byAge])
            const persons = from([{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }])
            expect(sortByNameByAge(persons)).toEqual(from([
                { name: 'a', age: 1 },
                { name: 'b', age: 2 },
                { name: 'b', age: 3 },
                { name: 'c', age: 2 }
            ]))
            const sortByAgeByName = sortBy([byAge, byName])
            expect(sortByAgeByName(persons)).toEqual(from([
                { name: 'a', age: 1 },
                { name: 'b', age: 2 },
                { name: 'c', age: 2 },
                { name: 'b', age: 3 }
            ]))

        })

        it('uniq', () => {
            interface A {
                a: string
                b: number
            }

            const eqA = eq.contramap(ordNumber, (f: A) => f.b)
            const arrA: A = { a: 'a', b: 1 }
            const arrB: A = { a: 'b', b: 1 }
            const arrC: A = { a: 'c', b: 2 }
            const arrD: A = { a: 'd', b: 2 }
            const arrUniq = [arrA, arrC]
            pipe(
                arrUniq,
                from,
                uniq(eqA),
                toArray,
                expect(arrUniq).toEqual
            )
            pipe(
                [arrA, arrB, arrC, arrD],
                from,
                uniq(eqA),
                toArray,
                expect([arrA, arrC]).toEqual
            )
            pipe(
                [arrA, arrA, arrC, arrD, arrA],
                from,
                uniq(eqA),
                toArray,
                expect([arrA, arrC]).toEqual
            )
            pipe(
                [arrA, arrC],
                from,
                uniq(eqA),
                toArray,
                expect([arrA, arrC]).toEqual
            )
            pipe(
                [arrC, arrA],
                from,
                uniq(eqA),
                toArray,
                expect([arrC, arrA]).toEqual
            )

        })


        it('union', () => {
            pipe(

                union(ordNumber)(from([1, 2]), from([3, 4])),
                toArray,
                expect([1, 2, 3, 4]).toEqual
            )
            pipe(

                union(ordNumber)(from([1, 2]), from([2, 3])),
                toArray,
                expect([1, 2, 3]).toEqual
            )
            pipe(

                union(ordNumber)(from([1, 2]), from([1, 2])),
                toArray,
                expect([1, 2]).toEqual
            )

        })

        it('intersection', () => {
            pipe(

                intersection(ordNumber)(from([1, 2]), from([3, 4])),
                toArray,
                expect([]).toEqual
            )
            pipe(

                intersection(ordNumber)(from([1, 2]), from([2, 3])),
                toArray,
                expect([2]).toEqual
            )
            pipe(

                intersection(ordNumber)(from([1, 2]), from([1, 2])),
                toArray,
                expect([1, 2]).toEqual
            )

        })

        it('difference', () => {
            pipe(

                difference(ordNumber)(from([1, 2]), from([3, 4])),
                toArray,
                expect([1, 2]).toEqual
            )
            pipe(

                difference(ordNumber)(from([1, 2]), from([2, 3])),
                toArray,
                expect([1]).toEqual
            )
            pipe(

                difference(ordNumber)(from([1, 2]), from([1, 2])),
                toArray,
                expect([]).toEqual
            )

        })

        it('reverse', () => {
            pipe(
                [1, 2, 3],
                from,
                reverse,
                toArray,
                toEqual([3, 2, 1])
            )

        })
        it('reverse', () => {
            pipe(
                1,
                of,
                toArray,
                toEqual([1])
            )
        })

        it('foldLeft', () => {

            const len: <A>(as: Kind<F, A>) => string = foldLeft(() => ',null', (_, tail) => ',' + size(tail) + len(tail))
            expect(len(as)).toEqual(',2,1,0,null')

        })

        it('foldRight', () => {
            const len: <A>(as: Kind<F, A>) => number = foldRight(() => 0, (init, _) => 1 + len(init))
            expect(len(as)).toEqual(3)
        })





        it('traverse', () => {
            const tfanone = from([1, 2])
            const f = (n: number): E.Either<number, number> => (n % 2 === 0 ? E.left(n) : E.right(n))
            const result = traverse(E.either)(tfanone, f)

            expect(E.isLeft(result)).toBeTruthy()
            if (E.isLeft(result)) {
                expect(result.left).toEqual(2)
            }
            const tfa = from([1, 3])
            const fas = traverse(E.either)(tfa, f)
            expect(E.right(fas)).toBeTruthy()

            if (E.isRight((fas))) {
                expect(fas.right).toEqual(from([1, 3]))
            }
        })
        it('traverseWithIndex', () => {
            const tfanone = from([1, 2])
            const f = (n: number): E.Either<number, number> => (n % 2 === 0 ? E.left(n) : E.right(n))
            const result = traverseWithIndex(E.either)(tfanone, f)

            expect(E.isLeft(result)).toBeTruthy()
            if (E.isLeft(result)) {
                expect(result.left).toEqual(0)
            }
            const tfa = from([1])
            const fas = traverseWithIndex(E.either)(tfa, f)
            expect(E.right(fas)).toBeTruthy()

            if (E.isRight((fas))) {
                expect(fas.right).toEqual(from([1]))
            }
        })
        it('sequence', () => {
            const result = sequence(O.option)(from([O.some(1), O.some(3)]))
            expect(O.isSome(result)).toBeTruthy()
            if (O.isSome(result)) {
                expect(result.value).toEqual(from([1, 3]))
            }
            expect(sequence(O.option)(from([O.some(1), O.none]))).toEqual(O.none)
        })
        it('wither', () => {
            const witherIdentity = wither(I.identity)
            const p = (n: number) => n > 2
            const f = (n: number) => I.identity.of(p(n) ? O.some(n + 1) : O.none)
            expect(witherIdentity(empty(), f)).toEqual(I.identity.of(empty()))
            expect(witherIdentity(from([1, 2, 3, 4]), f)).toEqual(I.identity.of(from([4, 5])))

        })

        it('wilt', () => {
            const wiltIdentity = wilt(I.identity)
            const p = (n: number) => n > 2
            const f = (n: number) => I.identity.of(p(n) ? E.right(n + 1) : E.left(n - 1))
            expect(wiltIdentity(empty(), f)).toEqual(I.identity.of({ left: empty(), right: empty() }))
            expect(wiltIdentity(from([1, 2, 3, 4]), f)).toEqual(I.identity.of({ left: from([0, 1]), right: from([4, 5]) }))

        })
        it('extend', () => {
            const sum = (as: Kind<F, number>) => foldMonoid(monoidSum)(toArray(as))
            pipe(
                from([1, 2, 3, 4]),
                extend(sum),
                toArray,
                expect([10, 9, 7, 4]).toEqual
            )
            pipe(
                from([1, 2, 3, 4]),
                extend(a => a),
                toArray,
                expect([from([1, 2, 3, 4]), from([2, 3, 4]), from([3, 4]), from([4])]).toEqual
            )


        })
        it('duplicate', () => {

            pipe(
                from([1, 2, 3, 4]),
                duplicate,
                toArray,
                expect([from([1, 2, 3, 4]), from([2, 3, 4]), from([3, 4]), from([4])]).toEqual
            )


        })
        it('chop', () => {
            const group = <A>(S: Eq<A>): ((as: Kind<F, A>) => Kind<F, Kind<F, A>>) => {
                return chop(as => {
                    const { init, rest } = spanLeft((a: A) => S.equals(a, _getAt(0)(as)!))(as)
                    return [init, rest]
                })
            }
            expect(group(eqNumber)(from([1, 1, 2, 3, 3, 4]))).toEqual(
                from([from([1, 1]), from([2]), from([3, 3]), from([4])])
            )
            expect(group(eqNumber)(from([1, 1, 2, 1, 1, 3, 3, 4]))).toEqual(
                from([from([1, 1]), from([2]), from([1, 1]), from([3, 3]), from([4])])
            )
        })
        it('groupByOption', () => {
            pipe(
                from([1, 1, 2, 1, 1, 3, 3, 4]),
                groupBy({ getValue: (a: number) => a, show: showNumber }),
                expect({
                    '1': from([1, 1, 1, 1]),
                    '2': from([2]),
                    '3': from([3, 3]),
                    '4': from([4])
                }).toEqual
            )
            pipe(
                from(data),
                groupBy({ getValue: (a) => a.city?a.city:'newyork', show: showString }),
                v=>expect(v).toMatchSnapshot()
            )

        })
        it('comprehension', () => {
            const result=comprehension([from(['a','b','c']),from(['eq','lt'])],(a,b)=>a+'_'+b)
            expect(result).toEqual(from(["a_eq", "a_lt", "b_eq", "b_lt", "c_eq", "c_lt"]));
            const result1=comprehension([from(['a','b','c']),from(['eq','lt'])],(a,b)=>a+'_'+b,(a)=>a!=='a')
            expect(result1).toEqual(from(["b_eq", "b_lt", "c_eq", "c_lt"]));
        });
        it('fromRecord', () => {
            pipe(
                {
                    a1:{b:'b1'},
                    a2:{b:'b2'},
                    a3:{b:'b3'}

                },
                fromRecord('a'),
                toArray,
                as=>expect(as).toEqual([{a:'a1',b:'b1'},{a:'a2',b:'b2'},{a:'a3',b:'b3'}])
            )
         
        });
        it('toRecord', () => {
            pipe(
                [{a:'a1',b:'b1',c:'c1'},{a:'a2',b:'b2',c:'c1'},{a:'a3',b:'b3',c:'c1'}],
                from,
                toRecord('a'),
              
                as=>expect(as).toEqual({
                    a1:{b:'b1',c:'c1'},
                    a2:{b:'b2',c:'c1'},
                    a3:{b:'b3',c:'c1'}
                })
            )
         
        });
    })
}

export default test