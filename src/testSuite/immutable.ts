
import { Collection } from '../Collection'
import { URIS } from 'fp-ts/lib/HKT'
import { data, basicEq, Basic } from './fixtures/basic'
import { pipe } from 'fp-ts/lib/pipeable';
import { cloneDeep } from 'macoolka-object'

function test<F extends URIS>({
    from,

    _deleteAt,
    _insertAt,
    _getAt,
    difference,
    _setAt,
    slice


}: Collection<F>,{immutable}:{immutable:boolean}) {
    //const as = from([1, 2, 3])
    const ListData = from(cloneDeep(data))
    describe('Collection Immutalbe', () => {

        it('_deleteAt', () => {
            const first = pipe(
                ListData,
                _deleteAt(0),

            )
            const second = pipe(
                ListData,
                _deleteAt(1),

            )
            const different1 = difference(basicEq)(first, second)
            const different2 = difference(basicEq)(second, first)
            expect(different1).toEqual(from([{
                id: '2',
                name: 'zhang',
                age: 34,
                isFemale: false,
                city: 'beijing'
            }]))
            expect(different2).toEqual(from([
                {
                    id: '1',
                    name: 'john',
                    age: 21,
                    isFemale: false,
                    city: 'beijing'
                }
            ]))

        })
        it('_insertAt', () => {
            const a: Basic = {
                id: 'insert',
                name: 'insert_name'
            }
            const as1 = pipe(
                ListData,
                _insertAt(0, a),
               
            )
            const first = pipe(
                ListData,
                _insertAt(0, a),
                _getAt(0)
            )
            expect(as1===ListData).toEqual(false)
            expect(basicEq.equals(a, first!)).toEqual(true)
            expect(first === a).toEqual(!immutable)
        })
        it('_getAt', () => {
         
            const a = pipe(
                ListData,
                _getAt(0)
            )
            
            a!.name='new';
            const b = pipe(
                ListData,
                _getAt(0)
            )
            expect(basicEq.equals(a!, b!)).toEqual(!immutable)
            expect(b === a).toEqual(!immutable)

        })
        it('_setAt', () => {
            const a: Basic = {
                id: 'insert',
                name: 'insert_name'
            }
            const as1 = pipe(
                ListData,
                _setAt(0,a),
                
            )
            const b=pipe(
                as1,
                _getAt(0)
            )
            a!.name='new';
            expect(as1===ListData).toEqual(false)
            expect(basicEq.equals(a!, b!)).toEqual(!immutable)
            expect(b === a).toEqual(!immutable)
        })
        it('slice', () => {
            
            const a = pipe(
                ListData,
                _getAt(0),
         
            )
            const as1 = pipe(
                ListData,
                slice(0,1),
         
            )
            const b=pipe(
                as1,
                _getAt(0)
            )
            b!.name='new';
            expect(as1===ListData).toEqual(false)
            expect(basicEq.equals(a!, b!)).toEqual(!immutable)
            expect(b === a).toEqual(!immutable)
        })
    })
}

export default test