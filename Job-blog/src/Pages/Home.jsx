import React, {useState} from "react"
import Banner from "../components/Banner"
const Home = () => {
  const[selectedCategory,setSelectedCategory] = useState(null);
  const [jobs,setJobs] = useState([]);
  
  useEffect

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // console.log(event.target.value);
  };
  console.log(query)
  return (
   <div>
    <Banner query={query} handleInputChange = {handleInputChange}/>
   </div>

  )
}

export default Home