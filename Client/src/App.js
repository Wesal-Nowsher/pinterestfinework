import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Boxes from './Components/boxes/boxes';
import Columns from './Components/boxes/column';
import './App.css';
import data1 from './data.json';
import BlockchangeModal from './Components/boxes/blockchangemodal';
import Modal from 'react-modal';
import ColumnResizer from "react-column-resizer";
import Rectanlgebox from "./Components/boxes/rectanglebox";
import Urlfeature from "./Components/URLfeature/index";
import { Carousel } from 'react-responsive-carousel';
import { DefaultEditor } from 'react-simple-wysiwyg';
// import CKEditor from "react-ckeditor-component";
import emojis from 'tinymce-emoji';
import { Editor } from "@tinymce/tinymce-react";
import {previewdata, openpreview,previewdataactioncheck} from './Components/preview/action';
import {urlcomplete} from './Components/URLfeature/action';
import {previewdataactioncheckfun} from './Components/functions';
import Preview from './Components/preview/index'
import Zip from './Components/unzip/index'
import {customstyles} from './customstyle';

const customStyles=customstyles;

class App extends Component {
    state={
        data:null,
        objectfit:"cover",
        youtube:"",
        columntitle:"",
        columnindextie:"",
        searchtimes:0,
        maindata:null,
        dragcolumn:false,
        dragging:false,
        modalIsOpen:false,
        editindex:null,
        textAlign:"",
        editindexcol:null,
        filecond:"text",
        text:"",
        color:"white",
        textcolor:"black",
        textsize:"12",
        fontfamily:"serif",
        file:"",
        heightpreview:"1",
        resize:false,
        trashcolumn:false,
        addblock:false,
        addcolumn:false,
        columnmodalIsOpen:false,
        newcolummn:[data1.data],
        searchvalue:"",
        bgsrc:"",
        rectangles:[{}],
        tooloption:false,
        addblocktitle:false,
        pagetitle:"",
        modalpagetitle:false,
        pagetextsize:"24",pagetitle:"",pagefontfamily:"",pagetextAlign:"",pagetextcolor:"",
        imgviewsrc:"",
        imgsrc:"",
        modalbloctitle:false, blocktitle:"", blockindextie:{},
        addeachblocktitle:false,
        addeachblockfootertitle:false,
        displaytext:"",
        displaytextcolor:"",displaytextsize:"",displayfontfamily:"",displaytextAlign:"",p:""
        ,editorHtml: '', theme: 'snow',
        rowallfilesmodal:false,
        rowallfiles:{},
        rowallfilescolumns:5,
        contentState: {},
        addurls:false, addvideos:false,
        comment:"",




    }

