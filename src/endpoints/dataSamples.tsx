//hardcoded data taken out from Home.tsx for clarity

/*
const USDATA: Region = {
    _id: "1",
    name: "United States",
    population: "334,533,505",
    code: "123456789",
    lifeExpectancy: {
        years: [1970, 1980, 1990, 2000, 2010, 2020],
        ages: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0]
    }
}
const lineData: ILongitudinal = {
    title: 'US Life Expectancy (1970 - 2020)',
    labels: ['1970', '1980', '1990', '2000', '2010', '2020'],
    datasets: [
        {
            label: 'US Life Expectancy',
            data: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0],
            backgroundColor: colors.mitreBlue,
            borderColor: colors.mitreBlue
        }
    ]
}


const lineData: ILine = {
    title: 'US Life Expectancy (1970 - 2020)',
    label: 'US Life Expectancy',
    x: ['1970', '1980', '1990', '2000', '2013', '2020'],
    y: [70.8, 73.3, 75.4, 76.8, 78.7, 77.0],
    color: colors.mitreBlue
}
const alcoholData: IStats = {
    title: "Alcohol & Tobacco",
    stats: [
        {
            value: <strong>15.4%</strong>,
            label: "adults report recent heavy drinking in 2021"
        },
        {
            value: <strong>6.3%</strong>,
            label: "adults report recent binge drinking in 2021"
        },
        {
            value: <strong>14.4%</strong>,
            label: "adults report smoking in 2021"
        },
        {
            value: <strong>3.5%</strong>,
            label: "adults report using smokeless tobacco in 2021"
        },
        {
            value: <strong>50.8%</strong>,
            label: "adult smokers report attempts to quit tobacco in 2021"
        }

    ]
    // alcohol: https://chronicdata.cdc.gov/resource/5hba-acwf.json?locationabbr=US&stratification1=Overall&$where=yearstart%20%3E%202020&topic=Alcohol
    // tobacco: https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Tobacco
}


const pieData: IProportional = {
    title: 'US Adult Weight Breakdown (2021)',
    labels: ['Obese', 'Overweight', 'Healthy', 'Other/Underweight'],
    datasets: [{
        label: 'Percentage of Population',
        data: [33.9, 34.5, 29.9, 1.7],
        backgroundColor: [
            colors.vermilion,
            colors.saffron,
            colors.green,
            colors.mitreDarkBlue],
        borderColor: [
            colors.vermilion,
            colors.saffron,
            colors.green,
            colors.white],
        borderWidth: 0
    }]
}

// weight data
// https://chronicdata.cdc.gov/resource/g4ie-h725.json?locationabbr=US&yearend=2021&stratification1=Overall&topic=Nutrition, Physical Activity, and Weight Status





const causesOfDeath: IBar = {
    title: "US Causes of Death (current period)",
    labels: ['Septicemia', 'Malignant Neoplasms', 'Diabetes', 'Alzheimers', 'Influenza',
        'Chronic Lower Respiratory Diseases', 'Other Respiratory Diseases', 'Nephritis', 'Abnormal/Other', 'Heart Disease',
        'Cerebrovascular Disease', 'COVID-19 Multiple Causes', 'COVID-19 Primary Cause'],
    datasets: [
        {
            label: 'January 2023',
            backgroundColor: 'rgba(16,44,76,0.3)',
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 0,
            data: [3973, 51911, 8616, 10862, 5804, 13692, 4652, 5099, 13131, 60477, 14727, 14681, 9848]
        },
        {
            label: 'February 2023',
            backgroundColor: 'rgba(16,44,76,0.5)',
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 0,
            data: [3051, 45406, 7066, 8936, 3461, 11363, 3765, 4182, 14286, 49699, 12076, 8411, 5425]
        },
        {
            label: 'March 2023',
            backgroundColor: 'rgba(16,44,76,0.8)',
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 0,
            data: [1254, 18261, 2386, 3617, 1249, 4542, 1550, 1559, 5855, 19090, 4757, 2719, 1742]
        }
    ]
}

// monthly cause of Death Data: https://data.cdc.gov/resource/9dzk-mvmi.json?year=2023



const summaryData: ISummary = {
    title: "United States Overview",
    headers: [
        {
            value: "334,533,505",
            label: "Population"
        },
        {
            value: 1.754,
            label: "Fertility Rate"
        }
    ]
}
//most recent population data dec 2022 at : https://api.census.gov/data/2021/pep/natmonthly?get=POP,NAME,MONTHLY&for=us
//Explanation of this: https://api.census.gov/data/2021/pep/natmonthly/variables/MONTHLY.json
//TODO: find source continually updated




const obesitySummary: Stats = {
    title: "Weight Management",
    stats: [
        {
            value: "1.6",
            label: "Adult Median Daily Frequency of Vegetable Consumption"
        },
        {
            value: "23.7%",
            label: "No Reported Leisure-time Physical Activity among Adults"
        }
    ]
}




const causeOfDeathSummary: ISummary = {
    title: "US Deaths by Cause",
    headers: [
        {
            value: "599,156",
            label: "All Causes (3 month period)"
        },
        {
            value: "Accidents, Suicide, OD's, Homicides",
            label: "Not Shown"
        }
    ]
}


const uninsuredSummary: ISummary = {
    title: "Uninsured Population in the US",
    headers: [
        {
            value: "8.7% of Americans Uninsured",
            label: "Current Estimate"
        }
    ]
}


const uninsuredByEducation: IBar = {
    title: "US Uninsured Rate by Education Level (% Uninsured)",
    labels: ["Education Levels"],
    datasets: [
        {
            label: '< High School',
            backgroundColor: colors.black,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [19.1]
        },
        {
            label: 'High School',
            backgroundColor: colors.mitreBlue,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [13.9]
        },
        {
            label: "Some College/Associate's",
            backgroundColor: colors.white,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [8.5]
        },
        {
            label: "Bachelor's or higher",
            backgroundColor: colors.mitreYellow,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [3.0]
        }
    ]
}

const uninsuredByAge: IBar = {
    title: "US Uninsured Rate by Age (% Uninsured)",
    labels: ["Ages"],
    datasets: [
        {
            label: '18-24 years',
            backgroundColor: colors.black,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [13.7]
        },
        {
            label: '25-34 years',
            backgroundColor: colors.mitreBlue,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [10.6]
        },
        {
            label: "35-44 years",
            backgroundColor: colors.white,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [9.1]
        },
        {
            label: "45-64 years",
            backgroundColor: colors.mitreYellow,
            borderColor: 'rgba(16,44,76,0.8)',
            borderWidth: 1,
            data: [6.7]
        }
    ]
}

const USUninsured: ILongitudinal = {
    title: 'US Uninsured Rate (% Uninsured)',
    labels: ["October 2022", "November 2022", "December 2022", "January 2023", "February 2023", "March 2023"],
    datasets: [
        {
            label: "Overall National Estimate",
            data: [10.1, 9.5, 8.9, 8.5, 9.1, 8.7],
            backgroundColor: colors.black,
            borderColor: colors.black
        },
        {
            label: "Female National Estimate",
            data: [9.5, 8.4, 7.5, 7.5, 7.9, 7.4],
            backgroundColor: colors.cerise,
            borderColor: colors.cerise
        },
        {
            label: "Male National Estimate",
            data: [10.9, 10.7, 10.4, 9.5, 10.4, 10.1],
            backgroundColor: colors.mitreBlue,
            borderColor: colors.mitreBlue
        }
    ]
}
// general info: https://www.cdc.gov/nchs/covid19/pulse/health-insurance-coverage.htm
//api docs: https://dev.socrata.com/foundry/data.cdc.gov/jb9g-gnvr
// national estimate: https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`='National Estimate'
// by education: https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27By%20Education%27
// by age: https://data.cdc.gov/resource/jb9g-gnvr.json?$where=`group`=%27By%20Age%27




*/