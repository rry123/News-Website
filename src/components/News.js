import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=>{
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0)
    // 
    const capitalize = (string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    const updateNews=async()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=af2d97fb7a3549b68beba801dcc88eee&page=${page}&pageSize=${props.pageSize}`;
      setloading(true);
      let data = await fetch(url);
      let parsedata =  await data.json();
      setarticles(parsedata.articles);
      settotalResults(parsedata.totalResults);
      setloading(false);
      
       props.setProgress(100);
    }
     useEffect(() => {
      document.title = `${capitalize(props.category)} - RajTak`;
       updateNews();  
     }, [])
     
    const handlenext= async()=>{
        setpage(page+1);
        updateNews();
    }
    const handleprev = async ()=>{
      setpage(page-1);
      updateNews();
    }
  const  fetchMoreData = async() =>{
        setpage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=af2d97fb7a3549b68beba801dcc88eee&page=${page}&pageSize=${props.pageSize}`;
       // setloading(true);
        let data = await fetch(url);
        let parsedata =  await data.json();
        setarticles(articles.concat(parsedata.articles));
        settotalResults(parsedata.totalResults);
        
    }    
    return (
      
      <div className= "container my-3">
      <h2>Raj Tak- Top {capitalize(props.category)} Headlines</h2>
      {loading && <Spinner/>}
     
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
           <div className="row" >
          { articles.map((element)=>{
              return  <div className="col-md-4" key = {element.url}>
                 <Newsitem   title = {element.title?element.title.slice(0, 45):""} description = {element.description?element.description.slice(0, 88):""} imageurl={element.urlToImage} newsurl = {element.url}  author = {element.author} date={element.publishedAt} source = {element.source.name}/>
                 </div>
          })}
                
          </div>    
          </div>
         
          </InfiniteScroll>
          
      </div>
    
    )

}

export default News
News.defaultProps = {
  country : 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes={
       country: PropTypes.string,
       pageSize: PropTypes.number,
       category: PropTypes.string,
}