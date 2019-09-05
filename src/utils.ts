import { isMaybe } from 'macoolka-predicate'
export const mapKeyIterator = function* <K, T>(interIterator: Iterator<[K, T]>): Iterator<K> {
    let stopMark: boolean = false;

    do {
        let { done, value } = interIterator.next();
        stopMark = isMaybe(done) ? true : done;
        if (stopMark === false)
            yield value[0]
    } while (stopMark === false);
};
export const mapValueIterator = function* <K, T>(interIterator: Iterator<[K, T]>) {
    let stopMark: boolean = false;

    do {
        let { done, value } = interIterator.next();
        stopMark = isMaybe(done) ? true : done;
        if (stopMark === false)
            yield value[1]
    } while (stopMark === false);
};