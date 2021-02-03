import React,{Component} from 'react';


class columns extends Component{

    render(){
        let {index1,index2, item,dragcolumn}=this.props;
        return(
            <>


            {
                dragcolumn===false ?
                    <div key={index2}
                         draggable="true"
                         onDragStart={this.props.handleDragStartblock(index1,index2,item.arr)}
                         onDragOver={this.props.handleDragOverblock(index1,index2,item.arr)}
                         onDrop={ this.props.handleDropblock(index1,index2,"box")}
                         className={`resize  align-item-center`}
                         style={{backgroundColor:   item.type==="video" ? "grey":item.backgroundcolor,
                             justifyContent:item.src==="" && item.text==="" && item.imagename==="" ? `center`:``,
                         alignItems:(item.src==="" && item.text==="" && item.imagename==="" ) ||
                         item.type==="audio" ? `center`:`flex-start`,
                             backgroundImage:"url(" + item.bgsrc + ")",
                             backgroundSize: "100% 100%",
                             backgroundRepeat: "no-repeat",
                             // height:"inherit"
                         }}
                    >
                        <i className="fa fa-trash trash-block-e"
                           onClick={()=>this.props.trashblock(index1,index2,item)}/>
                        <i className="fa fa-edit edit-block-e"
                           onClick={()=>this.props.editblock(item)}/>
                        <i className="fa fa-clone edit-block-clone"
                           onClick={()=>this.props.cloneitem(index1,index2,item)}/>
                        <i className="fa fa-plus edit-block-plus"
                           onClick={()=>this.props.addblock()}/>
                        {
                            item.type==="youtube" &&
                            <i className="fa fa-arrows-alt edit-arrow-alt"

                               draggable="true"
                               onDragStart={this.props.handleDragStartblock(index1,index2,item.arr)}
                               onDragOver={this.props.handleDragOverblock(index1,index2,item.arr)}
                               onDrop={ this.props.handleDropblock(index1,index2,"box")}
                               onClick={()=>this.props.addblock()}/>
                        }

                            <i className="fa fa-eye edit-block-view"
                               onClick={()=>this.props.imageview(true,index1,index2,3)}/>


                        {
                            item.type==="text" &&
                            <p style={{color:item.textcolor,fontSize:`${item.textsize}px`,
                                backgroundColor:   item.type==="video" ? "grey":item.backgroundcolor,
                                fontFamily:item.fontfamily,padding:"10px"}} className="p_wrap"
                               dangerouslySetInnerHTML={{__html: item.text}}
                            />
                        }

                        {
                            item.type!=="image" &&
                            item.type!=="video" &&
                            item.type!=="audio" &&
                            item.type!=="youtube" &&
                            item.type!=="pdf" &&
                            item.type!=="href" &&
                            <a href={item.src}><p>{item.filename}</p></a>
                        }
                        {
                            item.type==="href" &&
                            <a href={item.text} className="more" target="_blank"
                            ><p className="wordbreak">{item.text}</p></a>
                        }
                        {
                            item.type==="websiteimages" &&

                            <img src={`data:image/png;base64, ${item.src}`} alt=""
                                 onClick={()=>this.props.imageview(true,index1,index2,3)}
                                 style={{objectFit:item.objectFit}}
                            />
                        }
                        {
                            item.type==="image" &&
                            <img src={item.src} alt=""
                                 style={{objectFit:item.objectFit}}
                            />
                        }
                        {
                            item.type==="pdf" &&
                            <iframe style={{width:"100%",height:"100%",minHeight:"100%",minWidth:"100%",
                                maxHeight:"100%", maxWidth:"100%"
                            }}
                                    src={item.src}>
                            </iframe>
                        }
                        {
                            item.type==="video" &&
                            <video width="100%" height="100%" controls>
                                <source src={item.src} type="video/mp4"/>
                            </video>
                        }
                        {
                            item.type==="audio" &&
                            <audio controls controlslist="nodownload" style={{height:"100%"}}
                                   className="audiofilecss"
                            >
                                <source src={item.src} type="audio/ogg" />
                                Your browser does not support the audio tag.
                            </audio>
                        }
                        {
                            item.type==="youtube" &&
                            <>
                            {
                                item.src.includes("iframe")
                                    ? <div   dangerouslySetInnerHTML={{__html: item.src}}
                                             style={{width:"100%",height:"100%" }}
                                />:
                                    <iframe style={{width:"100%",height:"100%" }}
                                            src={item.src}>
                                    </iframe>
                            }
                            </>

                        }

                        {
                            item.type==="addblock"  && <i className="fa fa-plus"
                                                       onClick={()=>this.props.editblock(item)}
                            ></i>

                        }
                        {/*{*/}
                        {/*item.src!=="" ?*/}
                        {/*<img src={require(`${item.src}`)} alt=""/>:*/}

                        {/*}*/}
                    </div>
                    :
                    <div key={index2}

                         className={`resize  align-item-center`}

                         style={{backgroundColor:   item.type==="video" ? "grey":item.backgroundcolor,
                             justifyContent:item.src==="" && item.text==="" && item.imagename==="" ? "flex-start":"flex-start",
                             alignItems:item.src==="" && item.text==="" && item.imagename==="" ? "flex-start":"flex-start",
                             // height:"inherit"
                         }}
                    >



                        {/*<i className="fa fa-edit edit-block-e"*/}
                        {/*onClick={()=>this.props.editblock(item)}/>*/}

                        {
                            item.text!=="" ?
                                <p style={{color:item.textcolor,fontSize:`${item.textsize}px`,
                                    fontFamily:item.fontfamily,padding:"10px"}} className="p_wrap"
                                   dangerouslySetInnerHTML={{__html: item.text}}
                                />:
                                <>
                                {
                                    item.src!=="" ?
                                        <>
                                        {
                                            item.type!=="image" &&
                                            item.type!=="video" &&
                                            item.type!=="audio" &&
                                            item.type!=="youtube" &&
                                            item.type!=="websiteimages" &&
                                                <p
                                                    onClick={()=>this.props.imageview(true,index1,index2,3)}
                                                >{item.filename}</p>
                                        }

                                        {
                                            item.type==="image" &&
                                            <img src={item.src} alt=""
                                                 onClick={()=>this.props.imageview(true,index1,index2,3)}
                                                 style={{objectFit:item.objectFit}}
                                            />
                                        }
                                        {
                                            item.type==="websiteimages" &&

                                            <img src={`data:image/png;base64, ${item.src}`} alt=""
                                                 onClick={()=>this.props.imageview(true,index1,index2,3)}
                                                 style={{objectFit:item.objectFit}}
                                            />
                                        }
                                        {
                                            item.type==="video" &&
                                            <video  controls>
                                                <source src={item.src} type="video/mp4"/>
                                            </video>
                                        }
                                        {
                                            item.type==="audio" &&
                                            <audio controls controlslist="nodownload" style={{height:"100%"}} >
                                                <source src={item.src} type="audio/ogg" />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        }
                                        {
                                            item.type==="youtube" &&
                                            <>
                                            {
                                                item.src.includes("iframe")
                                                ? <div   dangerouslySetInnerHTML={{__html: item.src}}
                                                          style={{width:"100%",height:"100%" }}
                                                />:
                                                <iframe style={{width:"100%",height:"100%" }}
                                                src={item.src}>
                                                </iframe>
                                            }
                                            </>

                                        }

                                        </>:
                                        <>
                                        {
                                            item.imagename!=="" &&
                                            <>
                                            <img src={require(`../../Assets/${item.imagename}`)} alt=""
                                                 onClick={()=>this.props.imageview(true,index1,index2,3)}
                                                 style={{objectFit:item.objectFit}}
                                            />
                                            </>

                                        }
                                        </>
                                }
                                </>
                        }
                        {/*<img src={require(`../../Assets/${item.imagename}`)} alt=""/>*/}
                        {
                            item.src==="" && item.text==="" && item.imagename===""  &&
                            <i className="fa fa-plus"
                               onClick={()=>this.props.editblock(item)}
                            ></i>

                        }
                        {/*{*/}
                        {/*item.src!=="" ?*/}
                        {/*<img src={require(`${item.src}`)} alt=""/>:*/}

                        {/*}*/}
                    </div>
            }


            </>

        )
    }

}

export default columns;