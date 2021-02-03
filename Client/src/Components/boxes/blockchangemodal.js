import React,{PureComponent} from 'react';
import Modal from 'react-modal';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
};
class Blockchange extends PureComponent{
    state={
        filecond:"text",
        text:"",
        color:"",
        file:""
    }
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => this.props.src(reader.result )
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    submit=()=>{
        this.props.editblockcomplete(this.state);
    }
    render(){
        let {filecond}=this.state;
        return(
            <Modal
                isOpen={this.props.modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <input type="radio" name="inputchangeblock"
                       className="mt-2"
                       onClick={()=>this.setState({filecond:"text"})} value="text" checked={ filecond==="text"}/>
                <div className="d-flex flex-column">
                    <label className="mt-2">Text:</label>
                    <input type="text"
                           onChange={(e)=> this.setState({text:e.target.value})}
                           disabled={filecond==="file"}/>
                    <label >Background color:</label>
                    <input type="color" disabled={filecond==="file"}
                           onChange={(e)=> this.setState({text:e.target.value})}
                    />
                </div>
                <h1 className="text-center">OR </h1>
                <input type="radio" name="inputchangeblock"
                       className="mb-2 "
                       onClick={()=>this.setState({filecond:"file"})} value="file" checked={ filecond==="file"}/>
                <div>
                    <input type="file" disabled={filecond==="text"}
                           onChange={this.onSelectFile}
                    />
                </div>

                <button className="btn btn-primary mt-3"
                onClick={()=> this.submit()}
                >Save</button>
            </Modal>
            
        )
    }
}

export default Blockchange;