import React, { Component } from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
import {zipfiles} from "./actions"
import {customstyles} from '../../customstyle';
import FilePreview from 'react-preview-file';
// import {urlcomplete,generatedcontent} from './action'
const customStyles=customstyles;


class zip extends Component {
    constructor() {
        super();
        this.state = {
            zip:"",
            files: [],
            isLoading: false,
            error:"",
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
                textAlign:"flex-start",
                objectFit:"cover",
                file:""
            },
            generatedcontent:[]
        };



        this.getfiles = this.getfiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        console.log("zip fles input", event.target.files);
        this.setState({zip: event.target.files[0]});
    }
    getfiles=()=> {
        this.setState({  generatedcontent:[]})

        if (this.state.zip === '') {
            this.setState({
                error: 'file is required.'
            });

            return;
        }

        let data = {
            zip: this.state.zip
        };

        this.setState({
            isLoading: true,
        });

        fetch('http://localhost:5000/api/extractzip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.files)
                {
                    console.log("files coning from abckedn", data);
                    this.setState({
                        files: data.files,
                        isLoading: false,
                    });

                    this.props.zipfiles(data.files);
                }

                if (data.error) {
                    this.setState({
                        error: data.error,
                        isLoading: false,

                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.msg,
                    isLoading: false,

                });
            });
    }


    render() {
        // let {data,previewopen}= this.props;
        let {generatedcontent,zip,error}= this.state;
        console.log("preview is r3ender",generatedcontent);

        return (
            <div>
                <div className="form-group mt-1">
                    <input type="file"  onChange={this.handleChange}
                           className="form-control mt-1" id="url"  />
                    <div className="d-flex  align-items-center mt-1">
                    </div>
                    <div className="d-flex mt-1">


                            <button className="btn btn-primary"
                                    onClick={this.getfiles}
                            >
                                Submit
                            </button>

                        {zip!=="" && this.state.isLoading===true
    && <p>Loading...</p>
                        }



                    </div>
                    {error}

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
    {}
)(zip);