    componentDidMount(){
        let newl=previewdataactioncheckfun()
        console.log("check action", newl);
        let data=data1.data;
        let imagename=["login.PNG","graph1.PNG", "graph2.PNG", "graph3.PNG", "graph4.PNG", "graph5.PNG"];
        let newdatatoplit=[];
        let i=0;
        for( i=0;i<30;i++){
            // let randomindex=Math.floor(Math.random() * 4)+1;
            let simple={...data};

            let generatedcontent=[];
            // console.log("data generated",randomindex);
            for(let j =0;j<3;j++){
                let randomindex=Math.floor(Math.random() * 4)+1;
                let contant={...data.content[0]};
                simple.h=randomindex;
                contant["imagename"]="";
                contant["type"]="addblock";
                contant["backgroundcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                contant["displaybackgroundcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                contant["displaytextcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                contant["textcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                generatedcontent.push(contant);
                randomindex=Math.floor(Math.random() * 4)+1
            }
            simple.content=[...generatedcontent];
            simple.like=false
            simple.commentshow=false
            simple.comments=[
            ]
            // simple["h"]=randomindex;
            // simple["imagename"]=imagename[randomindex];
            newdatatoplit.unshift(simple);
            // console.log("data ",i,randomindex)

        }
        let generatesplit=this.split(newdatatoplit,6);
        console.log("data generated", generatesplit,newdatatoplit)
        this.setState({data:generatesplit});

        let randomindexm=Math.floor(Math.random() * 4)+1;
        let rect=data1.rectangles;
        rect.h=randomindexm;
        let newrectarray=[];
        newrectarray.unshift(rect)
        this.setState({rectangles:newrectarray})
    }
    addblock(index, poru){
        let {data}=this.state;
        let newData=data;
        let newsample={...data1.data};
        let contant={...newsample.content[0]};
        contant.backgroundcolor=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        contant.type="addblock";
            newsample.h=Math.floor(Math.random() * 3) + 1;

        newsample.content=[contant];
        let spliceIndex=newData[index].length-1;
        if(poru!=="push" && poru!=="shift"){
            newData[index].splice(spliceIndex, 0, {newsample});
        }
        else if(poru==="push" ){
            newData[index].push(newsample)
        }
        else if (        poru==="shift" ){
            newData[index].unshift(newsample)
        }
        // console.log("new data add block",newData);
        this.setState({data:newData})
    }
    closeModal(){
        this.setState({modalIsOpen:false})
    }
    closeModalcol(){
        this.setState({columnmodalIsOpen:false})
    }
    // swapboxes
    swapBoxes = (index1, index2,dragindex1,dragindex2,colorbox) => {
        let {data}=this.state;
        let newData=[...data];
        if(colorbox==="box" && newData[index1].length>1){
            console.log("called")

            if(index1!==dragindex1)
            {
                console.log("called index2 isnot 0", )
                newData[index1].splice(index2, 0, newData[dragindex1][dragindex2]);
                newData[dragindex1].splice(dragindex2, 1);
                console.log("more to it",newData);
                this.setState({data:newData});
            }
            else if(index1===dragindex1 ){
                console.log("data",data,dragindex1,dragindex2, index1, index2);
                let tempimg=newData[index1][index2].imagename;
                let temph=newData[index1][index2].h;
                let temptext=newData[index1][index2].text;
                let temptextcolor=newData[index1][index2].textcolor;
                let tempcolor=newData[index1][index2].backgroundcolor;
                let tempsrc=newData[index1][index2].src;
                newData[index1][index2].imagename=newData[dragindex1][dragindex2].imagename;
                newData[index1][index2].h=newData[dragindex1][dragindex2].h;
                newData[index1][index2].text=newData[dragindex1][dragindex2].text;
                newData[index1][index2].textcolor=newData[dragindex1][dragindex2].textcolor;
                newData[index1][index2].backgroundcolor=newData[dragindex1][dragindex2].backgroundcolor;
                newData[index1][index2].src=newData[dragindex1][dragindex2].src;
                newData[dragindex1][dragindex2].imagename=tempimg;
                newData[dragindex1][dragindex2].h=temph;
                newData[dragindex1][dragindex2].text=temptext;
                newData[dragindex1][dragindex2].textcolor=temptextcolor;
                newData[dragindex1][dragindex2].backgroundcolor=tempcolor;
                newData[dragindex1][dragindex2].src=tempsrc;
                this.setState({data:newData})
            }
        }
        else if(colorbox==="column" && newData[index1].length<=1 ){
            console.log("column drop", index1, index2, dragindex1, dragindex2, colorbox )
            newData[index1].unshift(newData[dragindex1][dragindex2]);
            newData[dragindex1].splice(dragindex2, 1);
            console.log("more to it",newData);
            this.setState({data:newData});
        }
        else if(colorbox==="column" &&  newData[index1].length>1   ){
            console.log("only column")
        }
    };
    swapcolumns= (index, indexgrag) => {
        let {data}=this.state;
        let newData=data;
        let tempimg=[...newData[index]];
        newData[index]=[...newData[indexgrag]];
        newData[indexgrag]=tempimg;
        this.setState({data:newData});

    };
    // swapboxes
    // function
    handleDropblock = (index1, index2,bxorcl) => event =>
    {
        // console.log("more ont this")
        event.preventDefault();
        let dragindex1 = JSON.parse(event.dataTransfer.getData("index1"));
        let dragindex2 = JSON.parse(event.dataTransfer.getData("index2"));
        // console.log("box or column",bxorcl,index2)
        this.swapBoxes(index1, index2,dragindex1,dragindex2,bxorcl);
        return false;
    };
    // function
    handleDragStartblock = (index1, index2) => event => {
        // console.log("more ali")
        event.dataTransfer.setData("index1", index1);
        event.dataTransfer.setData("index2", index2);
    };
    // function
    handleDragOverblock = (index1, index2) => event => {
        // console.log("more ali")
        console.log("")
        event.stopPropagation();
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };
    // function
    handleDropcolumn = (index1,arr) => event =>
    {
        // console.log("more ont this")
        event.preventDefault();
        this.setState({dragging:false})
        let indexdrop = JSON.parse(event.dataTransfer.getData("index"));
        this.swapcolumns(index1,indexdrop);
        return false;
    };
    // function
    handleDragStartcolumn= (index) => event => {
        // console.log("more ali")
        event.dataTransfer.setData("index", index);
    };
    // function
    handleDragOvercolumn = (index,arr) => event => {
        // console.log("more ali")
        this.setState({dragging:true})
        event.stopPropagation();
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };
    // function
    trashblock(index1, index2,ite,ind){
        // let that=this;
        let { data }=this.state;
        let newData=data;


        let thearr=[];


        if(newData[index1][index2].content.length>1){
            newData[index1][index2].content.map((item,index)=>{
                if(index!==ind){
                    thearr.push(item);
                }
            })
            newData[index1][index2].content=[...thearr];
            this.setState({data:newData})
        }
        else{
            newData[index1].map((item,index)=>{
                if(index!==index2){
                    thearr.push(item);
                }
            })
            newData[index1]=[...thearr];
            this.setState({data:newData})
        }
        this.forceUpdate();
        console.log("m/ore", thearr, newData);



    }
    trashrectangle(index){
        // let that=this;
        let { rectangles }=this.state;
        let newData=rectangles;
        // console.log("m/ore", this.state.data,ite, index1, index2, newData[index1]);

        let thearr=[];

        newData.map((item,index)=>{
            if(index!==index){
                thearr.push(item);
            }
            // console.log("more", item)
            // item.map((ite,index)=>{

            // })
        })
        newData=[...thearr];
        this.setState({rectangles:newData})
    }
    src(src){

    }
    onSelectFile = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    onSelectFileforblock = (event) => {
        this.setState({
            bgsrc: URL.createObjectURL(event.target.files[0])
        })
    }
    // onSelectFile = e => {
    //     // if (e.target.files && e.target.files.length > 0) {
    //     //     const reader = new FileReader();
    //     //     reader.addEventListener('load', () =>
    //     //         this.setState({file:reader.result })
    //     //     );
    //     //     reader.readAsDataURL(e.target.files[0]);
    //     // }
    // };

    addblockbetween(index, spliceIndex){
        let {data}=this.state;
        console.log("addblockbetween", data, index, spliceIndex)
        let newData=data;
        let newSample={...data1.data};
        let newsample={...newSample};
        let contant={...newSample.content[0]};
        newsample.h=Math.floor(Math.random() * 3) + 1;
        contant.backgroundcolor=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        contant["type"]="addblock";
        newsample["content"]=[contant];
        newData[index].splice(spliceIndex, 0, newsample);
        console.log("addblockbetween",newsample, newData, index, spliceIndex)
        this.setState({data:newData})
    }
    addblocknewitem(bool, index,inde,cindex){
        let {data}=this.state;
        let newData=data;
        let newsamplecontent={...data1.data.content[0]};
        newsamplecontent.backgroundcolor=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        let spliceIndex=newData[index].length-1;
        newData[index][inde].content.push({...newsamplecontent});

        // console.log("new data add block",newData);
        this.setState({data:newData})
    }
    RemoveColumn(index){
        let {data}=this.state;
        let newData=data;
        let newarr=[];
        newData.map((item,inde)=>{
            if(inde!==index){
                newarr.push(item);
            }
        });
        this.setState({data:[...newarr]});
    }
    // function
    addcolumn(index){

        let {data}=this.state;
        let newData=[...data];


        let x=[1,2,3,4,5];
        let newcolumn=[];
        let newSample ={...data1.data};
        let newsample =newSample;
        x.map((item,index)=>{
            newsample.h=Math.floor(Math.random() * 3) + 1;
            let col1=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            let col2=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            let contant={...newsample.content[0]};
            contant.backgroundcolor=col1;
            contant.displaybackgroundcolor=col2;
            contant.type="addblock";
            newsample.columntitle=`column`;
            newsample.content=[contant];
            newcolumn.push({...newsample});
            // console.log("new column",newcolumn);
        });
        // console.log("new data", newcolumn);
        // newData.push(newcolumn)

        newData.splice(index+1, 0, newcolumn);
        // console.log("new data", newData);
        this.setState({data:newData})
    }
    addrectangle(){

        let {rectangles}=this.state;
        let newData=[...rectangles];


        let x=[1,2,3,4,5];
        let newcolumn=[];
        let newsample=data1.rectanglesample;
        newsample.h=Math.floor(Math.random() * 3) + 1;

        newsample.backgroundcolor=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;;
        newsample.columntitle=`column${newData.length+1}`
        ;
        // console.log("newsample",newsample)
        // newcolumn.push({...newsample});
        console.log("new column",newcolumn);
        // console.log("new data", newcolumn);
        newData.push(newsample)
        // console.log("new data", newData);
        this.setState({rectangles:newData})
    }
    split=(array,chunkSize)=> {
        return [].concat.apply([],
            array.map(function(elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
    reset(){
        if(this.state.searchtimes> 1 && this.state.maindata){
            this.setState({data:this.state.maindata,searchvalue:""});
        }else{
            let data=data1.data;
            let imagename=["login.PNG","graph1.PNG", "graph2.PNG", "graph3.PNG", "graph4.PNG", "graph5.PNG"];
            let newdatatoplit=[];
            let i=0;
            for( i=0;i<30;i++){
                // let randomindex=Math.floor(Math.random() * 4)+1;
                let simple={...data};

                let generatedcontent=[];
                // console.log("data generated",randomindex);
                for(let j =0;j<3;j++){
                    let randomindex=Math.floor(Math.random() * 4)+1;
                    let contant={...data.content[0]};
                    simple.h=randomindex;
                    contant["h"]=randomindex;
                    contant["imagename"]=imagename[randomindex];
                    generatedcontent.push(contant);
                    randomindex=Math.floor(Math.random() * 4)+1
                }
                simple.content=[...generatedcontent]
                // simple["h"]=randomindex;
                // simple["imagename"]=imagename[randomindex];
                newdatatoplit.unshift(simple);
                // console.log("data ",i,randomindex)

            }
            let generatesplit=this.split(newdatatoplit,6);
            console.log("data generated", generatesplit,newdatatoplit)
            this.setState({data:generatesplit});
            let randomindexm=Math.floor(Math.random() * 4)+1;
            let rect=data1.rectangles;
            rect.h=randomindexm;
            let newrectarray=[];
            newrectarray.unshift(rect)
            this.setState({rectangles:newrectarray,searchvalue:""})
        }

    }
    search(){
        if(this.state.searchvalue!==""){
            let newData=this.state.data;
            this.setState({maindata:this.state.data});
            this.setState({searchtimes:this.state.searchtimes});
            let newarra=[];
            newData.map((item)=>{
                item.map((newitem)=>{
                    newitem.content.map((newit)=>{
                        if(newit.text.includes(this.state.searchvalue )){
                            newarra.push(newitem);
                        }
                    });

                });
            });

            // console.log("new array in search", newarra);
            let sliitdata=this.split(newarra,5);
            console.log("new array made",newarra, sliitdata);
            this.setState({data:sliitdata});

        }
        else{
            alert("Enter Keyword To Search");
        }

    }
    resize(){
        this.setState({resize:!this.state.resize,trashcolumn:false,addblock:false})
    }
    saveyoutubelink(){
        let {editindex}=this.state;
        let {data}=this.state;
        let newData=data;
        if(this.state.filecond==="youtube" && this.state.youtube!==""){
                newData[editindex.index][editindex.inde].content[editindex.cindex].src=this.state.youtube;
                newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="youtube";
                this.setState({data:newData,modalIsOpen:false})
            }
        }

    saveurls(){
        let {generatedcontent}=this.props;
        let {editindex, data}=this.state;
        let newData=data;
        let newcontent=[...newData[editindex.index][editindex.inde].content];
        if(generatedcontent.length>0){
            generatedcontent.map((item,index)=>{
                if(index===0){
                    newcontent.splice(editindex.cindex, 0, item);
                }
                else{
                    newcontent.push(item);
                }
            })
        }
        console.log("generated content in app.js",generatedcontent,newcontent,newData)
        newData[editindex.index][editindex.inde].content=[...newcontent];
        this.setState({data:newData,modalIsOpen:false});
        this.props.urlcomplete(false);
    }
    submit=()=>{
        // console.log("this.state.file", this.state.file)

        if(this.state.text!=="" || this.state.file!==""){
            let {editindex}=this.state;
            if(this.state.filecond==="text"){
                let {data}=this.state;
                let newData=data;
                console.log("more on this in ubsmit", newData, editindex)
                newData[editindex.index][editindex.inde].content[editindex.cindex].text=this.state.text;
                newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="text";
                newData[editindex.index][editindex.inde].content[editindex.cindex].backgroundcolor=this.state.color;
                newData[editindex.index][editindex.inde].content[editindex.cindex].textcolor=this.state.textcolor;
                newData[editindex.index][editindex.inde].content[editindex.cindex].textsize=this.state.textsize;
                newData[editindex.index][editindex.inde].content[editindex.cindex].fontfamily=this.state.fontfamily;
                newData[editindex.index][editindex.inde].content[editindex.cindex].imagename="";
                newData[editindex.index][editindex.inde].content[editindex.cindex].src="";
                newData[editindex.index][editindex.inde].content[editindex.cindex].bgsrc=this.state.bgsrc;
                newData[editindex.index][editindex.inde].content[editindex.cindex].textAlign=this.state.textAlign;
                newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]="";
                // console.log("more on terminal", newData[editindex.index])
                this.setState({data:newData,modalIsOpen:false})
            }
            else{
                let {data}=this.state;
                let newData=data;
                console.log("more on this in ubsmit", newData,editindex);
                if(this.state.file["type"].includes("image")){
                    newData[editindex.index][editindex.inde].content[editindex.cindex].src=URL.createObjectURL(this.state.file);
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="image";
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["backgroundcolor"]="black";
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["objectFit"]=this.state.objectfit;
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]=this.state.file;

                }
                else if(this.state.file["type"].includes("video")){
                    newData[editindex.index][editindex.inde].content[editindex.cindex].src=URL.createObjectURL(this.state.file);
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="video";
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]=this.state.file;
                }
                else if(this.state.file["type"].includes("audio")){
                    newData[editindex.index][editindex.inde].content[editindex.cindex].src=URL.createObjectURL(this.state.file);
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="audio";
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]=this.state.file;
                }
                else if(this.state.file["type"].includes("pdf")){
                    newData[editindex.index][editindex.inde].content[editindex.cindex].src=URL.createObjectURL(this.state.file);
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]="pdf";
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]=this.state.file;
                }
                else
                    {
                    newData[editindex.index][editindex.inde].content[editindex.cindex].src=URL.createObjectURL(this.state.file);
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["type"]=this.state.file["type"];
                    newData[editindex.index][editindex.inde].content[editindex.cindex]["filename"]=this.state.file.name;
                        newData[editindex.index][editindex.inde].content[editindex.cindex]["file"]=this.state.file;
                }
                newData[editindex.index][editindex.inde].content[editindex.cindex].text="";
                newData[editindex.index][editindex.inde].content[editindex.cindex].imagename="";
                newData[editindex.index][editindex.inde].content[editindex.cindex].backgroundcolor="Lightgrey"
                newData[editindex.index][editindex.inde].content[editindex.cindex].textcolor="";
                newData[editindex.index][editindex.inde].content[editindex.cindex].textAlign="";
                // console.log("more on terminal", newData[editindex.index])
                this.setState({data:newData,modalIsOpen:false,heightpreview:"1"})

            }
        }
    }
    submitlargetext=()=>{
        if(this.state.displaytext!==""){
            let {editindex}=this.state;
            if(this.state.filecond==="displaytext"){
                let {data}=this.state;
                let newData=data;
                console.log("more on this in ubsmit", newData, editindex)
                newData[editindex.index][editindex.inde].content[editindex.cindex].displaytext=this.state.displaytext;
                newData[editindex.index][editindex.inde].content[editindex.cindex].displaybackgroundcolor=this.state.displaybackgroundcolor;
                newData[editindex.index][editindex.inde].content[editindex.cindex].displaytextcolor=this.state.displaytextcolor;
                newData[editindex.index][editindex.inde].content[editindex.cindex].displaytextsize=this.state.displaytextsize;
                newData[editindex.index][editindex.inde].content[editindex.cindex].displayfontfamily=this.state.displayfontfamily;
                newData[editindex.index][editindex.inde].content[editindex.cindex].displaytextAlign=this.state.displaytextAlign;
                // console.log("more on terminal", newData[editindex.index])
                this.setState({data:newData,modalIsOpen:false})
            }
        }
    };
    submitrectangle=()=>{
        if(this.state.text!=="" || this.state.file!==""){
            let {editindexcol}=this.state;
            if(this.state.filecond==="text"){
                let {rectangles}=this.state;
                let newData=rectangles;
                newData[editindexcol.index].text=this.state.text;
                newData[editindexcol.index].backgroundcolor=this.state.color;
                newData[editindexcol.index].textcolor=this.state.textcolor;
                newData[editindexcol.index].textsize=this.state.textsize;
                newData[editindexcol.index].fontfamily=this.state.fontfamily;
                newData[editindexcol.index].imagename="";
                newData[editindexcol.index].src="";
                newData[editindexcol.index].bgsrc=this.state.bgsrc;
                newData[editindexcol.index].textAlign=this.state.textAlign;
                console.log("more on terminal", newData[editindexcol.index])
                this.setState({rectangles:newData,modalIsOpencol:false})
            }
            else{
                let {data}=this.state;
                let newData=data;
                newData[editindexcol.index].src=this.state.file;
                newData[editindexcol.index].text="";
                newData[editindexcol.index].backgroundcolor=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                newData[editindexcol.index].textcolor="";
                newData[editindexcol.index].textAlign="";
                console.log("more on terminal", newData[editindexcol.index])
                this.setState({rectangles:newData,modalIsOpencol:false})

            }
        }

    }
    editblock(bool, index,inde,cindex){
        // console.log("index", index, inde);
        this.setState({        blockindextie:{index, inde}})
        let {editindex, data}=this.state;
        let newData=data;
        if(newData[index][inde].content[cindex].src===""){
            let text=newData[index][inde].content[cindex].text;

            let backg =newData[index][inde].content[cindex].backgroundcolor;
            let textAlign =newData[index][inde].content[cindex].textAlign;
            let bgsrc =newData[index][inde].content[cindex].bgsrc;
            let textcolor=newData[index][inde].content[cindex].textcolor;
            let textsize=newData[index][inde].content[cindex].textsize;
            let fontfamily=newData[index][inde].content[cindex].fontfamily;
            this.setState({modalIsOpen:bool,editindex:{index,inde, cindex},
                text:text,
                color:backg, textcolor,textsize,fontfamily,
                bgsrc:bgsrc,textAlign,
                displaytext:newData[index][inde].content[cindex].displaytext,
                displayfontfamily:newData[index][inde].content[cindex].displayfontfamily,
                displaytextsize:newData[index][inde].content[cindex].displaytextsize,
                displaybackgroundcolor:newData[index][inde].content[cindex].displaybackgroundcolor,
                displaytextAlign:newData[index][inde].content[cindex].displaytextAlign,
                file:newData[index][inde].content[cindex].file,
                heightpreview:newData[index][inde].h
            })
        }
        else if( newData[index][inde].content[cindex].src!==""){
            let backg =newData[index][inde].content[cindex].backgroundcolor;
            let textcolor=newData[index][inde].content[cindex].textcolor;
            let textsize=newData[index][inde].content[cindex].textsize;
            let textAlign=newData[index][inde].content[cindex].textAlign;
            this.setState({modalIsOpen:bool,editindex:{index,inde,cindex},
                color:backg, textcolor,textsize,textAlign,
                displaytext:newData[index][inde].content[cindex].displaytext,
                displayfontfamily:newData[index][inde].content[cindex].displayfontfamily,
                displaytextsize:newData[index][inde].content[cindex].displaytextsize,
                displaybackgroundcolor:newData[index][inde].content[cindex].displaybackgroundcolor,
                displaytextAlign:newData[index][inde].content[cindex].displaytextAlign,
                file:newData[index][inde].content[cindex].file,
                heightpreview:newData[index][inde].h
            })
        }
        else{
            this.setState({modalIsOpen:bool,editindex:{index,inde,cindex},
                displaytext:newData[index][inde].content[cindex].displaytext,
                displayfontfamily:newData[index][inde].content[cindex].displayfontfamily,
                displaytextsize:newData[index][inde].content[cindex].displaytextsize,
                displaybackgroundcolor:newData[index][inde].content[cindex].displaybackgroundcolor,
                displaytextAlign:newData[index][inde].content[cindex].displaytextAlign,
                file:newData[index][inde].content[cindex].file,
                heightpreview:newData[index][inde].h
            })}
    }
    editrectangle(index, bool){
        console.log("index", index)
        let {editindex, rectangles}=this.state;
        let newData=rectangles;
        if(newData[index].src===""){
            let text=newData[index].text;

            let backg =newData[index].backgroundcolor;
            let bgsrc =newData[index].bgsrc;
            let textcolor=newData[index].textcolor;
            let textsize=newData[index].textsize;
            let fontfamily=newData[index].fontfamily;
            this.setState({modalIsOpencol:bool,editindexcol:{index}, text:text, color:backg, textcolor,textsize,fontfamily,
                bgsrc:bgsrc
            })
        }

        else if( newData[index].src!==""){
            let backg =newData[index].backgroundcolor;
            let textcolor=newData[index].textcolor;
            let textsize=newData[index].textsize;
            this.setState({modalIsOpen:bool,editindexcol:{index}, file:newData[index].src,
                color:backg, textcolor,textsize})
        }
        else{
            this.setState({modalIsOpencol:bool,editindexcol:{index}})
        }
    }
    cloneitem(index1, index2, item){

        let {data}=this.state;
        let newData=data;
        newData[index1].splice(index2, 0, newData[index1][index2]);
        console.log(newData)
        this.setState({data:newData})
    }
    clonerectangle(index){

        let {rectangles}=this.state;
        let newData=rectangles;
        newData.splice(index, 0, newData[index]);
        console.log(newData)
        this.setState({rectangles:newData})
    }
    editcolumntitle(index){
        let {data}=this.state;
        let newData=data;
        this.setState({modalcolumn:true, columntitle:newData[index][newData[index].length-1].columntitle, columnindextie:index})
    }
    editblocktitle(index,inde){
        let {data}=this.state;
        let newData=data;
        this.setState({modalIsOpen:true, blocktitle:newData[index][inde].blocktitle, blockindextie:{index, inde},
                filecond:"blocktitle"
        })
    }
    editblocktitlefooter(index,inde){
        let {data}=this.state;
        let newData=data;
        this.setState({modalIsOpen:true, blocktitlefooter:newData[index][inde].blocktitlefooter, blockindextie:{index, inde},
                filecond:"blocktitlefooter"
        })
    }

