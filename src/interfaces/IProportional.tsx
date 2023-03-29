export interface IProportional {
    title: string
    labels: Array<string>
    datasets: Array<dataset>
}

interface dataset {
    label: string
    data: Array<number>
    backgroundColor: Array<string>
    borderColor: Array<string>
    borderWidth: number
}