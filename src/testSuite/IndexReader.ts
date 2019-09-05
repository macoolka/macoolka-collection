
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
    getAt,
    empty,
    findFirstIndex,
    findLastIndex,
    findIndex,
    forEachIndex,
    existAt,
    _getAt,
}: Collection<F>) {
    const ListData = from(data)
    const as = from([1, 2, 3])

    describe('Collection Reader', () => {
       
        it('existAt', () => {
            expect(existAt(-1)(as)).toBeFalsy()
            expect(existAt(3)(as)).toBeFalsy()
            expect(existAt(0)(as)).toBeTruthy()
            expect(existAt(2)(as)).toBeTruthy()
        })
        it('forEachIndex', () => {
            const result1: number[] = []
            const keyResult1: number[] = []
            pipe(
                as,
                forEachIndex((index, a, ) => {
                    result1.push(a)
                    keyResult1.push(index)
                    return true
                })
            )
            expect(result1).toEqual([1, 2, 3])
            expect(keyResult1).toEqual([0, 1, 2])


            const result2: number[] = []
            const keyResult2: number[] = []
            pipe(
                as,
                forEachIndex((index, a) => {
                    if (index === 2) {
                        return false
                    } else {
                        result2.push(a)
                        keyResult2.push(index)
                        return true
                    }
                })
            )
            expect(result2).toEqual([1, 2])
            expect(keyResult2).toEqual([0, 1])

        })
        it('getAt', () => {

            pipe(
                ListData,
                getAt(0),
                expect(O.some(data[0])).toEqual
            )
            pipe(
                ListData,
                getAt(100),
                expect(O.none).toEqual
            )
        })
        it('_getAt', () => {

            pipe(
                ListData,
                _getAt(0),
                expect(data[0]).toEqual
            )
            pipe(
                ListData,
                _getAt(100),
                expect(null || undefined).toEqual
            )
        })
      
        it('findFirstIndex', () => {

            pipe(
                ListData,
                findFirstIndex(x => x.name === 'john'),
                expect(O.some(0)).toEqual
            )
            pipe(
                ListData,
                findFirstIndex(x => x.name === 'john1'),
                expect(O.none).toEqual
            )
        })
        it('findIndex', () => {

            pipe(
                ListData,
                findIndex(x => x.city === 'beijing'),
                expect([0, 1]).toEqual
            )
            pipe(
                ListData,
                findIndex(x => x.name === 'john1'),
                expect([]).toEqual
            )
        })

      

        it('findLastIndex', () => {
            interface X {
                a: number
                b: number
            }
            const xs = from([{ a: 1, b: 0 }, { a: 1, b: 1 }])
            pipe(
                xs,
                findLastIndex((x: X) => x.a === 1),
                O.fold(
                    throwError,
                    value => pipe(
                        value,
                        expect(1).toEqual
                    )
                )
            )
            pipe(
                xs,
                findLastIndex((x: X) => x.a === 4),
                expect(O.none).toEqual
            )
            pipe(
                empty(),
                findLastIndex((x: X) => x.a === 4),
                expect(O.none).toEqual
            )

        })
      

    })
}

export default test