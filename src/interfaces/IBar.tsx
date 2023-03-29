export interface IBar {
    title: string
    labels: Array<string>
    datasets: Array<dataset>
}

interface dataset {
    label: string
    data: Array<number>
    backgroundColor: string
    borderColor: string
    borderWidth: number
}