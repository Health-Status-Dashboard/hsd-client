export interface ILongitudinal {
    title: string
    labels: Array<string>
    datasets: Array<dataset>
}

interface dataset {
    label: string
    data: Array<number>
    backgroundColor: string
    borderColor: string
    borderWidth?: number
}
/*
export interface ILongitudinal {
    title: string
    label: any
    x: Array<any>
    y: Array<any>
    color: string

}
*/