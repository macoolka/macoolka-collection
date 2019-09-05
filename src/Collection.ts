import { initConstructor, ConstructorCollectionInput, } from './Constructor'
import { URIS } from 'fp-ts/lib/HKT'
import { initIndexReaderCollection,IndexReaderCollectionInput } from './IndexReaderCollection'
import { initReaderCollection,ReaderCollectionInput } from './ReaderCollection'
import { pipe } from 'fp-ts/lib/pipeable'
import { SubsetCollectionInput, initSubset } from './Subset'
import { IndexWriteCollectionInput, initWriter } from './IndexWriterCollection'
import { initTypeclass, Typeclass } from './typeclass'
import { cloneDeep } from 'macoolka-object'
export {
    URIS
}
export interface Options<F extends URIS> extends ConstructorCollectionInput<F>,ReaderCollectionInput<F>,
IndexReaderCollectionInput<F>, SubsetCollectionInput<F>, IndexWriteCollectionInput<F> {

}
export interface Collection<F extends URIS> extends Typeclass<F> {

}
export interface InitCollection {
    <URI extends URIS>(a: Options<URI>,safe?:boolean): Collection<URI>
}

const make: InitCollection = (option, safe = false) => {
    const a: typeof option = safe ? {
        ...option,
        _getAt: i => as => pipe(
            option._getAt(i)(as),
            cloneDeep,
        ),
        _insertAt: (i, b) => option._insertAt(i, cloneDeep(b)),
        _setAt: (i, b) => option._setAt(i, cloneDeep(b)),

    } : option;

    const constructor = pipe(
        a,
        initConstructor,

    )
    const readerCollection = pipe(
        {
            ...a,
            ...constructor
        },
        initReaderCollection,
    )
    const indexReaderCollection = pipe(
        {
            ...a,
            ...readerCollection
        },
        initIndexReaderCollection,
    )
    const writer = pipe({
        ...a,
        ...indexReaderCollection,
    },
        initWriter
    )
    const subset = pipe({
        ...a,
        ...writer,
    },
        initSubset
    )
    const typeclass = pipe({
        ...subset,
    },
        initTypeclass
    )
    return {
        URI: a.URI,
        ...typeclass
    }
}
export default make