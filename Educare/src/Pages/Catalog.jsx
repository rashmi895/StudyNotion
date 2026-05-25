import React, { useEffect, useState } from 'react'
// import Footer from '../Components/Common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../Services/apiconnector';
import { categories } from '../Services/apis';
import { getCatalogaPageData } from '../Services/operations/pageAndComponentData';
import Course_Card from '../Components/Core/Catalog/Course_Card';
import CourseSlider from '../Components/Core/Catalog/CourseSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const normalizeCatalogName = (value = "") =>
        value.trim().toLowerCase().replace(/\s+/g, "-");
    
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1)
    const [loading, setLoading] = useState(false)
    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true)
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const matchedCategory = res?.data?.data?.find(
                    (ct) =>
                        normalizeCatalogName(ct.name) ===
                        normalizeCatalogName(catalogName)
                );

                setCategoryId(matchedCategory?._id || "");
            }
            catch(error) {
                console.log(error)
                setCategoryId("")
            }
            finally {
                setLoading(false)
            }
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            setLoading(true)
            try{
                const res = await getCatalogaPageData(categoryId);
                // console.log("PRinting res: ", res);
                if (res.success) {
                    setCatalogPageData(res);
                }
                else{
                    setCatalogPageData(null)
                }
                setLoading(false)
            }
            catch(error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        else {
            setCatalogPageData(null)
        }
        
    },[categoryId]);

    useEffect(() => {
    //   console.log("catalogPageData?.selectedCourses.course.length", catalogPageData?.selectedCourses.course.length)
    //   console.log("catalogPageData?.differentCourses.course.length", catalogPageData?.differentCourses.course.length)
    //     console.log("catalogPageData?.mostSellingCourses.length ",catalogPageData?.mostSellingCourses.length)
      
    }, [catalogPageData])
    
    
    if(loading){
        return (
        <div className=' h-screen flex justify-center items-center text-white mx-auto  text-3xl'>
        <p>
                Loading...
        </p>
        </div>
    )}
    else{
        return (
            <>
                {
                    (!catalogPageData) ? 
                    (<div className=' text-center text-xl text-white my-8'> No Courses for the category </div>) 
                    :(
                        <>    
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-white">{`Home / Catalog / `}
                <span className="text-yellow-25">
                    {catalogPageData?.name}
                </span></p>
                <p className="text-3xl text-white"> {catalogPageData?.name} </p>
                <p className="max-w-[870px] text-white"> {catalogPageData?.description}</p>
                </div>
            </div>
        
            <div >
                {/* section1 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-white">Courses to get you started</div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                    className={`px-4 py-2 ${
                      active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-white"
                    } cursor-pointer`}
                    onClick={() => setActive(1)}
                  >
                    Most Populer
                  </p>
                  <p
                    className={`px-4 py-2 ${
                      active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-white"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                  >
                    New
                  </p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.selectedCourses.course} />
                    </div>
                </div>  
        
                {/* section2 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-white">Checkout {catalogPageData?.differentCourses?.name} Courses Also</div>
                    <div className="py-8">
                        <CourseSlider Courses={catalogPageData?.differentCourses?.course}/>
                        
                    </div>
                </div>
        
                {/* section3 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading text-white">Most Selling Courses</div>
                    <div className='py-8'>
        
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
                            {
                                catalogPageData?.mostSellingCourses.length === 0 ? (<p className=' text-xl text-white'>No Most selling courses</p>) : (catalogPageData?.mostSellingCourses?.slice(0,4)
                                .map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                                )))
                            }
        
                        </div>
        
                    </div>
                </div>
        
            </div>
        {/* <Footer /> */}
            </>
                    )
                }
            </>
        
            
          )
    }
}

export default Catalog
