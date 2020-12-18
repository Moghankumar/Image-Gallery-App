import React, { Component } from 'react'
import Footer from './Footer';
import './gallery.css';
import Header from './Header';
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegCommentDots} from 'react-icons/fa';
// import Cards from './Cards';
  
// apikey:ae7942d814bfd6d278aa659da7d82ded
// secretkey:01c21b9255bbaec2

export class Gallery extends Component {
    
    constructor(props){
        super(props)
        this.state={
            detail:null,
            loading:true,
            pictures:null,
            searchimage:null,
            title:null
        }
    }
    async componentDidMount(){
        var apikey='ae7942d814bfd6d278aa659da7d82ded';
        var url=`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apikey}&per_page=30&format=json&nojsoncallback=1`;
    
        var response=await fetch(url);
        const data=await response.json();
        console.log(data.photos);
       
        let img=data.photos.photo.map((detail,index)=>{
            
            if(detail.id && detail.server && detail.secret){
                var imgurl=`https://live.staticflickr.com/${detail.server}/${detail.id}_${detail.secret}_b.jpg`;
                return(
                    <div id="bodypicture" key={index} >
                        <img  id="bodyrecentimg"  src={imgurl} alt="loading"/> 
                        <div>
                            <span>Recently</span>                            
                            <div id="overview">
                                <div>
                                <h3>{detail.title}</h3>
                                </div>
                                <div id="overviewicon">
                                    <AiOutlineLike />
                                    <FaRegCommentDots/>
                                </div>
                            
                            </div>
                        </div>                  

                    </div>
                )
            }
        })
        this.setState({
            detail:data.photos,
            loading:false,
            pictures:img,
            searchimage:null
        })
        
    }        
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="bodyimg">
                    <h2 id="content">Recents posts</h2>
                    <div id="bodyresultshow">
                    {this.state.pictures}
                    </div>
                   
                </div>
                <Footer/>                
            </div>
        )
    }
}

export default Gallery
