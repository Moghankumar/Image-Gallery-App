import axios from 'axios';
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegCommentDots} from 'react-icons/fa';

class Test extends React.Component{
    constructor(props){
        super(props)
        this.display(props);
        this.state={
            img:null,
            title:null
        }
    }
    display(props){
        
        var path=this.props.match.url;        
        var paths=(path.replace(/[^a-zA-Z ]/g, ""));
        console.log(paths)
    
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ae7942d814bfd6d278aa659da7d82ded&tags=${paths}&format=json&nojsoncallback=1`)
        .then(res=>{
                const datas=res.data.photos;
                let searchimg=datas.photo.map((datas,index)=>{
                    var searchurl=`https://live.staticflickr.com/${datas.server}/${datas.id}_${datas.secret}_b.jpg`
                    return(
                        <div id="searchresult" key={index}>                    
                            <img id="searchimg" src={searchurl} alt="loading"/> 
                            <div id="overviewbtn">
                                <div>
                                    <h3>{datas.title}</h3>
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
                    img:searchimg,
                    title:paths
                })          
        }
        )
        .catch((error)=>{
            console.log("Error",error)
        })
        }
    render(){
        return(
            <div>
                <Header/>
                <h1 id="content">{this.state.title}</h1>
                <div id="searchcontent">
                {this.state.img}
                </div>                
                <Footer/>
            </div>
        )   
    }
}


export default Test