    like(index,inde,Reaction){
        let {data}=this.state;
        let newData=data;
        let newReactions=[...newData[index][inde].reactions];
        let reactionsactive=[];
        let updateReactions=[];
        newReactions.map((item)=>{
            if(item.text===Reaction){
                updateReactions.push({"text":`${item.text}`,"active":"true"});
                reactionsactive.push({"text":`${item.text}`,"active":"true"})
            }
            else{
                updateReactions.push({"text":`${item.text}`,"active":"false"});
            }
        });
        newData[index][inde].reactions=updateReactions;
        newData[index][inde].reactionsactive=reactionsactive;
        this.setState({
            data:newData
        });
        console.log("data in like", data, newData[index][inde])
    }

    unlike(index,inde,Reaction){
        let {data}=this.state;
        let newData=data;
        let newReactions=[...newData[index][inde].reactions];
        let reactionsactive=[];
        let updateReactions=[];
        newReactions.map((item)=>{
            updateReactions.push({"text":`${item.text}`,"active":"false"});
        });
        newData[index][inde].reactions=updateReactions;
        newData[index][inde].reactionsactive=[        {"text":"thumbs-up","active":"false"}];
        this.setState({
            data:newData
        });
        console.log("data in like", data, newData[index][inde])
    }
    commnetinput(value){

        this.setState({comment:value})
    }
    comment(index,inde){
        if(this.state.comment!==""){
            let {data}=this.state;
            let newData=data;
            newData[index][inde].comments.push({
                comment:this.state.comment,
                color:"red"
            });
            this.setState({
                data:newData
            });
        }else {
            alert("please enter some comment");
        }
    }
    commentshow(index,inde,indexofcomment){

            let {data}=this.state;
            let newData=data;
            newData[index][inde].commentshow=!newData[index][inde].commentshow;
            this.setState({
                data:newData
            });
    }
    imageview(bool, index1, index2, index3){
        let {data}=this.state;
        let img=data[index1][index2].content[index3];
        console.log("more ont his",img)
        if(img.src!==""){

            // this.setState({imgsrc:img.src, modalviewimg:bool,imgviewsrc:"",
            //     displaytext:img.displaytext,
            //     displaytextcolor:img.displaytextcolor,displaytextsize:img.displaytextsize,displayfontfamily:img.displayfontfamily,
            //     displaytextAlign:img.displaytextAlign
            // })
        }
        else if(img.imagename!==""){

            // this.setState({imgviewsrc:img.imagename,modalviewimg:bool,imgsrc:"",
            //     displaytext:img.displaytext,
            //     displaytextcolor:img.displaytextcolor,displaytextsize:img.displaytextsize,displayfontfamily:img.displayfontfamily,
            //     displaytextAlign:img.displaytextAlign
            // })
        }

        this.props.previewdata(img);
        this.props.openpreview();
        console.log("more ont his",img, this.state.imgviewsrc, this.state.imgsrc)
    }
    savecolumntitle(){
        let {data,columnindextie,columntitle}=this.state;

        let newData=data;
        newData[columnindextie].map((item)=>{
            item.columntitle=columntitle;
        })

        this.setState({data:newData,modalcolumn:false, columntitle:""});
        // if(columntitle!==""){
        //
        //
        // }else{
        //     alert("Please Type  ColumnTitle ")
        // }

    }
    saveblocktitle(){

        let {data,blockindextie,blocktitle}=this.state;
        console.log("more ont his", blockindextie,blocktitle,data)
        let newData=data;
        newData[blockindextie.index][blockindextie.inde].blocktitle=blocktitle;
        this.setState({data:newData,modalIsOpen:false, blocktitle:""});
    }
    saveblocktitlefooter(){

        let {data,blockindextie,blocktitlefooter}=this.state;
        console.log("more ont his", blockindextie,blocktitlefooter,data)
        let newData=data;
        newData[blockindextie.index][blockindextie.inde].blocktitlefooter=blocktitlefooter;
        this.setState({data:newData,modalIsOpen:false, blocktitlefooter:""});
    }
    addpagetitle(){
        let {pagetitle}=this.state;
        this.setState({modalpagetitle:false});

    }

