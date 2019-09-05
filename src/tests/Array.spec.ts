import A from '../Array';
import test from '../testSuite'
import { pipe } from 'fp-ts/lib/pipeable'
describe('Array', () => {
    test(A, { immutable: false })
    pipe(
        [1, 2],
        A.map(a => a)
    )
    it('reverse', () => {
        pipe(
            A.reverse(A.empty()),
            expect(A.empty()).toEqual
        )
        pipe(
            A.reverse([1,2,3]),
            expect(A.from([3, 2, 1])).toEqual
        )
    })
})
