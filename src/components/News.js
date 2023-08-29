import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //this is use dto capitalize first letter of totle
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // first constructor is executed then  render then componentDidMount
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }
  //this function is passed inside both below prev and next function
  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=5a055af8e2a74ca3b7014922722d1930&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a055af8e2a74ca3b7014922722d1930&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  // Handlepreviousclick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.update();
  // };

  // Handlenextclick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.update();
  // };
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=5a055af8e2a74ca3b7014922722d1930&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    this.setState({
      page: this.state.page + 1,
    })
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false,
    });
  }
  
  render() {
    return (
      <>
      
        {/* // when loading is true then spinner comes */}
        {this.state.loading && <Spinner/>}         
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"90px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines{" "}
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles?.map((element) => {
              //spinner comes when clicked on next
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      
      </>
    );
  }
}