    saverows(){

        let {rowallfiles,rowallfilescolumns}=this.state;
        console.log( rowallfiles,rowallfiles.length);
        let data=data1.data;
        let newdatatoplit=[];
        let i=0;
        for( i=0;i<rowallfiles.length;i++){

            let simple={...data};
            let generatedcontent=[];
            for(let j =0;j<1;j++){
                let randomindex=Math.floor(Math.random() * 4)+1;
                let contant={...data.content[0]};
                simple.h=randomindex;
                simple.like=false;
                simple.blocktitle=rowallfiles[i].name;
                contant["h"]=randomindex;
                contant["backgroundcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;;
                console.log("finding type", rowallfiles[i])
                if(rowallfiles[i]["type"].includes("image")){

                    contant["src"]=URL.createObjectURL(rowallfiles[i]);
                    contant["type"]="image";
                }
                else if(rowallfiles[i]["type"].includes("video")){
                    contant["src"]=URL.createObjectURL(rowallfiles[i]);

                    contant["type"]="video";
                    contant["backgroundcolor"]=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                }
                else{
                    contant["text"]=rowallfiles[i].name;
                }
                generatedcontent.push(contant);
                randomindex=Math.floor(Math.random() * 4)+1
            }
            simple.content=[...generatedcontent]
            // simple["h"]=randomindex;
            // simple["imagename"]=imagename[randomindex];
            newdatatoplit.unshift(simple);
            // console.log("data ",i,randomindex)

        }
        let chunksize=Math.ceil(newdatatoplit.length/rowallfilescolumns);
        let generatesplit=this.split(newdatatoplit,chunksize);
        console.log("data generated", generatesplit,newdatatoplit, chunksize);
        this.setState({data:generatesplit,rowallfilesmodal:false,rowallfilescolumns:5});

    }
    // onEditorStateChange= (contentState) => {
    //     console.log("editor state, ", contentState)
    //     this.setState({
    //         contentState,
    //     });
    // };
    // function

    render() {
        let {data, dragcolumn,dragging, contentState,newcolummn,filecond,trashcolumn,columnmodalIsOpen,modalIsOpen,addblock,searchvalue,
            fontfamily,resize, rectangles,tooloption,addblocktitle,pagetextcolor,pagetextsize,pagefontfamily,pagetextAlign,
            addeachblocktitle,rowallfilesmodal,addeachblockfootertitle,
            addurls,addvideos,
        }=this.state;
        let {urlcomplete}=this.props;
        let datalength=data && data.length;
        return (
            <div className="container-fluid">

                {/*<div className="row">*/}
                {/*<div className="col-sm-7 mt-2 mb-2 d-flex justify-content-between">*/}

                {/*/!*<button className="btn btn-grey-light" onClick={()=> this.setState({dragcolumn:!dragcolumn})}>*!/*/}
                {/*/!*Add Column*!/*/}
                {/*/!*</button>*!/*/}

                {/*</div>*/}
                {/*</div>*/}
                <div className="row">
                    {

                        <div className="col-12 mb-1 mt-2 buttons-edit  d-flex align-items-center ">
                            <input type="text" placeholder="Search" className="  search"
                                   onChange={(e)=>this.setState({searchvalue:e.target.value})}
                            />
                            <button onClick={()=> this.search()} className="p-2 ml-2 btn btn-primary">Search</button>
                            <button onClick={()=> this.reset()} className="p-2 ml-2 btn btn-primary">Reset</button>
                            <button onClick={()=> this.setState({tooloption:!tooloption})} className=" cog p-2 ml-2 btn btn-primary"><i
                                className="fa fa-cog"
                            >

                            </i></button>
                            {tooloption===false &&
                            <p
                                style={{color:pagetextcolor,fontSize:`${pagetextsize}px`,display:"inline",
                                    fontFamily:pagefontfamily,padding:"10px",
                                    textAlign:pagetextAlign, marginBottom:"0px", width:"70%"}}
                                className="p_wrap"
                                dangerouslySetInnerHTML={{__html: this.state.pagetitle}}
                            />
                            }
                            {
                                tooloption===true &&
                                <div className="button-menu-i">
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({dragcolumn:!dragcolumn})}>
                                    {dragcolumn===false ? "Order columns": <i className="fa fa-check "></i>}
                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({trashcolumn:!trashcolumn,addblock:false,resize:false})}>

                                    {trashcolumn===false ? " Remove columns": <i className="fa fa-check "></i>}
                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.addcolumn("none")}>

                                    {columnmodalIsOpen===false ? " Add columns": <i className="fa fa-check "></i>}
                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({addblock:!addblock,trashcolumn:false,resize:false})}>

                                    {addblock===false ? " Add a block": <i className="fa fa-check "></i>}

                                </button>

                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.resize()}>

