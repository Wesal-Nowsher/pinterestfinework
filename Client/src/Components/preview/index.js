import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
import {customstyles} from '../../customstyle';
import {openpreview} from './action'
import FilePreview from 'react-preview-file';

const customStyles=customstyles;

class preview extends Component {


    render() {
        let {data,previewopen}= this.props;
        console.log("preview is r3ender",data,previewopen)
        return (

                <Modal
                    isOpen={previewopen}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                  <div   style={{backgroundColor:   data.type==="video" ? "grey":data.backgroundcolor,
                      justifyContent:data.src==="" && data.text==="" && data.imagename==="" ? "flex-start":"flex-start",
                      alignItems:data.src==="" && data.text==="" && data.imagename==="" ? "flex-start":"flex-start",
                      minHeight:"250px",
                      maxHeight:"600px",
                      minWidth:"250px",
                      maxWidth:"800px",
                      marginTop:"30px"
                  }}>
                      <i className="fa fa-close d-flex justify-content-start special-color-effect" onClick={()=> this.props.openpreview()}></i>


                      {
                          data.type==="text" &&
                              <p style={{color:data.textcolor,fontSize:`${data.textsize}px`,
                                  backgroundColor:   data.type==="video" ? "grey":data.backgroundcolor,
                                  fontFamily:data.fontfamily,padding:"10px"}} className="p_wrap"
                                 dangerouslySetInnerHTML={{__html: data.text}}
                              />
                      }

                      {
                          data.type!=="image" &&
                          data.type!=="video" &&
                          data.type!=="audio" &&
                          data.type!=="youtube" &&
                          data.type!=="pdf" &&
                          data.type!=="href" &&
                          <a href={data.src}><p>{data.filename}</p></a>
                      }
                      {
                          data.type==="href" &&
                          <a href={data.text} target="_blank"><p>{data.text}</p></a>
                      }
                      {
                          data.type==="websiteimages" &&

                          <img src={`data:image/png;base64, ${data.src}`} alt=""

                          />
                      }
                      {
                          data.type==="image" &&
                          <img src={data.src} alt=""

                          />
                      }
                      {
                          data.type==="pdf" &&
                          <iframe style={{width:"100%",height:"100%" }}
                                  src={data.src}>
                          </iframe>
                      }
                      {
                          data.type==="video" &&
                          <video width="100%" height="100%" controls>
                              <source src={data.src} type="video/mp4"/>
                          </video>
                      }
                      {
                          data.type==="audio" &&
                          <audio controls controlslist="nodownload" style={{height:"100%"}}
                                 className="audiofilecss"
                          >
                              <source src={data.src} type="audio/ogg" />
                              Your browser does not support the audio tag.
                          </audio>
                      }
                      {
                          data.type==="youtube" &&
                          <>
                          {
                              data.src.includes("iframe")
                                  ? <div   dangerouslySetInnerHTML={{__html: data.src}}
                                           style={{width:"100%",height:"100%" }}
                              />:
                                  <iframe style={{width:"100%",height:"100%" }}
                                          src={data.src}>
                                  </iframe>
                          }
                          </>

                      }



                      {
                          data.displaytext!=="" &&
                          <p
                              style={{color:data.displaytextcolor,fontSize:`${data.displaytextsize}px`,display:"inline",
                                  fontFamily:data.displayfontfamily,padding:"10px",
                                  textAlign:data.displaytextAlign, marginBottom:"0px",
                                  backgroundColor:data.displaybackgroundcolor}}
                              className="p_wrap"
                              dangerouslySetInnerHTML={{__html: data.displaytext}}
                          />
                      }
                  </div>


                </Modal>

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
    {openpreview}
)(preview);


