
import { Collection } from '../Collection'
import { data } from './fixtures/basic'
import * as O from 'fp-ts/lib/Option'
import { URIS } from 'fp-ts/lib/HKT'

import { pipe } from 'fp-ts/lib/pipeable';

const throwError = () => {
    throw new Error('error')
}
function test<F extends URIS>({
    from,
    size,
    getiterator,
    reverse,
    isEmpty,
    findFirst,
    empty,
    findFirstMap,
    findLast,
    findLastMap,
    first,
    last,
    forEach,

}: Collection<F>) {
    const ListData = from(data)
    const as = from([1, 2, 3])

    describe('Collection Reader', () => {
        it('from and getiterator', () => {
            pipe(
                [],
                from,
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                [1, 2, 3],
                from,
                getiterator,
                a => [...a],
                expect([1, 2, 3]).toEqual
            )
        })

        it('isEmpty', () => {
            expect(isEmpty(from([]))).toBeTruthy()
            expect(isEmpty(ListData)).toBeFalsy()

        })

        it('forEach', () => {
            const result1: number[] = []
            pipe(
                as,
                forEach((a) => {
                    result1.push(a)
                    return true
                })
            )
            expect(result1).toEqual([1, 2, 3])



            const result2: number[] = []
            pipe(
                as,
                forEach((a) => {
                    if (a === 3) {
                        return false
                    } else {
                        result2.push(a)

                        return true
                    }
                })
            )
            expect(result2).toEqual([1, 2])


        })

        it('size', () => {

            pipe(
                ListData,
                size,
                expect(data.length).toEqual
            )
        })


        it('findFirst', () => {
            pipe(
                ListData,
                findFirst(x => x.name === 'john'),
                expect(O.some(data[0])).toEqual
            )
            pipe(
                ListData,
                findFirst(x => x.name === 'john1'),
                expect(O.none).toEqual
            )

        })
        it('findFirstMap', () => {
            pipe(
                ListData,
                findFirstMap(x => x.name === 'john' ? O.some('ok') : O.none),
                expect(O.some('ok')).toEqual
            )
            pipe(
                ListData,
                findFirstMap(x => x.name === 'john1' ? O.some('ok') : O.none),
                expect(O.none).toEqual
            )

        })
        it('findLast', () => {
            pipe(
                empty(),
                findLast(x => x === 2),
                expect(O.none).toEqual

            )
            pipe(
                from([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
                findLast((x: { a: number; b: number }) => x.a === 1),
                O.fold(
                    throwError,
                    value => pipe(
                        value,

                        expect({ a: 1, b: 2 }).toEqual
                    )
                )
            )
            pipe(
                from([{ a: 1, b: 2 }, { a: 2, b: 1 }]),
                findLast((x: { a: number; b: number }) => x.a === 1),
                O.fold(
                    throwError,
                    value => pipe(
                        value,

                        expect({ a: 1, b: 2 }).toEqual
                    )
                )
            )
            pipe(
                from(['a', 1]),
                findLast((x: string | number) => x === 1),
                O.fold(
                    throwError,
                    value => pipe(
                        value,

                        expect(1).toEqual
                    )
                )
            )

        })

        it('findLastMap', () => {
            pipe(
                empty(),
                findLastMap(x => x === 2 ? O.some('a') : O.none),
                expect(O.none).toEqual

            )
            pipe(
                from([{ a: 1, b: 1 }, { a: 1, b: 2 }]),
                findLastMap((x: { a: number; b: number }) => x.a === 1 ? O.some(x.b) : O.none),
                O.fold(
                    throwError,
                    value => pipe(
                        value,

                        expect(2).toEqual
                    )
                )
            )


        })


        it('getFirst', () => {
            pipe(
                first(as),
                expect(O.some(1)).toEqual
            )
            pipe(
                first(empty()),
                expect(O.none).toEqual
            )

        })

        it('getLast', () => {
            pipe(
                last(as),
                expect(O.some(3)).toEqual
            )
            pipe(
                last(from([])),
                expect(O.none).toEqual
            )

        })

        it('reverse', () => {
            pipe(
                reverse(empty()),
                expect(empty()).toEqual
            )
            pipe(
                reverse(as),
                expect(from([3, 2, 1])).toEqual
            )
        })

    })
}

export default test