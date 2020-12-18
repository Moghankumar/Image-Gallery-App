import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegCommentDots} from 'react-icons/fa';

export class Birds extends Component {
    constructor(props){
        super(props)
        this.state={
            btnimg:null,
            loading:false
        }
    }
    async componentDidMount(){
        var apikey='ae7942d814bfd6d278aa659da7d82ded';
        var searchurl=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=bird&per_page=30&format=json&nojsoncallback=1`;
        var res=await fetch(searchurl);        
        const searchdata=await res.json();
        console.log(searchdata);  
        
        var btnimg=searchdata.photos.photo.map((searchdata,index)=>{
            var searchurl=`https://live.staticflickr.com/${searchdata.server}/${searchdata.id}_${searchdata.secret}_b.jpg`
            return(
                <div id="searchresult" key={index}>
                    <img id="searchimg"  src={searchurl} alt="loading"/>  
                    <div id="overviewbtn">
                        <div>
                            <h3>{searchdata.title}</h3>
                        </div>
                        <div id="overviewiconbtn">
                            <AiOutlineLike />
                            <FaRegCommentDots/>
                        </div>                    
                    </div>                   
                               
                </div>
            )
        })
        this.setState({
            btnimg:btnimg,
            loading:false
        })

    }
    render() {
        return (            
            <div>
                <Header/>
                <h1 id="content">Birds</h1>
                <div id="birdscontent">
                     {this.state.btnimg} 
                </div>
                <Footer/>       
            </div> 
        )
    }
}

export default Birds;
