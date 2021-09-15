// import React, { Component } from 'react'
import React , {useEffect, useState} from 'react';

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



// export class News extends Component { 
    const News =(props)=>{
        const [articles, setArticles] = useState([]);
        const [loading, setLoading] = useState(true);
        const [page, setPage] = useState(1);
        const [totalResults, setTotalResults] = useState(0)
        
    
    //   articles = [{ "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" }, "author": null, "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com", "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com", "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket", "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg", "publishedAt": "2020-04-27T11:41:47Z", "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]" },
    //    { "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" }, "author": null, "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com", "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com", "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again", "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg", "publishedAt": "2020-03-30T15:26:05Z", "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]" }]


    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // constructor(props) {
    //     super(props);
    //     console.log("hello i'm constructor from news components");
    //     // this.state = {

    //     //     articles: [],
    //     //     loading: false,
    //     //     page: 1,
    //     //     totalResults: 0

    //     // }
    // }

    const updateNews= async()=> {
        props.setProgress(10);
        // this.setState({loading: true});
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
       
        // this.setState(
        //     {
        //         articles: parsedData.articles,
        //         totalResults: parsedData.totalResults,
        //         loading: false,
               
        //     });
            props.setProgress(100);
    }
     
 
    

     useEffect(() => {
         document.title = `${capitalizeFirstLetter(props.category)} - NewsFeed`;
        updateNews();
        //   eslint-disable-next-line
        
    }, [])

    // async componentDidMount() {
    //     this.updateNews();
    //     //     this.setState({loading: true});
    //     //  let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}bb7202d0a2e54b67bfd61cf4137af4e1&page=${this.state.page}&pageSize=${props.pageSize}`;
    //     //  let data= await fetch(url);
    //     //  let parsedData= await  data.json()
    //     //  console.log(parsedData);
    //     //  this.setState(
    //     //      {articles: parsedData.articles,
    //     //      totalResults: parsedData.totalResults,
    //     //       loading: false});

    // }

    // const handlePrevClick = async () => {
    //     // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}bb7202d0a2e54b67bfd61cf4137af4e1&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data= await fetch(url);
    //     // let parsedData= await  data.json()
    //     // console.log(parsedData);
    //     // this.setState({articles: parsedData.articles})

    //     //  this.setState({
    //     //      page: this.state.page - 1,
    //     //      articles: parsedData.articles ,
    //     //      loading: false
    //     //  })

    //     // this.setState({ page: this.state.page - 1 });
    //     setPage(page-1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     // if(!(this.state.page + 1> Math.ceil(this.state.totalResults/props.pageSize))){

    //     //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}bb7202d0a2e54b67bfd61cf4137af4e1&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data= await fetch(url);
    //     //     let parsedData= await  data.json()


    //     //     // this.setState({articles: parsedData.articles})

    //     //  this.setState({
    //     //      page: this.state.page + 1,
    //     //      articles: parsedData.articles ,
    //     //      loading: false

    //     //           })
    //     // }
    //     // this.setState({ page: this.state.page + 1 });
    //     setPage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        // this.setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        // this.setState(
        //     {
        //         // articles: this.state.articles.concat(parsedData.articles),
        //         articles: articles.concat(parsedData.articles),
        //         totalResults: parsedData.totalResults,
        //         loading: false,
               
        //     });
        };

    // render() {

        return (
                 <>
                <h1 className="text-center" style={{marginTop: '80px' ,fontFamily: "'Abril Fatface', cursive", fontSize: "50px"
}}>NewsFeed - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {/* {this.state.loading &&<Spinner/>} */}
                {loading&& <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length!== totalResults}
                    loader={<Spinner/>}
                >
                   <div className="container">

                   
                    <div className="row">

                        {/* !this.state.loading is false then show this this.state.articles.map((element) */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                   
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            
              </>
        )
    // }

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News

