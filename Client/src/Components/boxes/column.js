import React,{Component} from 'react';

import { Resizable, ResizableBox } from 'react-resizable';

class columns extends Component{

    render(){
        let {index, item,dragcolumn,dragging,wdiv,resize}=this.props;
        let width=wdiv >=5 ? `${Math.floor((100/wdiv))-1.2}%`:"19%";
        // let width="19%";
        // let width=`${Math.floor((100/wdiv))-1.2}%`;

        return(
            <>
            {dragcolumn ===true?

                <div key={index}
                     draggable="true"
                     onDragStart={this.props.handleDragStartcolumn(index, item.arr)}
                     onDragOver={this.props.handleDragOvercolumn(index, item.arr)}
                     onDrop={ this.props.handleDropcolumn(index, item.arr)}
                        style={{textAlign:"center", width:width,resize:"both",overflow:"auto"}}

                     className={dragcolumn === true  ? "w20 hoverforplus order-column" : "w20 hoverforplus"}>

                    {
                        this.props.children
                    }

                </div>:

                <div key={index}
                     style={{textAlign:"center", width:width,resize:resize ?"both":"unset",overflow:"auto",

                     }}
                     // draggable="true"
                     // onDragStart={console.log("starting drag column")}

                     onDragOver={this.props.handleDragOverblock(index,0,item.arr)}
                     onDrop={

                              this.props.handleDropblock(index,1,"column")
                     }

                     className={dragcolumn === true ? "w20 order-column juk hoverforplus" : "w20 hoverforplus"}>
                {
                    this.props.children
                }


                </div>
            }
            </>
        )
    }

}

export default columns;