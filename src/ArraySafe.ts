import init from './Collection'
import * as O from 'fp-ts/lib/Option'
import { deleteAt, insertAt, updateAt,reverse } from 'fp-ts/lib/Array'
//import {cloneDeep} from 'macoolka-object'
import { pipe } from 'fp-ts/lib/pipeable'
const list = init<'Array'>({
    URI: 'Array',
    from: as => [...as],
    size: as => as.length,
    _getAt: i => as => as[i],
    getiterator: a => a,
    reverse: a => reverse(a),
    slice: (start, end) => value => value.slice(start, end),
    _deleteAt: i => as => pipe(
        as,
        deleteAt(i),
        O.getOrElse(() => as)
    ),
    _insertAt: (i, a) => as => pipe(
        as,
        insertAt(i, a),
        O.getOrElse(() => as)
    ),
    _setAt: (i, a) => as => pipe(
        as,
        updateAt(i, a),
        O.getOrElse(() => as)
    ),
},true)
export default list