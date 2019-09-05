
import { Collection } from '../Collection'
import * as O from 'fp-ts/lib/Option'
import { URIS } from 'fp-ts/lib/HKT'

import { pipe } from 'fp-ts/lib/pipeable';

const throwError = () => {
    throw new Error('error')
}
function test  <F extends URIS>({
    from,
    size,
    empty,
    getiterator,
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
    clear,
    slice }: Collection<F>)  {
    const as = from([1, 2, 3])

    describe('Collection Reader', () => {
        it('slice', () => {

            pipe(
                [1, 2, 3, 4, 5],
                from,
                slice(2),
                expect(from([3, 4, 5])).toEqual
            )
            pipe(
                [1, 2, 3, 4, 5],
                from,
                slice(2, 4),
                expect(from([3, 4])).toEqual
            )
            pipe(
                [1, 2, 3, 4, 5],
                from,
                slice(1, 5),
                expect(from([2, 3, 4, 5])).toEqual
            )
        })




        it('tail', () => {
            pipe(
                tail(as),
                O.fold(
                    throwError,
                    value => pipe(
                        value,
                        getiterator,
                        a => [...a],
                        expect([2, 3]).toEqual
                    )
                )

            )
            pipe(
                tail(from([])),
                expect(O.none).toEqual
            )

        })

        it('takeLeft', () => {
            pipe(
                takeLeft(2)(as),
                getiterator,
                a => [...a],
                expect([1, 2]).toEqual
            )
            pipe(
                takeLeft(0)(as),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                takeLeft(2)(from([])),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
        })

        it('takeRight', () => {
            pipe(
                takeRight(2)(as),
                getiterator,
                a => [...a],
                expect([2, 3]).toEqual
            )
            pipe(
                takeRight(0)(as),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                takeRight(2)(from([])),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )

        })

        it('spanLeft', () => {
            pipe(
                from([1, 3, 2, 4, 5]),
                spanLeft((n: number) => n % 2 === 1),

                expect({
                    init: from([1, 3]),
                    rest: from([2, 4, 5])
                }).toEqual
            )
            const isNumber = (u: string | number): u is number => typeof u === 'number'
            pipe(
                from([1, 'a', 3]),
                spanLeft(isNumber),

                expect({
                    init: from([1]),
                    rest: from(['a', 3])
                }).toEqual
            )

        })

        it('takeLeftWhile', () => {
            const f = (n: number) => n % 2 === 0
            pipe(
                from([2, 4, 3, 6]),
                takeLeftWhile(f),
                getiterator,
                a => [...a],
                expect([2, 4]).toEqual
            )
            pipe(
                empty(),
                takeLeftWhile(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from([1, 2, 4]),
                takeLeftWhile(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from([2, 4]),
                takeLeftWhile(f),
                getiterator,
                a => [...a],
                expect([2, 4]).toEqual
            )
        })

        it('takeLeftUntil', () => {
            const f = (n: number) => n % 2 === 1
            pipe(
                from([2, 4, 3, 6]),
                takeLeftUntil(f),
                getiterator,
                a => [...a],
                expect([2, 4]).toEqual
            )
            pipe(
                empty(),
                takeLeftUntil(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from([1, 2, 4]),
                takeLeftUntil(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from([2, 4]),
                takeLeftUntil(f),
                getiterator,
                a => [...a],
                expect([2, 4]).toEqual
            )
        })

        it('skipLeft', () => {
            pipe(
                as,
                skipLeft(2),
                getiterator,
                a => [...a],
                expect([3]).toEqual
            )
            pipe(
                as,
                skipLeft(5),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                as,
                skipLeft(0),
                getiterator,
                a => [...a],
                expect([1, 2, 3]).toEqual
            )
        })
        it('skipRight', () => {
            pipe(
                as,
                skipRight(2),
                getiterator,
                a => [...a],
                expect([1]).toEqual
            )
            pipe(
                as,
                skipRight(5),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                as,
                skipRight(0),
                getiterator,
                a => [...a],
                expect([1, 2, 3]).toEqual
            )
        })


        it('skipLeftWhile', () => {
            const f = (n: number) => n % 2 === 0
            const g = (n: number) => n % 2 === 1
            pipe(
                from([1, 3, 2, 4, 5]),
                skipLeftWhile(f),
                getiterator,
                a => [...a],
                expect([1, 3, 2, 4, 5]).toEqual
            )
            pipe(
                from([1, 3, 2, 4, 5]),
                skipLeftWhile(g),
                getiterator,
                a => [...a],
                expect([2, 4, 5]).toEqual
            )
            pipe(
                from([2, 4, 1]),
                skipLeftWhile(f),
                getiterator,
                a => [...a],
                expect([1]).toEqual
            )
            pipe(
                from([2, 4]),
                skipLeftWhile(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from<number>([]),
                skipLeftWhile(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )

        })
        it('skipLeftWhile', () => {
            const f = (n: number) => n % 2 === 1
            const g = (n: number) => n % 2 === 0
            pipe(
                from([1, 3, 2, 4, 5]),
                skipLeftUntil(f),
                getiterator,
                a => [...a],
                expect([1, 3, 2, 4, 5]).toEqual
            )
            pipe(
                from([1, 3, 2, 4, 5]),
                skipLeftUntil(g),
                getiterator,
                a => [...a],
                expect([2, 4, 5]).toEqual
            )
            pipe(
                from([2, 4, 1]),
                skipLeftUntil(f),
                getiterator,
                a => [...a],
                expect([1]).toEqual
            )
            pipe(
                from([2, 4]),
                skipLeftUntil(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )
            pipe(
                from<number>([]),
                skipLeftUntil(f),
                getiterator,
                a => [...a],
                expect([]).toEqual
            )

        })
        it('head', () => {
            pipe(
                as,
                head,
                O.fold(
                    throwError,
                    value => pipe(
                        value,
                        getiterator,
                        a => [...a],
                        expect([1, 2]).toEqual
                    )
                )

            )
            pipe(
                from([]),
                head,
                expect(O.none).toEqual

            )

        })

        it('splitAt', () => {
            pipe(
                from([1, 2, 3, 4, 5]),
                splitAt(2),
                expect([from([1, 2]), from([3, 4, 5])]).toEqual

            )
            pipe(
                from([]),
                splitAt(2),
                expect([from([]), from([])]).toEqual

            )
            pipe(
                from([1]),
                splitAt(2),
                expect([from([1]), from([])]).toEqual

            )
            pipe(
                from([1, 2]),
                splitAt(2),
                expect([from([1, 2]), from([])]).toEqual

            )
            pipe(
                from([1, 2]),
                splitAt(-1),
                expect([from([1]), from([2])]).toEqual

            )
            pipe(
                from([1, 2]),
                splitAt(0),
                expect([from([]), from([1, 2])]).toEqual

            )
            pipe(
                from([1, 2]),
                splitAt(3),
                expect([from([1, 2]), from([])]).toEqual

            )
        })
        it('clear', () => {

            pipe(
                as,
                clear,
                size,
                expect(0).toEqual
            )
        })
    })
}

export default test