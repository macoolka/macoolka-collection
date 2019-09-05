import Make from './Make'

import make, { Options } from '../Collection'
import { URIS } from 'fp-ts/lib/HKT'
import Reader from './Reader' 
import IndexReader from './IndexReader' 
import Writer from './Writer'

import Subset from './Subset'
import Immutalbe from './immutable'
import Typeclass from './Typeclass'

function test<URI extends URIS>(a: Options<URI>,option:{immutable:boolean}) {
    const collection = make(a)
    Make(collection)
    Reader(collection)
    Writer(collection)
    Subset(collection)
    IndexReader(collection)
    Immutalbe(collection,option) 
    Typeclass(collection)
}
export default test
