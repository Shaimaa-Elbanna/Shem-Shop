

import axios from 'axios'
import  { useEffect, useState } from 'react'

export default function useUrl<T>(url:string) {

  const [allData,setData]=useState<T>()
  const [loading,setLoading]=useState<boolean>(false)
  const [index,setIndex]=useState<number>(20)


  async function getDataFromUrl(){
    try {
      let {data}=await axios.get<T>(url)

    setData(data)
    setLoading(true)
    } catch (error) {
      console.log(error);
      
    }

    

  }

  useEffect(()=>{
    getDataFromUrl()
  },[url])

  // function sliceData():void{
  //   setIndex(index+20)
  //   if(index>allData.length){
  //     setIndex(allData.length)
  //   }
  // }


  return { allData, loading, index };

}





// export default function useUrl<T>(url: string) {
//   const [allData, setData] = useState<T[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [index, setIndex] = useState(20);

//   async function getDataFromUrl() {
//     try {
//       const { data } = await axios.get<T[]>(url);
//       setData(data);
//       setLoading(false);
//     } catch (error) {
//       // Handle error if the API request fails
//       console.error('Error fetching data:', error);
//     }
//   }

//   useEffect(() => {
//     getDataFromUrl();
//   }, []);

//   function sliceData() {
//     setIndex(prevIndex => {
//       const newIndex = prevIndex + 20;
//       if (newIndex > allData.length) {
//         return allData.length;
//       }
//       return newIndex;
//     });
//   }

//   return { allData, loading, index, sliceData };
// }
