import React,{Component} from 'react';


class rectanlgebox extends Component{

    render(){
        let {index, item,dragcolumn}=this.props;
        return(
            <>
            <div key={index}

                 // draggable="true"
                 // onDragStart={this.props.handleDragStartblock(index1,index2,item.arr)}
                 // onDragOver={this.props.handleDragOverblock(index1,index2,item.arr)}
                 // onDrop={ this.props.handleDropblock(index1,index2,"box")}
                 className={`rectresize h${item.h ? item.h:1} align-item-center`}
                 style={{backgroundColor:item.backgroundcolor,
                     justifyContent:item.src==="" && item.text==="" && item.imagename==="" ? `center`:`${item.textAlign}`,
                     alignItems:item.src==="" && item.text==="" && item.imagename==="" ? `center`:`flex-start`,
                     backgroundImage:"url(" + item.bgsrc + ")",
                     backgroundSize: "100% 100%",
                     backgroundRepeat: "no-repeat"
                 }}
            >
                <i className="fa fa-trash trash-block-e"
                   onClick={()=>this.props.trashblock(index,item)}/>
                <i className="fa fa-edit edit-block-e"
                   onClick={()=>this.props.editblock(item)}/>
                <i className="fa fa-clone edit-block-clone"
                   onClick={()=>this.props.cloneitem(index,item)}/>
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
                                <img src={item.src} alt=""/>:
                                <>
                                {
                                    item.imagename!=="" &&
                                    <img src={require(`../../Assets/${item.imagename}`)} alt=""/>
                                }
                                </>
                        }
                        </>
                }
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
            </>

        )
    }

}

export default rectanlgebox;