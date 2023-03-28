export interface Proportional {
    title: string
    labels: Array<string>
    datasets: Array<dataset>
}

interface dataset {
    label: 'Percentage of Population'
    data: Array<number>
    backgroundColor: Array<string>
    borderColor: Array<string>
    borderWidth: number
}