import React from 'react'
import Edit from './Edit.js'
import axios from 'axios';
import { serverUrl } from './UrlConstants'


export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            assetRecord: [],
            assetRecordOfBlr: [],
            assetRecordOfChen:[],
            Bangalore : false,
            Chennai : false

        }
    }


    componentDidMount() {
        this.getAssetRecords();
        this.getAssetRecordsOfBlr();
        this.getAssetRecordsOfChen();
    }


    getAssetRecords() {
        axios.get("http://" + serverUrl + "/api/getAssetRecord").then(res => {
            console.log(res.data)
            const assetRecord = res.data;
            this.setState({ assetRecord });
            console.log(assetRecord);
            

        });
    }
    getAssetRecordsOfBlr() {
        axios.get("http://" + serverUrl + "/api/getAssetRecordOfBlr").then(res => {
            console.log(res.data)
            const assetRecordOfBlr = res.data;
            this.setState({ assetRecordOfBlr });
            console.log(assetRecordOfBlr);
            

        });
    }
    getAssetRecordsOfChen() {
        axios.get("http://" + serverUrl + "/api/getAssetRecordOfChen").then(res => {
            console.log(res.data)
            const assetRecordOfChen = res.data;
            this.setState({ assetRecordOfChen });
            console.log(assetRecordOfChen);
        });
    }

    captureLocationType =(e)=>{

        const value = e.target.value;
        if(value === "Bangalore"){
            this.setState({Bangalore : true})
            this.setState({Chennai : false})
        }
        if(value === "Chennai"){
            this.setState({Chennai : true})
            this.setState({Bangalore : false})
        }

    } 



    render() {
    
        let todoItems;
        if (this.state.assetRecord) {
            todoItems = this.state.assetRecord.map((assetRecord, i) => {


                console.log(assetRecord);
                return (


                    <tr>
                        <td key={i + "a"}> {assetRecord[i,0]} </td>
                        <td key={i + "b"}> {assetRecord[i,1]}</td>
                        <td key={i + "c"}> {assetRecord[i,2]}</td>
                        <td key={i + "d"}> {assetRecord[i,3]}</td>


                    </tr>

                );
            });
        }
        let assetOfBlr;
        if (this.state.assetRecordOfBlr) {
            assetOfBlr = this.state.assetRecordOfBlr.map((assetRecord, i) => {


                console.log(assetRecord);
                return (


                    <tr>
                        <td key={i + "a"}> {assetRecord[i,0]} </td>
                        <td key={i + "b"}> {assetRecord[i,1]}</td>
                        <td key={i + "c"}> {assetRecord[i,2]}</td>
                        <td key={i + "d"}> {assetRecord[i,3]}</td>


                    </tr>

                );
            });
        }
        let assetOfChen;
        if (this.state.assetRecordOfChen) {
            assetOfChen = this.state.assetRecordOfChen.map((assetRecord, i) => {


                console.log(assetRecord);
                return (


                    <tr>
                        <td key={i + "a"}> {assetRecord[i,0]} </td>
                        <td key={i + "b"}> {assetRecord[i,1]}</td>
                        <td key={i + "c"}> {assetRecord[i,2]}</td>
                        <td key={i + "d"}> {assetRecord[i,3]}</td>


                    </tr>

                );
            });
        }



        return (
            <div>

                  <div className="row" >
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4"><h3><u><b>All Locations</b></u></h3></div>
                                    <div className="col-sm-4"></div>
                  </div>
                  <br />
                 <div className="row">
                            <div className="col-sm-3"></div>

                             <div className="col-sm-6">
                      
                                         <table className="table table-hover table-bordered 0" id="home-table">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">ASSET TYPE</th>
                                                        <th className="text-center">TOTAL ASSETS</th>
                                                        <th className="text-center">UNASSIGNED ASSETS</th>
                                                        <th className="text-center">ASSIGNED ASSETS</th>
                                                    </tr>
                                            </thead>
                                            <tbody>
                                                        {todoItems}
                                            </tbody>
                                     </table>
                            </div>
                            <div className="col-sm-3"></div>
                    </div>
               
                    <div>

                        <Edit />
                        <br /> <br />  <br />
                    </div>
                 <br/>
                 <div>
               

                    <label class="type_label"><b>Select your location :  &nbsp;  </b></label>
                    <select onChangeCapture={this.captureLocationType.bind(this)} id="type_select">
                            <option key = "0" selected={true} >Select Location</option>
                            <option key = "1" value="Bangalore">Bangalore</option>
                            <option key = "2" value="Chennai">Chennai</option>     
                    </select>

                 </div><br/><br/>
                
                <p>{this.state.Bangalore === true && <div className="row">
                    
                    <div className="col-sm-3"></div>

                    <div className="col-sm-6">
                        
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">ASSET TYPE</th>
                                    <th className="text-center">TOTAL ASSETS</th>
                                    <th className="text-center">UNASSIGNED ASSETS</th>
                                    <th className="text-center">ASSIGNED ASSETS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {assetOfBlr}



                            </tbody>
                        </table>
                    </div>

                    <br/>   

                    <div className="col-sm-3"></div>
                </div>}</p>
                 <p>{this.state.Chennai === true && <div className="row">
                    <div className="col-sm-3"></div>

                    <div className="col-sm-6">
               
                        <table className="table table-hover table-bordered 0" id="home-table">
                            <thead>
                                <tr>
                                    <th className="text-center">ASSET TYPE</th>
                                    <th className="text-center">TOTAL ASSETS</th>
                                    <th className="text-center">UNASSIGNED ASSETS</th>
                                    <th className="text-center">ASSIGNED ASSETS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {assetOfChen}



                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm-3"></div>
                </div>}</p>
           

                <br/><br/><br/><br/>

            </div>
        );
    }
}