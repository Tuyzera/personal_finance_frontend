import ApexCharts from "apexcharts"
import dynamic from "next/dynamic"
import { title } from "process"
import { useEffect, useState } from "react"

interface ColumnType {
    categories: categoryItemProps
}

type categoryItemProps = {
    id: string,
    name: string
}

const Chart = dynamic(() => 
    import ('react-apexcharts'),
    {
        ssr: false
    }

)




export function Column({categories} : ColumnType){

const [categoryList, setCategoryList] = useState(categories || [])

const [categoryName, setCategoryName] = useState([])



useEffect(()=>{
    function getCategoryNames(){
        const categories = []
        categoryList.map((item)=> {
            
            if(!categories.includes(item.name)){
                categories.push(item.name)
            }
            })
            setCategoryName(categories)
            
    }
    getCategoryNames()
}, [])

const columnColors = ['#FF5733', '#33FF57', '#5733FF'];

console.log(categoryName)
const OptionsColumnChart = {
    xaxis: {
        categories: categoryName,
    },
    colors:columnColors

    }

    const SeriesColumnChart = [{
        name: " ",
        data: ["55,00", "232,00"]
}]
    return(
        <div>
            {categoryName}
            <Chart options={OptionsColumnChart} series={SeriesColumnChart} height={200} width={500} type="bar" />
        </div>
        
    )
}
export default Column;