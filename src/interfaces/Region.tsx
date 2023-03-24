export interface Region {
    _id: string
    name: string
    population?: string
    code?: string
    lifeExpectancy?: {
        years: Array<number>
        ages: Array<number>
    }

}