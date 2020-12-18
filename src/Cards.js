import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {AiOutlineLike} from 'react-icons/ai';
import {FaRegCommentDots} from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import Gallery from './Gallery';

export class Cards extends Component {
    constructor(props){
        super(props)
        this.state={
            btnimg:null,
            loading:false
        }
        this.display=this.display.bind(this);
    }
    clicked1(){
        var btn=document.getElementById("btns1").value
        console.log(btn);
        this.display(btn)
    }
    clicked2(){
        var btn=document.getElementById("btns2").value;
        console.log(btn);
        this.display(btn);
    }
    clicked3(){
        var btn=document.getElementById("btns3").value;
        console.log(btn);
        this.display(btn)
    }
    clicked4(){
        var btn=document.getElementById("btns4").value;
        console.log(btn);
        this.display(btn);
    }
    async display(btn){
        console.log("Display :",btn)

       var apikey='ae7942d814bfd6d278aa659da7d82ded';
        var searchurl=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${btn}&per_page=30&format=json&nojsoncallback=1`;
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
                <div id="cardbutton">
                    <div>
                        <Link to="/images/mountains"><button id="btns1" onClick={this.clicked1.bind(this)} target="Mountains" value="Mountains">Mountains</button></Link>
                    </div>
                    <div>
                        <Link to="/images/beaches"><button id="btns2" onClick={this.clicked2.bind(this)} value="Beaches">Beaches</button></Link>
                    </div>
                    <div>
                        <Link to="/images/birds"><button id="btns3" onClick={this.clicked3.bind(this)} value="Birds">Birds</button></Link>
                    </div>
                    <div>
                        <Link to="/images/foods"><button id="btns4" onClick={this.clicked4.bind(this)} value="Foods">Foods</button></Link>
                    </div>
                </div>
                
                <div id="buttoncontent">
                    {this.state.btnimg}
                </div>
                {/* <Gallery/> */}
                <Footer/>
                
                
            </div>
        )
    }
}

export default Cards
