import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegCommentDots} from 'react-icons/fa';
// import Cards from './Cards';

export class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            detail:null,
            loading:true,
            pictures:null,
            searchimage:null,
            title:null,
            inputvalue:""
        }
        this.search=this.search.bind(this)
    } 
    
    async search(props){
        console.log(props);
        var inputvalue=document.querySelector("#searchbar").value;
          
        var apikey='ae7942d814bfd6d278aa659da7d82ded';

        var searchurl=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${inputvalue}&format=json&nojsoncallback=1`;
        var res=await fetch(searchurl);    
        const searchdata=await res.json();
        console.log(searchdata);      
            
        let searchimg=searchdata.photos.photo.map((searchdata,index)=>{
            var searchurl=`https://live.staticflickr.com/${searchdata.server}/${searchdata.id}_${searchdata.secret}_b.jpg`
            return(
                <div id="searchresult" key={index} >                    
                    <img id="searchimg" src={searchurl} alt="loading"/> 
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
            detail:searchdata.photos,
            loading:false,
            pictures:null,
            searchimage:searchimg,
            title:inputvalue,
        })
        console.log("Inputvalue :",this.state.title);
    }
    handlechange(event){
        var title=event.target.value;
        console.log(title);
        
        this.setState({
            inputvalue:title
        })
    }
    menu=[{name:"Mountains", path:"/images/mountain"},{name:"Beaches",path:"/images/beach"},{name:"Birds", path:"/images/bird"},{name:"Foods",path:"/images/food"}]
    render() {     
        return (
            <div>
                <div id="header">
                    <img src="https://www.theindianwire.com/wp-content/uploads/2020/11/Google-Photos-Logo.png"/>             
                </div>
                <div className="Searchtopic">
                    <input type="text" id="searchbar" onChange={this.handlechange.bind(this)} className="searchbar"/>
                   {/* <button id="submit" className="submit" onClick={this.search}>Check</button>  */}
                   <Link to={`/${this.state.inputvalue}`}><button id="submit"className="submit">Check</button></Link>              
                </div>
                <div className="btncontent">
                     {this.menu.map((x,i)=>
                    <Link to={x.path} key={i}><button id="btns" value={x.name}>{x.name}</button></Link>                    
                )}
                
                </div>
                {/* <Cards/> */}
                <div> 
                    <h1 id="content">{this.state.title}</h1>   
                   <div className="searchresultimg">                               
                        {this.state.searchimage} 
                    </div>                        
                </div>       
            </div>
    
        )
    }
}

export default Header