                                    {resize===false ? " Resize columns": <i className="fa fa-check "></i>}

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.addrectangle()}>

                                    Add a rectangle

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({addblocktitle:!addblocktitle,trashcolumn:false,resize:false})}>

                                    {addblocktitle===false ? " Add column title": <i className="fa fa-check "></i>}

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({modalpagetitle:!this.state.modalpagetitle,trashcolumn:false,resize:false})}>

                                    {this.state.modalpagetitle===false ? `${this.state.pagetitle==="" ? "Add":"Edit"} page title`: <i className="fa fa-check "></i>}

                                </button>

                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({addeachblocktitle:!addeachblocktitle,trashcolumn:false,resize:false})}>

                                    {addeachblocktitle===false ? " Add block title": <i className="fa fa-check "></i>}

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({addeachblockfootertitle:!addeachblockfootertitle,addeachblocktitle:false,trashcolumn:false,resize:false})}>

                                    {addeachblockfootertitle===false ? " Block footer text": <i className="fa fa-check "></i>}

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({rowallfilesmodal:true,trashcolumn:false,resize:false})}>

                                    {rowallfilesmodal===false ? " Upload mutiple files": <i className="fa fa-check "></i>}

                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({addurls:!addurls,
                                    filecond:"addurls" ,modalIsOpen:true,tooloption:false,
                                    trashcolumn:false,resize:false})}>
                                    Add URLs
                                </button>
                                <button className={`btn btn-grey-light ml-2`} onClick={()=> this.setState({
                                    modalIsOpen:true,
                                     filecond:"addvideos",addvideos:!addvideos,tooloption:false,
                                    trashcolumn:false,resize:false})}>

                                        Add Videos
                                </button>
                                </div>
                            }

                        </div>
                    }

                </div>

                <div className="row mt-2">
                    <div className="col-12">
                        {
                            rectangles.map((items, index)=>{
                                console.log("more on this",items)
                                return(
                                    <Rectanlgebox
                                        // handleDragStartblock={this.handleDragStartblock}
                                        // handleDragOverblock={this.handleDragOverblock}
                                        // handleDropblock={this.handleDropblock}
                                        index={index}
                                        // index2={inde}
                                        dragcolumn={dragcolumn}
                                        item={items}
                                        key={index}
                                        trashblock={()=>this.trashrectangle(index)}
                                        editblock={()=>      this.editrectangle( index, true)}
                                        cloneitem={()=>      this.clonerectangle(index)}
                                    />
                                )
                            })
                        }


                    </div>
                </div>
                <div className="row" style={{ justifyContent: datalength>=5 ?"space-evenly":"flex-start"}}>


                    {
                        data  &&  data.map((item,index)=>{
                            return(
                                <>

                                <Columns
                                    handleDragStartcolumn={this.handleDragStartcolumn}
                                    handleDragOvercolumn={this.handleDragOvercolumn}
                                    handleDropcolumn={this.handleDropcolumn}
                                    handleDropblock={this.handleDropblock}
                                    handleDragOverblock={this.handleDragOverblock}
                                    index={index}
                                    item={item}
                                    key={index}
                                    dragcolumn={dragcolumn}
                                    dragging={dragging}
                                    wdiv={data.length}
                                    resize={resize}
                                >
                                    {trashcolumn && <i className="fa fa-trash redtrash" onClick={()=> this.RemoveColumn(index)}></i>}
                                    {addblock && <i className="fa fa-plus" onClick={()=> this.addblock(index, "shift")}></i>}
                                    {addblocktitle && <i className="fa fa-plus" onClick={()=> this.editcolumntitle(index, "shift")}></i>}
                                    <div className="title d-flex justify-content-center align-items-center position-relative" style={{minHeight:"20px"}}>

                                        <p className="mb-0 text-bold"> {item&& item[item.length-1] && item[item.length-1].columntitle}</p>
                                        <i className="fa fa-edit  edititle"
                                           style={{
                                                right:"15px",
                                           }}
                                           onClick={()=>this.editcolumntitle(index)}/>
                                        <i className="fa fa-chevron-right  edititle"
                                           style={{
                                               display:"inline"
                                           }}
                                           onClick={()=> this.addcolumn(index)}/>
                                    </div>
                                    {item.map((ite,inde)=>{
                                        return(

                                            <>

                                            {
                                                 searchvalue ===""
                                                &&
                                                <>
                                                <div className="netweenblocks"><i className="fa fa-plus " onClick={()=> this.addblockbetween(index, inde)}></i></div>


                                                <div className="title d-flex justify-content-center align-items-center position-relative">

                                                    <p className="mb-0 text-bold"> {ite.blocktitle}</p>
                                                    <i className="fa fa-edit  edititle"
                                                       onClick={()=>this.editblocktitle(index,inde)}/>
                                                </div>
                                                {
                                                    addeachblocktitle && ite.blocktitle==="" &&
                                                    <i className="fa fa-plus  adblocktitleeach"
                                                       onClick={()=>this.editblocktitle(index,inde)}/>
                                                }

                                                <Carousel className={`h${ite.h}`} infiniteLoop useKeyboardArrows

                                                >
                                                    {
                                                        ite.content &&  ite.content.map((it,ind)=>{
                                                            return(
                                                                <>
                                                                <Boxes
                                                                    handleDragStartblock={this.handleDragStartblock}
                                                                    handleDragOverblock={this.handleDragOverblock}
                                                                    handleDropblock={this.handleDropblock}
                                                                    index1={index}
                                                                    index2={inde}
                                                                    dragcolumn={dragcolumn}
                                                                    item={it}
                                                                    key={ind}
                                                                    trashblock={()=>this.trashblock(index,inde,it, ind)}
                                                                    editblock={()=>      this.editblock(true, index,inde,ind)}
                                                                    imageview={()=>      this.imageview(true, index,inde,ind)}
                                                                    addblock={()=>      this.addblocknewitem(true, index,inde,ind)}
                                                                    cloneitem={()=>      this.cloneitem(index, inde,it)}
                                                                />
                                                                </>
                                                            )})}
                                                </Carousel>
                                                <div className="title d-flex justify-content-center align-items-center position-relative">

                                                    <p className="mb-0  w-100"
                                                       dangerouslySetInnerHTML={{__html: ite.blocktitlefooter}}
                                                    />
                                                    <i className="fa fa-edit  edititle"
                                                       onClick={()=>this.editblocktitlefooter(index,inde)}/>
                                                </div>
                                                {
                                                    addeachblockfootertitle && ite.blocktitlefooter==="" &&
                                                    <i className="fa fa-plus  adblocktitleeach"
                                                       onClick={()=>this.editblocktitlefooter(index,inde)}/>
                                                }
                                                <div className="reactions position-relative d-flex">


                                                  <div className="d-flex Reaction-box">
                                                      <div className="rection-selection">
                                                          {
                                                              ite.reactions.map((react)=>{
                                                                  return(
                                                                      <i className={`fa fa-${react.text}`}
                                                                         onClick={()=> this.like(index,inde, react.text)}
                                                                         style={{ color:react.active==="true"?"red":"darkgrey",
                                                                             cursor:"pointer"}}
                                                                      />

                                                                  )
                                                              })
                                                          }
                                                      </div>
                                                      {
                                                          ite.reactionsactive.map((activereact)=>{
                                                              return(
                                                                  <>

                                                                      <i className={`fa fa-${activereact.text} reactive-active`}
                                                                         onClick={()=> this.unlike(index,inde, activereact.text)}
                                                                         style={{color:activereact.active==="true"?"red":"darkgrey", cursor:"pointer",marginLeft:"10px"}}

                                                                      />

                                                                  </>
                                                              )
                                                          })
                                                      }
                                                  </div>

                                                    <i className="fa fa-comment"
                                                       style={{ color: ite.commentshow ===true    ? "red": "darkgrey", cursor:"pointer"}}
                                                        onClick={()=> this.commentshow(index,inde)}
                                                    />
                                                </div>
                                                { ite.commentshow ===true &&
                                                    <>
                                                    <div className="reactions d-flex flex-column">
                                                        {
                                                            ite.comments.map((come,indeofcommet)=>{
                                                                return(

                                                                    <div className="d-flex align-items-center">
                                                                        {
                                                                            come.comment !=="" &&
                                                                                <>
                                                                                <i className="fa fa-user"></i>
                                                                                <p className="d-flex mb-0 pl-2">{come.comment}</p>
                                                                                </>

                                                                        }

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="d-flex">
                                                        <input type="text" className="comment-input"
                                                               onChange={(e)=> this.commnetinput(e.target.value)}
                                                               onKeyPress={(e)=> e.which===13 ? this.comment(index,inde): console.log()}
                                                        />
                                                    </div></>
                                                }
                                                </>
                                            }
                                            {
                                                searchvalue !==""
                                                &&
                                                <>
                                                <Carousel className={`h${ite.h}`}
                                                          infiniteLoop useKeyboardArrows
                                                >
                                                    {
                                                        ite.content && ite.content.map((it,ind)=>{
                                                            return(
                                                                <Boxes
                                                                    handleDragStartblock={this.handleDragStartblock}
                                                                    handleDragOverblock={this.handleDragOverblock}
                                                                    handleDropblock={this.handleDropblock}
                                                                    index1={index}
                                                                    index2={inde}
                                                                    dragcolumn={dragcolumn}
                                                                    item={it}
                                                                    key={ind}
                                                                    trashblock={()=>this.trashblock(index,inde,ite,ind)}
                                                                    editblock={()=>      this.editblock(true, index,inde,ind)}
                                                                    imageview={()=>      this.imageview(true, index,inde,ind)}
                                                                    addblock={()=>      this.addblocknewitem(true, index,inde,ind)}
                                                                    cloneitem={()=>      this.cloneitem(index, inde,ite)}
                                                                    addblockbetween={()=>      this.addblockbetween(index, inde)}

                                                                />

                                                            )})}
                                                </Carousel>
                                                </>
                                            }</>
                                        )
                                    })
                                    }

                                    <div className="hoverblock"><i className="fa fa-plus bottomplus" onClick={()=> this.addblock(index,"push")}></i></div>

                                </Columns>
                                {
                                    resize &&
                                    <ColumnResizer className="columnResizer " minWidth={0}
                                                   style={{background:"grey"}}/>
                                }
                                </>
                            )
                        })
                    }


                </div>
                {/*add a block or edit*/}

                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={()=>this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"

                >
                    <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({modalIsOpen:false})}></i>


                   <div className="edit-block-css">
                     <div>
                         <input type="radio" name="inputchangeblock"
                                className="mt-2"
                                onClick={()=>this.setState({filecond:"text"})} value="text" checked={ filecond==="text"}/>
                      Text And File
                     </div>
                      <div><input type="radio" name="inputchangeblock"
                              className="mt-2"
                              onClick={()=>this.setState({filecond:"displaytext"})} value="displaytext" checked={ filecond==="displaytext"}/>
                      Display text
                      </div>
                       <div>
                           <input type="radio" name="inputchangeblock"
                                  className="mt-2"
                                  onClick={()=>this.setState({filecond:"blocktitle"})} value="blocktitle" checked={ filecond==="blocktitle"}/>
                      Block Title
                       </div>
                       <div>
                           <input type="radio" name="inputchangeblock"
                                  className="mt-2"
                                  onClick={()=>this.setState({filecond:"blocktitlefooter"})} value="blocktitlefooter" checked={ filecond==="blocktitlefooter"}/>
                      Footer Text
                       </div>
                       <div>
                           <input type="radio" name="inputchangeblock"
                                  className="mt-2"
                                  onClick={()=>this.setState({filecond:"youtube"})} value="youtube" checked={ filecond==="youtube"}/>
                      Youtube Link
                       </div>
                       <div>
                           <input type="radio" name="inputchangeblock"
                                  className="mt-2"
                                  onClick={()=>this.setState({filecond:"addurl" })} value="addurl" checked={ filecond==="addurl"}/>
                       Add URL
                       </div>
                       <div>
                           <input type="radio" name="inputchangeblock"
                                  className="mt-2"
                                  onClick={()=>this.setState({filecond:"addvideos"})} value="addvideos" checked={ filecond==="addvideos"}/>
                      Add videos
                       </div>
                       {/*<div>*/}
                           {/*<input type="radio" name="inputchangeblock"*/}
                                  {/*className="mt-2"*/}
                                  {/*onClick={()=>this.setState({filecond:"zip"})} value="zip" checked={ filecond==="zip"}/>*/}
                      {/*Add Zip*/}
                       {/*</div>*/}
                   </div>
                    {
                        filecond==="zip"&&
                            <><Zip/>

                            <button className="btn btn-primary  frozenor"
                        onClick={()=> this.saveurls()}
                        >Save</button></>
                    }
                    {                     filecond==="addurl"&&
                    <>
                    <Urlfeature/>
                    {
                        console.log("urlcomplete", urlcomplete)
                    }
                    {
                        urlcomplete && this.props.generatedcontent.length>0 && <button className="btn btn-primary  frozenor"
                                      onClick={()=> this.saveurls()}
                        >Save</button>
                    }

                    </>
                    }
                    {                     filecond==="addvideos"&&
                    <>






                        <input type="file" accept="video/*"
                               onChange={(e)=> this.setState({rowallfiles:e.target.files})}
                               multiple
                               className="mt-2"
                        />
                        <label > Number of blocks in a column:</label>
                        <input type="number"
                               value={this.state.rowallfilescolumns}
                               className="mt-2 mb-2" onChange={(e)=> this.setState({rowallfilescolumns:e.target.value})}
                               multiple />

                    <button className="btn btn-primary  frozenor"
                            onClick={()=> this.saverows()}
                    >Save</button>
                    </>
                    }
                    {                        filecond==="youtube"&&
                        <>
                        <label >Input Youtube link or embed code:</label>
                        <textarea
                        className="mb-2 mt-0 edittitleinput"
                        onChange={(e)=>this.setState({youtube:e.target.value})}

                        value={this.state.youtube}/>

                        <button className="btn btn-primary mt-3"
                        onClick={()=> this.saveyoutubelink()}
                        >Save</button>
                        </>

                    }{                        filecond==="blocktitle"&&
                        <>
                        <label >Edit Block Title:</label>
                        <input type="text"
                        className="mb-2 mt-0 edittitleinput"
                        onChange={(e)=>this.setState({blocktitle:e.target.value})}

                        value={this.state.blocktitle}/>

                        <button className="btn btn-primary mt-3"
                        onClick={()=> this.saveblocktitle()}
                        >Save</button>
                        </>

                    }
                    {                        filecond==="blocktitlefooter"&&
                        <>
                        <label >Edit footer text:</label>
                        <Editor
                            apiKey='6m2alhp3ke64qvfcgqjehqyqnhkclybrx87huoo4yclrhy8w'
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code',
                                    'insertdatetime media table paste wordcount',
                                    `emoticons`

                                ],
                                toolbar:
                                    `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | emoticons`
                            }}
                            initialValue={this.state.blocktitlefooter}
                            onChange={(e)=> this.setState({blocktitlefooter:e.target.getContent()})}
                        />
                        {/*<input type="text"*/}
                        {/*className="mb-2 mt-0 edittitleinput"*/}
                        {/*onChange={(e)=>this.setState({blocktitlefooter:e.target.value})}*/}
                        
                        {/*value={this.state.blocktitlefooter}/>*/}

                        <button className="btn btn-primary mt-3"
                        onClick={()=> this.saveblocktitlefooter()}
                        >Save</button>
                        </>

                    }
                    {
                        filecond==="text" || filecond==="file" ?
                        <>
                        <div className="d-flex flex-column">
                            <label className="mt-2 mb-0">Text:</label>
                            {/*<DefaultEditor value={this.state.text} onChange={(e)=> this.setState({text:e.target.value})}*/}

                                           {/*className="editor"*/}
                            {/*/>*/}
                            <Editor
                                apiKey='6m2alhp3ke64qvfcgqjehqyqnhkclybrx87huoo4yclrhy8w'
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount',
                                        `emoticons`

                                    ],
                                    toolbar:
                                        `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | emoticons`
                                }}
                                initialValue={this.state.text}
                                onChange={(e)=> this.setState({text:e.target.getContent()})}
                            />

                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex flex-column w-25">
                                    <label className="mb-0">Font color:</label>
                                    <input type="color" disabled={filecond==="file"}
                                           onChange={(e)=> this.setState({textcolor:e.target.value})}
                                           value={this.state.textcolor}
                                           defaultValue={this.state.textcolor}
                                    />
                                </div>
                                <div className="d-flex flex-column w-25" >
                                    <label className="mb-0">Background color:</label>
                                    <input type="color" disabled={filecond==="file"}
                                           onChange={(e)=> this.setState({color:e.target.value})}
                                           value={this.state.color}
                                           defaultValue={this.state.color}
                                    />
                                </div>
                                <div className="d-flex flex-column w-25">
                                    <label className="mb-0">Font size:</label>
                                    <input type="number" disabled={filecond==="file"}
                                           onChange={(e)=> this.setState({textsize:e.target.value})}
                                           value={this.state.textsize}
                                           style={{width:"98%"}}
                                    />
                                </div>
                                <div className="d-flex flex-column w-25">
                                    <label className="mb-0">Font type:</label>
                                    <select value={fontfamily} onChange={(e)=> this.setState({fontfamily:e.target.value})}>
                                        <option value="initial">initial</option>
                                        <option value="fantasy">fantasy</option>
                                        <option value="auto">auto</option>
                                        <option value="cursive">cursive</option>
                                        <option value="sans-serif">sans-serif</option>
                                        <option value="serif">serif</option>
                                        <option value="monospace">monospace</option>
                                        <option value="monospace">monospace</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">

                                {/*<div className="d-flex flex-column ">*/}
                                    {/*<label className="mb-0">Text Alignment:</label>*/}
                                    {/*<select value={this.state.textAlign} onChange={(e)=> this.setState({textAlign:e.target.value})}>*/}
                                        {/*<option value="flex-start">Left</option>*/}
                                        {/*<option value="center">center</option>*/}
                                        {/*<option value="flex-end">Right</option>*/}

                                    {/*</select>*/}
                                {/*</div>*/}

                            </div>

                            <label className="mb-0">Back ground Image:</label>
                            <input type="file" accept="image/*,video/*" onChange={(e)=>this.onSelectFileforblock(e)}
                                // value={this.state.bgsrc}
                                   disabled={filecond==="file"}
                            />
                            {
                                this.state.bgsrc !==""&&
                                <>
                                <label htmlFor="mb-0">Remove current background:</label>
                                <i className="fa fa-minus " onClick={()=> this.setState({bgsrc:""})}></i>   </>
                            }
                        </div>
                        <h4 className="text-center frozenor">- OR -</h4>
                        <div>
                            <input type="radio" name="inputchangeblock"
                                   className="mb-2 "
                                   onClick={()=>this.setState({filecond:"file"})} value="file" checked={ filecond==="file"}/> File Upload
                        </div>
                        <div>


                            <div>
                                <div  className="dragfileupload" style={{opacity:filecond==="file"? "1":"0.5" }}>
                                    {this.state.file && this.state.file.name   ? this.state.file.name:"Drag file or click to upload"}
                                </div>
                                <input type="file"
                                       onChange={(e)=>this.setState({file:e.target.files[0]})}
                                       className="fileinputdrag"
                                       disabled={filecond==="text"}
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label className="mb-0">Settle View of Image:</label>
                                <select value={this.state.objectfit}
                                        disabled={filecond==="text"}
                                        onChange={(e)=> this.setState({objectfit:e.target.value})}>
                                    <option value="cover">cover</option>
                                    <option value="contain">contain</option>
                                    <option value="fill">fill</option>
                                    <option value="initial">initial</option>
                                    <option value="inherit">inherit</option>
                                    <option value="revert">revert</option>
                                    <option value="scale-down">scale-down</option>
                                    <option value="unset">unset</option>
                                    <option value="none">none</option>
                                </select>
                            </div>

                        </div>
                        {
                            this.state.file!=="" && this.state.file["type"] && this.state.file["type"].includes("image") &&
                         <div className={`previewimageupload h${this.state.heightpreview}`}>
                             <img src={URL.createObjectURL(this.state.file)}
                             style={{objectFit:this.state.objectfit, borderRadius:"50px"}}

                             />
                         </div>
                        }
                        <button className="btn btn-primary  frozenor"

                                onClick={()=> this.submit()}
                        >Save</button>
                        </>:""
                    }
                    {
                        filecond==="displaytext" &&

                        <div className="d-flex flex-column">
                            <label className="mt-2 mb-0">Text:</label>
                            {/*<DefaultEditor value={this.state.displaytext} onChange={(e)=> this.setState({displaytext:e.target.value})}*/}

                                           {/*className="editor"*/}
                            {/*/>*/}
                            <Editor
                                apiKey='6m2alhp3ke64qvfcgqjehqyqnhkclybrx87huoo4yclrhy8w'
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount',
                                        `emoticons`

                                    ],
                                    toolbar:
                                        `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | emoticons`
                                }}
                                initialValue={this.state.displaytext}
                                onChange={(e)=> this.setState({displaytext:e.target.getContent()})}
                            />
                            {/*<textarea className="more-else"*/}
                            {/*onChange={(e)=> {*/}
                            {/*console.log("e", this.state.text)*/}
                            {/*this.setState({text:e.target.value})*/}
                            {/*}}*/}
                            {/*disabled={filecond==="file"} value={this.state.text}/>*/}

                            <div className="d-flex justify-content-evenly">
                                <div className="d-flex flex-column w-50">
                                    <label className="mb-0">Font color:</label>
                                    <input type="color"
                                           onChange={(e)=> this.setState({displaytextcolor:e.target.value})}
                                           value={this.state.displaytextcolor}
                                           defaultValue={this.state.displaytextcolor}
                                    />
                                </div>
                                <div className="d-flex flex-column w-50" >
                                    <label className="mb-0">Background color:</label>
                                    <input type="color"
                                           onChange={(e)=> this.setState({displaybackgroundcolor:e.target.value})}
                                           value={this.state.displaybackgroundcolor}
                                           defaultValue={this.state.displaybackgroundcolor}
                                    />
                                </div>
                            </div>
                           <div className="d-flex justify-content-between">
                               <div className="d-flex flex-column">
                                   <label className="mb-0">Font size:</label>
                                   <input type="number"
                                          onChange={(e)=> this.setState({displaytextsize:e.target.value})}
                                          value={this.state.displaytextsize}
                                   />
                               </div>
                               <div className="d-flex flex-column">
                                   <label className="mb-0">Font type:</label>
                                   <select value={this.state.displayfontfamily}
                                           onChange={(e)=> this.setState({displayfontfamily:e.target.value})}>
                                       <option value="initial">initial</option>
                                       <option value="fantasy">fantasy</option>
                                       <option value="auto">auto</option>
                                       <option value="cursive">cursive</option>
                                       <option value="sans-serif">sans-serif</option>
                                       <option value="serif">serif</option>
                                       <option value="monospace">monospace</option>
                                       <option value="monospace">monospace</option>
                                   </select>
                               </div>
                               {/*<div className="d-flex flex-column">*/}
                                   {/*<label className="mb-0">Text Alignment:</label>*/}
                                   {/*<select value={this.state.displaytextAlign}*/}
                                           {/*onChange={(e)=> this.setState({displaytextAlign:e.target.value})}>*/}
                                       {/*<option value="flex-start">Left</option>*/}
                                       {/*<option value="center">center</option>*/}
                                       {/*<option value="flex-end">Right</option>*/}

                                   {/*</select>*/}
                               {/*</div>*/}
                           </div>


                            <button className="btn btn-primary  frozenor mt-2"

                                    onClick={()=> this.submitlargetext()}
                            >Save</button>
                        </div>


                    }
                </Modal>

                {/*add a block or edit*/}
                {/*add a block or edit*/}

                <Modal
                    isOpen={this.state.modalIsOpencol}
                    // onAfterOpen={afterOpenModal}

                    style={customStyles}
                    contentLabel="Example Modal"

                >
                    <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({modalIsOpencol:false})}></i>


                    <input type="radio" name="inputchangeblock"
                           className="mt-2"
                           onClick={()=>this.setState({filecond:"text"})} value="text" checked={ filecond==="text"}/>
                    <div className="d-flex flex-column">
                        <label className="mt-2 mb-0">Text:</label>
                        {/*<DefaultEditor value={this.state.text} onChange={(e)=> this.setState({text:e.target.value})}*/}

                                       {/*className="editor"*/}
                        {/*/>*/}
                        <Editor
                            apiKey='6m2alhp3ke64qvfcgqjehqyqnhkclybrx87huoo4yclrhy8w'
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code',
                                    'insertdatetime media table paste wordcount',
                                    `emoticons`

                                ],
                                toolbar:
                                    `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | emoticons`
                            }}
                            initialValue={this.state.text}
                            onChange={(e)=> this.setState({text:e.target.getContent()})}
                        />
                        {/*<textarea className="more-else"*/}
                        {/*onChange={(e)=> {*/}
                        {/*console.log("e", this.state.text)*/}
                        {/*this.setState({text:e.target.value})*/}
                        {/*}}*/}
                        {/*disabled={filecond==="file"} value={this.state.text}/>*/}

                        <div className="d-flex justify-content-evenly">
                            <div className="d-flex flex-column w-50">
                                <label className="mb-0">Font color:</label>
                                <input type="color" disabled={filecond==="file"}
                                       onChange={(e)=> this.setState({textcolor:e.target.value})}
                                       value={this.state.textcolor}
                                       defaultValue={this.state.textcolor}
                                />
                            </div>
                            <div className="d-flex flex-column w-50" >
                                <label className="mb-0">Background color:</label>
                                <input type="color" disabled={filecond==="file"}
                                       onChange={(e)=> this.setState({color:e.target.value})}
                                       value={this.state.color}
                                       defaultValue={this.state.color}
                                />
                            </div>
                        </div>
                        <label className="mb-0">Font size:</label>
                        <input type="number" disabled={filecond==="file"}
                               onChange={(e)=> this.setState({textsize:e.target.value})}
                               value={this.state.textsize}
                        /><label className="mb-0">Font type:</label>
                        <select value={fontfamily} onChange={(e)=> this.setState({fontfamily:e.target.value})}>
                            <option value="initial">initial</option>
                            <option value="fantasy">fantasy</option>
                            <option value="auto">auto</option>
                            <option value="cursive">cursive</option>
                            <option value="sans-serif">sans-serif</option>
                            <option value="serif">serif</option>
                            <option value="monospace">monospace</option>
                            <option value="monospace">monospace</option>
                        </select>
                        <label className="mb-0">Text Alignment:</label>
                        <select value={this.state.textAlign} onChange={(e)=> this.setState({textAlign:e.target.value})}>
                            <option value="flex-start">Left</option>
                            <option value="center">center</option>
                            <option value="flex-end">Right</option>

                        </select>
                        <label className="mb-0">Back ground Image:</label>
                        <input type="file" accept="image/*" onChange={(e)=>this.onSelectFileforblock(e)}
                            // value={this.state.bgsrc}
                               disabled={filecond==="file"}
                        />
                        {
                            this.state.bgsrc !==""&&
                            <>
                            <label htmlFor="mb-0">Remove current background:</label>
                            <i className="fa fa-minus " onClick={()=> this.setState({bgsrc:""})}></i>   </>
                        }
                    </div>
                    <h4 className="text-center frozenor">- OR -</h4>
                    <input type="radio" name="inputchangeblock"
                           className="mb-2 "
                           onClick={()=>this.setState({filecond:"file"})} value="file" checked={ filecond==="file"}/>
                    <div>
                        <input type="file" accept="image/*" onChange={(e)=>this.onSelectFile(e)}

                               disabled={filecond==="text"}
                        />
                    </div>

                    <button className="btn btn-primary  frozenor"

                            onClick={()=> this.submitrectangle()}
                    >Save</button>
                </Modal>

                {/*add a block or edit*/}
                {/*// add a coliumn*/}
                <Modal
                    isOpen={this.state.modalcolumn}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({modalcolumn:false})}></i>
                    <label >Edit Title:</label>
                    <input type="text"
                           className="mb-2 edittitleinput"
                           onChange={(e)=>this.setState({columntitle:e.target.value})}

                           value={this.state.columntitle}/>

                    <button className="btn btn-primary mt-3"
                            onClick={()=> this.savecolumntitle()}
                    >Save</button>

                </Modal>
                {/*<Modal*/}
                    {/*isOpen={this.state.modalbloctitle}*/}
                    {/*// onAfterOpen={afterOpenModal}*/}
                    {/*// onRequestClose={this.closeModal}*/}
                    {/*style={customStyles}*/}
                    {/*contentLabel="Example Modal"*/}
                {/*>*/}
                    {/*<i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({modalbloctitle:false})}></i>*/}
                  {/**/}
                {/*</Modal>*/}
                {/*add a column*/}
                {/*add a pageitle*/}
                <Modal
                    isOpen={this.state.modalpagetitle}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({modalpagetitle:false})}></i>
                    <label >Add page title:</label>
                    {/*<DefaultEditor value={this.state.pagetitle} onChange={(e)=> this.setState({pagetitle:e.target.value})}/>*/}

                    <Editor
                        apiKey='6m2alhp3ke64qvfcgqjehqyqnhkclybrx87huoo4yclrhy8w'
                        init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image',
                                'charmap print preview anchor help',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste wordcount',
                                `emoticons`

                            ],
                            toolbar:
                                `undo redo | formatselect | bold italic | \
                                        alignleft aligncenter alignright | \
                                        bullist numlist outdent indent | emoticons`
                        }}
                        initialValue={this.state.pagetitle}
                        onChange={(e)=> this.setState({pagetitle:e.target.getContent()})}
                    />
                    <label className="mb-0">Font size:</label>
                    <input type="number"
                           onChange={(e)=> this.setState({pagetextsize:e.target.value})}
                           value={this.state.pagetextsize}
                    />
                    <label className="mb-0">Font color:</label>
                    <input type="color"
                           onChange={(e)=> this.setState({pagetextcolor:e.target.value})}
                           value={this.state.pagetextcolor}
                           defaultValue={this.state.pagetextcolor}
                    />
                    <label className="mb-0">Font type:</label>
                    <select value={this.state.pagefontfamily} onChange={(e)=> this.setState({pagefontfamily:e.target.value})}>
                        <option value="initial">initial</option>
                        <option value="fantasy">fantasy</option>
                        <option value="auto">auto</option>
                        <option value="cursive">cursive</option>
                        <option value="sans-serif">sans-serif</option>
                        <option value="serif">serif</option>
                        <option value="monospace">monospace</option>
                        <option value="monospace">monospace</option>
                    </select>
                    <label className="mb-0">Text Alignment:</label>
                    <select value={this.state.pagetextAlign} onChange={(e)=> this.setState({pagetextAlign:e.target.value})}>
                        <option value="left">Left</option>
                        <option value="center">center</option>
                        <option value="right">Right</option>

                    </select>
                    <button className="btn btn-primary mt-3"
                            onClick={()=> this.addpagetitle()}
                    >Save</button>

                </Modal>
                {/*add a pageitle*/}

                {/*model for making multiple file*/}
                <Modal
                    isOpen={this.state.rowallfilesmodal}
                    // onAfterOpen={afterOpenModal}
                    //  onRequestClose={()=> this.setState({modalviewimg:false})}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.setState({rowallfilesmodal:false})}></i>
                    <input type="file" className="mt-2 mb-2" onChange={(e)=> this.setState({rowallfiles:e.target.files})}
                           multiple />
                    <label > Number of blocks in a column:</label>
                    <input type="number"
                           value={this.state.rowallfilescolumns}
                           className="mt-2 mb-2" onChange={(e)=> this.setState({rowallfilescolumns:e.target.value})}
                           multiple />
                    <button className="btn btn-primary" onClick={()=> this.saverows()}> Save</button>
                </Modal>
                {/*model for making multiple file*/}

                {/*view image in large*/}
                <Preview/>

                {/*view image in large*/}

            </div>



        )}
}

const mapStateToProps = ({url, zip}) => {
    return {

        urlcomplete:url.urlcomplete,
        generatedcontent:url.generatedcontent,
        zip:zip.files
    };
};

export default connect(
    mapStateToProps,
    {previewdata,openpreview,previewdataactioncheck,urlcomplete}
)(App);

