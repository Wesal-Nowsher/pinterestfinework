import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
import {customstyles} from '../../customstyle';
import FilePreview from 'react-preview-file';
import {urlcomplete,generatedcontent} from './action'
const customStyles=customstyles;

class urlfeature extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            image: '',
            images:[],
            error: '',
            isLoading: false,
            urltype:"",
            content:{
                imagename:"",
                src:"",
                displaytext:"",
                displayfontfamily:"",
                displaytextsize:"24",
                displaybackgroundcolor:"",
                displaytextcolor:"",
                displaytextAlign:"left",
                bgsrc:"",
                text:"",
                type:"",
                fontfamily:"",
                textsize:"24",
                backgroundcolor:"",
                textcolor:"",
                textAlign:"flex-start"
            },
            generatedcontent:[]
        };


        this.websitescreenshot = this.websitescreenshot.bind(this);
        this.getimages = this.getimages.bind(this);
        this.websitelogo  =this.websitelogo.bind(this);
        this.savetext  =this.savetext.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({url: event.target.value});
    }
    getimages(event) {
        event.preventDefault();
        this.setState({  generatedcontent:[]})

        if (this.state.url === '') {
            this.setState({
                error: 'Website URL is required.'
            });

            return;
        }

        let data = {
            url: this.state.url
        };

        this.setState({
            isLoading: true,
            images: [],
            image:"",
            error: ''
        });

        fetch('http://localhost:5000/api/website/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.images) {
                    this.setState({
                        images: data.images,
                        image:"",
                        isLoading: false
                    });
                }
                if (data.error) {
                    this.setState({
                        error: data.error,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.msg,
                    isLoading: false
                });
            });
    }
    websitescreenshot(event) {
        event.preventDefault();
        this.setState({  generatedcontent:[]})

        if (this.state.url === '') {
            this.setState({
                error: 'Website URL is required.'
            });

            return;
        }

        let data = {
            url: this.state.url
        };

        this.setState({
            isLoading: true,
            image: '',
            images:[],
            error: ''
        });

        fetch('http://localhost:5000/api/website/screenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.image) {
                    this.setState({
                        image: `data:image/png;base64, ${data.image}`,
                        images:[],
                        isLoading: false
                    });
                }
                if (data.error) {
                    this.setState({
                        error: data.error,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.msg,
                    isLoading: false
                });
            });
    }
    websitelogo(event,) {
        event.preventDefault();
        this.setState({  generatedcontent:[]})

        if (this.state.url === '') {
            this.setState({
                error: 'Website URL is required.'
            });

            return;
        }

        let data = {
            url: this.state.url
        };

        this.setState({
            isLoading: true,
            image: '',
            images:[],
            error: ''
        });

        fetch(`http://localhost:5000/api/website/logo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.logo) {
                    this.setState({
                        image: `data:image/png;base64, ${data.logo}`,
                        images:[],
                        isLoading: false
                    });
                }
                if (data.error) {
                    this.setState({
                        error: data.error,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.msg,
                    isLoading: false
                });
            });
    }
    savetext(){
        if (this.state.url === '') {
            this.setState({
                error: 'Website URL is required.'
            });

            return;
        }
        let {content,generatedcontent,images}=this.state;
        let contant={...content}
        let generatedcontant=[];
        contant.type="href";
        contant.text=this.state.url;
        contant.backgroundcolor=  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;;
        contant.textcolor=  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;;
        generatedcontant.push(contant);
        this.props.urlcomplete(true);
        this.props.generatedcontent(generatedcontant)
    }
    handleCheckboxChange(e,index, imgor) {
        console.log("e.target", e.target.checked)
        let {content,generatedcontent,images}=this.state;
        let contant={...content}
        let generatedcontant=[...generatedcontent];
        if(imgor==="images"){
           if(e.target.checked===true){
               let pushot=true;
               generatedcontant.map((contents)=>{
                   if( contents.src===images[index]){
                       pushot=false;
                   }
               });
               if (pushot){
                   contant.type="websiteimages";
                   contant.src=images[index];
                   generatedcontant.push(contant);
               }

               this.setState({generatedcontent:generatedcontant})
           }
           else if(e.target.checked===false){
               let gnewcontent=[]
               generatedcontant.map((contents)=>{
                   if( contents.src!==images[index]){
                       gnewcontent.push(contents)
                   }
               })
               generatedcontant= gnewcontent;
               this.setState({generatedcontent:generatedcontant})
           }
        }
        else if(imgor==="img"){
            if(e.target.checked===true){
                contant.src=this.state.image;
                contant.type="image";
                generatedcontant=[contant];
                this.setState({generatedcontent:generatedcontant});
            }
            if(e.target.checked===false){
                generatedcontant=[];
                this.setState({generatedcontent:[]});
            }
        }
        if( generatedcontant.length>0) {
            this.props.urlcomplete(true);
            this.props.generatedcontent(generatedcontant)
        }
        else if(generatedcontant.length<1){
            console.log("more on this,", generatedcontant)
            this.props.urlcomplete(false);
            this.props.generatedcontent([]);
        }
    }
    render() {
        let {data,previewopen}= this.props;
        let {urltype,generatedcontent}= this.state;
        console.log("preview is r3ender",data,previewopen, generatedcontent)
        let imagesHtml = '';
        let errorHtml = '';

        if (this.state.image !== '') {
            imagesHtml = (
                <div className="row mt-1">
                    <div className="col-12 d-flex flex-column">
                        <img src={this.state.image} className="img-fluid img" alt=""/>
                        <input type="checkbox" className="mt-1" onChange={(e)=>this.handleCheckboxChange(e,1, "img")} />
                    </div>
                </div>
            );
        }
        if (this.state.images.length > 0) {
            let images = this.state.images.map((image, index) => {
              if(index <30){
                  return (
                      <div key={index} className="col-2 mb-2 images d-flex flex-column">
                          <img src={`data:image/png;base64, ${image}`}
                               style={{height:"50px"}}

                               className="img-fluid" alt=""/>
                          <input type="checkbox" className="mt-1" onChange={(e)=>this.handleCheckboxChange(e,index,"images")} />
                      </div>
                  );
              }
            });

            imagesHtml = (
                <div className="row mt-1">
                    {images}
                </div>
            );
        }

        if (this.state.error !== '') {
            errorHtml = (
                <div className="row mt-1">
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    </div>
                </div>
            );
        }

        return (


        <div>
                <div className="form-group mt-1">
                    <input type="text" value={this.state.url} onChange={this.handleChange}
                           className="form-control mt-1" id="url" placeholder="Enter URL"  />
                    <div className="d-flex  align-items-center mt-1">
                        <input type="radio" name="inputurltype"

                               onClick={()=>this.setState({urltype:"images" })} value="images" checked={ urltype==="images"}/>
                        &nbsp;Get Images&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="inputurltype"

                               onClick={()=>this.setState({urltype:"logo" })} value="logo" checked={ urltype==="logo"}/>
                        &nbsp;Get website logo&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="inputurltype"

                               onClick={()=>this.setState({urltype:"screenshot" })} value="screenshot" checked={ urltype==="screenshot"}/>
                        &nbsp;Get website screenshot&nbsp;
                        <input type="radio" name="inputurltype"
                               onClick={()=> this.setState({urltype:"text" })}  value="text" checked={ urltype==="text"}/>
                        &nbsp;Store as Text&nbsp;
                    </div>
                    <div className="d-flex mt-1">
                        {
                            urltype==="logo" && this.state.isLoading===false &&
                            <button className="btn btn-primary"
                                    onClick={this.websitelogo}
                            >
                                Submit
                            </button>
                        }
                        {
                            urltype==="screenshot" && this.state.isLoading===false &&
                            <button className="btn btn-primary"
                                    onClick={this.websitescreenshot}
                            >
                                Submit
                            </button>
                        }
                        {
                            urltype==="images" && this.state.isLoading===false &&
                            <button className="btn btn-primary"
                                    onClick={this.getimages}
                            >
                                Submit
                            </button>
                        }
                        {
                            urltype==="text" && this.state.isLoading===false &&
                            <button className="btn btn-primary"
                                    onClick={this.savetext}
                            >
                                Submit
                            </button>
                        }
                        {this.state.isLoading ? <img src={require("../../Assets/loader.gif")}

                                                     style={{height:"400px"}}
                                                                                     alt=""/> : ''}



                    </div>
                    {errorHtml}

                    {imagesHtml}
                </div>
            </div>

        )
    }
}

const mapStateToProps = ({preview}) => {
    return {
        previewopen:preview.previewopen,
        data:preview.data
    };
};

export default connect(
    mapStateToProps,
    {urlcomplete,generatedcontent}
)(urlfeature);


