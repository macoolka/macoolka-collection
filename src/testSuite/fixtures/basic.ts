import {contramap,eqString} from 'fp-ts/lib/Eq'
type Type = 'dalian' | 'london' | 'newyork' | 'beijing'
export interface Basic {
    id: string
    name: string
    age?: number
    isFemale?: boolean
    city?: Type
}
export const basicEq=contramap<string,Basic>(a=>a.name)(eqString)
export const data: Basic[] = [{
    id: '1',
    name: 'john',
    age: 21,
    isFemale: false,
    city: 'beijing'
}, {
    id: '2',
    name: 'zhang',
    age: 34,
    isFemale: false,
    city: 'beijing'
}, {
    id: '3',
    name: 'taylor',
    age: 23,
    isFemale: true,
    city: 'newyork'
}, {
    id: '4',
    name: 'sam',
    age: 53,
    isFemale: true,
    city: 'london'
}
]
