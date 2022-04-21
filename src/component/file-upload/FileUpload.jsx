import React, { Component } from "react";
import axios from "axios";
import * as styles from "./FileUpload.module.css";

export default class FileUpload extends Component {
    state = {
        text: null,
        fileToUpload: null,
        uploadSuccess: null,
        error: null
    };

    uploadFile() {
        // Getting the signed url
        axios.post(
            "https://v6r5t9xxsf.execute-api.us-east-1.amazonaws.com/prod/upload-me-a-file?fileName=" +
                this.state.fileToUpload.name, this.state.text
        ).then(response => {
            // Getting the url from response
            const url = response.data.fileUploadURL;

            axios({
                method: "PUT",
                url: url,
                data: this.state.fileToUpload,
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    this.setState({
                        uploadSuccess: "File upload successfull",
                        error: undefined
                    });
                })
                .catch(err => {
                    this.setState({
                        error: "Error Occured while uploading the file",
                        uploadSuccess: undefined
                    });
                });
        });
    }

    render() {
        return (
            <div className={styles.fileUploadCont}>
                <div>
                    <form>
                        <div className="form">
                        <label>
                            Text Input: <input type="text" name="name" 
                                onChange={e => {
                                    this.setState({
                                        text: e.target.value
                                    });
                                }}/>
                            </label>
                            <label>
                            File Input: <input
                                type="file"
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    this.setState({
                                        fileToUpload: e.target.files[0]
                                    });
                                }}
                            /> </label>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={e => {
                                        this.uploadFile();
                                    }}
                                >
                                    Submit
                                </button>

                            <div>
                                <span>
                                    {this.state.uploadSuccess
                                        ? "File Upload Successfully"
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
