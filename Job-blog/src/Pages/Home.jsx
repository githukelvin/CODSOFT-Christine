import React, {useEffect, useState} from "react"
import Banner from "../components/Banner"
import Card from "../components/Card"
import Jobs from "./Jobs"
import Sidebar from "../sidebar/Sidebar"
import Button from "../sidebar/Button"


const Home = () => {
  const[selectedCategory,setSelectedCategory] = useState(null);
  const [jobs,setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  useEffect(()=> {
    setIsLoading(true);
    fetch("jobs.json").then(res => res.json()).then(data => {
      // console.log(data)
      setJobs(data);
      setIsLoading(false);
    });
  }, [])
  console.log(jobs)
// handle input charge
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
    // console.log(event.target.value);
  };
  // console.log(query)
//filter jobs by title
    const filteredItems=jobs.filter((jobs) => jobs.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    // console.log(filteredItems)

    //Radio based button  filtering
    const handleChange = (event) =>{
      setSelectedCategory(event.target.value)

    }

    //button based filtering
    const handleClick=(event) =>{
      setSelectedCategory(event.target.value)
    }
   

    // calculate the index range
    const calculatePageRange = () => {
      const startIndex =(currentPage -1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return {startIndex, endIndex};
    }
    
    //function for the next page
    const nextPage = () => {
      if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
        setCurrentPage(currentPage + 1);
      }
    }

    //function for previous page
    const prevPage = () => {
      if(currentPage > 1){
        setCurrentPage(currentPage - 1)
      }
    }
 
    //main function button
    const filteredData = (jobs, selected, query) => {
      let filteredJobs = jobs;
  
      // Filter by query
      if (query) {
          filteredJobs = filteredJobs.filter(job =>
              job.jobTitle.toLowerCase().includes(query.toLowerCase())
          );
      }
      
      // Filter by selected category
      // if (selected) {
      //     filteredJobs = filteredJobs.filter(job =>
      //         (job.jobLocation && job.jobLocation.toLowerCase() === selected.toLowerCase()) ||
      //         (job.maxPrice && parseInt(job.maxPrice) === parseInt(selected)) ||
      //         (job.salaryType && job.salaryType.toLowerCase() === selected.toLowerCase()) ||
      //         (job.employmentType && job.employmentType.toLowerCase() === selected.toLowerCase())
      //     );
      // }
  

//posting date review

if (selected) {
  filteredJobs = filteredJobs.filter(
    ({
      jobLocation,
      maxPrice,
      salaryType,
      employmentType,
      postingDate,
      experienceLevel,
    
    }) =>
    jobLocation.toLowerCase() === selected.toLowerCase() ||
    parseInt(maxPrice) <= parseInt(selected) ||
    postingDate >= selected ||
    salaryType.toLowerCase() === selected.toLowerCase() ||
    experienceLevel.toLowerCase() === selected.toLowerCase() ||
    employmentType.toLowerCase() === selected.toLowerCase()


  );
  console.log(filteredJobs)
} 
      // Slice the data based on current page
      const { startIndex, endIndex } = calculatePageRange();
      filteredJobs = filteredJobs.slice(startIndex, endIndex);
  
      return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  

    const result = filteredData(jobs, selectedCategory, query);
  return (
   <div>
    <Banner query={query} handleInputChange = {handleInputChange}/>
    {/* //main content */}
    <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

      {/* leftside */}
       <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick}/>
       </div>

       {/* job cards*/}
       <div className="col-span-2 bg-white p-4 rounded-sm"> 
         {
          isLoading ? (<p>Loading....</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
          <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
          <p>No jobs found!</p>
          </>
         } 
    
         {/* pagination here */}
         {
          result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={ currentPage === 1} className="hover:underline">Previous</button>
              <span>page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="hover:underline">Next</button>

            </div>
           ) : ""
         }
       
       </div>

       {/* rightside */}
       <div className="bg-white p-4 rounded">right</div>
     
    </div>
   </div>
   

  )
}

export default Home