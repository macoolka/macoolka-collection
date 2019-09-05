
import { ConstructorCollection } from '../Constructor'
import { URIS } from 'fp-ts/lib/HKT'

function test  <F extends URIS>({ makeBy, makeByRange, makeByRepeat, from }: ConstructorCollection<F>){
    describe('Collection make', () => {
        //  it('from')
        it('makeBy', () => {
            const double = (n: number): number => n * 2
            expect(makeBy(5, double)).toEqual(from([0, 2, 4, 6, 8]))
        })

        it('makeByRange', () => {
            expect(makeByRange(0, 0)).toEqual(from([0]))
            expect(makeByRange(1, 5)).toEqual(from([1, 2, 3, 4, 5]))
            expect(makeByRange(10, 15)).toEqual(from([10, 11, 12, 13, 14, 15]))
        })

        it('makeByRepeat', () => {
            expect(makeByRepeat(0, 0)).toEqual(from([]))
            expect(makeByRepeat(3, 1)).toEqual(from([1, 1, 1]))

        })
    })
}

export default test