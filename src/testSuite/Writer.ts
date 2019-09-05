
import { Collection } from '../Collection'
import * as O from 'fp-ts/lib/Option'
import { URIS } from 'fp-ts/lib/HKT'
import { data } from './fixtures/basic'
import { pipe } from 'fp-ts/lib/pipeable'
import * as A from 'fp-ts/lib/Array'

const throwError = () => {
    throw new Error('error')
}
function test<F extends URIS>({
    from,
    getAt,
    empty,
    toArray,
    cons,
    snoc,
    deleteAt,
    insertAt,
    updateAt,
    setAt,
    _setAt,
    _deleteAt,
    _insertAt,
    _getAt,
    deleteWith,
    updateWith,

}: Collection<F>) {
    const as = from([1, 2, 3])
    const ListData = from(data)
    describe('Collection Reader', () => {
        it('deleteAt', () => {
            pipe(
                ListData,
                deleteAt(0),
                O.map(toArray),
                expect(O.some(data.slice(1))).toEqual
            )
            pipe(
                ListData,
                deleteAt(100),
                expect(O.none).toEqual
            )

        })
        it('_deleteAt', () => {
            pipe(
                ListData,
                _deleteAt(0),
                toArray,
                expect(data.slice(1)).toEqual
            )
            pipe(
                ListData,
                _deleteAt(100),
                expect(ListData).toEqual
            )

        })
        it('setAt', () => {

            pipe(
                ListData,
                setAt(0, { ...data[0], name: 'test' }),
                O.fold(throwError, a => {
                    pipe(a,
                        getAt(0),
                        O.fold(throwError,
                            b => {
                                expect(b.name).toEqual('test')
                            }
                        )
                    )

                })
            )

            pipe(
                ListData,
                updateAt(10, (a) => ({ ...a, name: 'test' })),
                expect(O.none).toEqual
            )


        })
        it('_setAt', () => {

            pipe(
                ListData,
                _setAt(0, { ...data[0], name: 'test' }),
                _getAt(0),
                a => expect(a!.name).toEqual('test')

            )
            pipe(
                ListData,
                _setAt(10, { ...data[0], name: 'test' }),
                expect(ListData).toEqual

            )


        })
        it('updateAt', () => {

            pipe(
                ListData,
                updateAt(0, (a) => ({ ...a, name: 'test' })),
                O.fold(throwError, a => {
                    pipe(a,
                        getAt(0),
                        O.fold(throwError,
                            b => {
                                expect(b.name).toEqual('test')
                            }
                        )
                    )

                })
            )

            pipe(
                ListData,
                updateAt(10, (a) => ({ ...a, name: 'test' })),
                expect(O.none).toEqual
            )


        })
        it('updateWith', () => {
            pipe(
                from([1, 2, 3]),
                updateWith(a => a === 2, a => a + 1),
                a => expect(a).toEqual(from([1, 3, 3]))
            )
            pipe(
                ListData,
                updateWith(x => x.city === 'beijing', (a) => ({ ...a, name: 'test' })),
                a => {

                    expect(a).toMatchSnapshot()


                }
            )

        })
        it('deleteWith', () => {
            pipe(
                from([1, 2, 3]),
                deleteWith(a => a === 2 || a === 1),
                a => expect(a).toEqual(from([3]))
            )
            pipe(
                ListData,
                deleteWith(x => x.city === 'beijing'),
                a => {

                    expect(a).toMatchSnapshot()


                }
            )

        })
        it('snoc', () => {
            pipe(
                ListData,
                snoc({ id: 'new', name: 'new' }),
                toArray,
                expect(A.snoc(data, { id: 'new', name: 'new' })).toEqual

            )

        })
        it('cons', () => {
            pipe(
                ListData,
                cons({ id: 'new', name: 'new' }),
                toArray,
                expect(A.cons({ id: 'new', name: 'new' }, data)).toEqual

            )


        })
        it('insertAt', () => {
            pipe(
                empty(),
                insertAt(1, 1),
                expect(O.none).toEqual
            )
            pipe(
                empty(),
                insertAt(0, 1),
                O.fold(
                    throwError,
                    value => pipe(
                        value,
                        toArray,
                        expect([1]).toEqual
                    )
                )

            )
            pipe(
                as,
                insertAt(1, 5),
                O.fold(
                    throwError,
                    value => pipe(
                        value,
                        toArray,
                        expect([1, 5, 2, 3]).toEqual
                    )
                )

            )

        })
        it('insertAt', () => {
            pipe(
                empty(),
                _insertAt(1, 1),
                expect(empty()).toEqual
            )
            pipe(
                empty(),
                _insertAt(0, 1),
                toArray,
                expect([1]).toEqual


            )
            pipe(
                as,
                _insertAt(1, 5),
                toArray,
                expect([1, 5, 2, 3]).toEqual

            )

        })
    })
}

export default test