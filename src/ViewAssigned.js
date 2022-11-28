import React from 'react'
import axios from 'axios';
import $ from 'jquery'
import SweetAlert from "react-bootstrap-sweetalert";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment'
import { CSVLink, CSVDownload } from 'react-csv';
import { serverUrl } from './UrlConstants'





export default class ViewAssigned extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            assignedAssets: [],
            btnToggle: false,
            text: "def",
            newDate: false,
            temp: "",
            upload: "",
            extras: [],
            releaseID: "",
            organization: '',
            assetType: '',
            location:'',
            AssignDate: "",
            ReleasedDate: "",
            filterData: [],
            filter: 1
        }
    }

    captureAssignDate = event => {
        var value = event.target.value;
        let AssignDate;
        this.setState({ AssignDate: value })
    }
    captureReleasedDate = event => {
        var value = event.target.value;
        let ReleasedDate;
        this.setState({ ReleasedDate: value })
    }
    filterItems = (val, type) => {
        switch (type) {
            case 'organization':
                this.setState({ organization: val });
                break;
            case 'assetType':
                this.setState({ assetType: val });
                break;
            case 'location':
                this.setState({ location: val });
                break;
            default:
                break;
        }
    }

    filterDate(e) {
        let timeEnd = moment(this.state.ReleasedDate);
        let startDate = moment(this.state.AssignDate);
        var diff = timeEnd.diff(startDate);
        var diffDuration = moment.duration(diff);

        e.preventDefault()
        if (diffDuration.days() > 0) {

            axios.get(`http://${serverUrl}/api/filterOnDate/${this.state.AssignDate}/${this.state.ReleasedDate}`)

                .then(res => {
                    var filterData = res.data;
                    this.setState({ filterData });
                    this.setState({ filter: 0 });
                });

        }
        else {
            window.alert(" 'To' date cannot be earlier than 'From' date.")
        }

    }

    resetFilters(e) {
        e.preventDefault()
        document.getElementById("resetForm").reset();
        this.setState({filter:1})
    }

    componentDidMount() {
        this.getAssignedAssets();
    }



    getFreshAssets(updatedRows) {

        this.setState({ assignedAssets: updatedRows }, () => { console.log(this.state.assignedAssets) });
    }




    getAssignedAssets() // here we are using jquery but u can also use axios and superAgent to fetch json data from other API's
    {
        console.log("INSIDE <GETASSIGNEDASSETS>`</GETASSIGNEDASSETS>")
        axios.get("http://" + serverUrl + "/api/getAllAssignedAsset").then(res => {
            console.log(res.data)
            var assignedAssets = res.data;
            this.setState({ assignedAssets }, () => {
                console.log(this.state.assignedAssets);
            });
        });
    }

    ResetData(e) {
        e.preventDefault()
    }

    changeOption(type, e) {
        var val = e.target.value;
        this.filterItems(val, type);
    }



    render() {

        var filteredItems = this.state.assignedAssets;

        ["organization", "All"].forEach((filterBy) => {
            var filterValue = this.state[filterBy];
            if (filterValue === "All") {
                return filteredItems;
            }
            if (filterValue) {
                filteredItems = filteredItems.filter((item) => {
                    return item[filterBy] === filterValue;
                });
            }
        });
        ["assetType", "All"].forEach((filterBy) => {

            var filterValue = this.state[filterBy];
            if (filterValue === "All") {
                return filteredItems;
            }
            if (filterValue) {
                filteredItems = filteredItems.filter((item) => {

                    return item.objRegisteredAssetBean[filterBy] === filterValue;
                });
            }

        });
        ["location", "All"].forEach((filterBy) => {

            var filterValue = this.state[filterBy];
            if (filterValue === "All") {
                return filteredItems;
            }
            if (filterValue) {
                filteredItems = filteredItems.filter((item) => {

                    return item[filterBy] === filterValue;
                });
            }

        });


        var organizationArray = (this.state.assignedAssets.map((item) => {
            return item.organization

        }));
        var assetTypeArray = (this.state.assignedAssets.map((item) => {
            return item.objRegisteredAssetBean.assetType
        }));
        var locationArray = (this.state.assignedAssets.map((item) => {
            return item.location
        }));


        return (
            <div className="container-fluid">
                <br /><br />
                <div className="row">
                    <div className="col-sm-6" > </div>
                    <div className="col-sm-6 date_range_text" ><b>&nbsp;&nbsp;Assigned Date Range</b></div>
                </div>


                <div className="row">

                    <div className="col-sm-5"  >
                        <div style={{float:'left'}}>
                        <b> OrgName: &nbsp;</b>
                        <select id="organization" onChange={this.changeOption.bind(this, 'organization')} >
                            <option selected={true}>All</option>
                            {[...new Set(organizationArray)].sort(function(a, b) {
                                if(a.toLowerCase() < b.toLowerCase()) return -1;
                                if(a.toLowerCase() > b.toLowerCase()) return 1;
                                return 0;
                                }).map((option) => {
                          
                                return (

                                    <option key={option} value={option}>{option}</option>)
                            })}
                        </select>
                        </div>
                        <div>
                        <b>  AssetType: &nbsp;</b>
                        <select id="AssetType" onChange={this.changeOption.bind(this, 'assetType')} >
                            <option selected={true}>All</option>
                            {[...new Set(assetTypeArray)].sort(function(a, b) {
                                if(a.toLowerCase() < b.toLowerCase()) return -1;
                                if(a.toLowerCase() > b.toLowerCase()) return 1;
                                return 0;
                                }).map((option) => {
                          
                                return (
                                    <option key={option} value={option}>{option}</option>)
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="col-sm-2"  >
                        <div style={{float: 'left'}}>
                        <b>Location: &nbsp;</b>
                        <select id="LocationType" onChange={this.changeOption.bind(this, 'location')}>
                            <option selected={true}>All</option>
                            {[...new Set(locationArray)].map((option) => {
                          
                                return (
                                    <option key={option} value={option}>{option}</option>)
                            })}
                        </select>
                        </div>
                    </div>
                    <div className="col-sm-5 date_box" >

                        <form id="resetForm" style={{float :'right'}}>

                            
                            <b id="date_filter">From: &nbsp;</b>
                            <input type="date" name="AssignDate" onChange={this.captureAssignDate.bind(this)} /> &nbsp;&nbsp;
                      <b>To: &nbsp;</b>
                            <input type="date" name="ReleaseDate" onChange={this.captureReleasedDate.bind(this)} />&nbsp;&nbsp;
               <button type="submit" class="btn btn-primary btn-sm" name="ReleaseDate" onClick={this.filterDate.bind(this)}>Search</button>&nbsp;&nbsp;

              <button type="submit" class="btn btn-primary search_btn btn-sm" onClick={this.resetFilters.bind(this)}>Reset&nbsp;</button>
                        </form>

                    </div>

                </div>


                <br /> <br />
                <div className="filter-form">
                    <FilterItems getFreshAssets={this.getFreshAssets.bind(this)} data={filteredItems} filterData={this.state.filterData} filter={this.state.filter} />

                </div>
            </div>
        );
    }
}

class FilterItems extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: props.data,
            btnToggle: false,
            text: "def",
            newDate: false,
            temp: "",
            upload: "",
            extras: [],
            releaseID: "",
            alert: false,
            excelData: []
        }

    }

    componentWillReceiveProps({data}) {
        this.setState({ ...this.state, data })
        console.log("INSIDE COMPONENTWILLRECEIVEPROPS")
    }

    dateChanged(e) {
        e.preventDefault();
        this.setState({ text: e.target.value })


    }
    saveButtonAppear(index) {

        this.setState({ btnToggle: true })
        this.setState({ temp: index })
    }


    saveButtonClicked(id) {

        this.state.temp = id;
        this.setState({ btnToggle: false })

        let assignedAssets2 = this.props.data.findIndex(x => x.assignedId === this.state.temp);

        axios.put(`http://${serverUrl}/api/extendReleaseDate/${this.state.temp}`, {

            "assignedId": this.state.temp,
            "empId": this.props.data[assignedAssets2].empId,
            "empName": this.props.data[assignedAssets2].empName,
            "assetFkId": this.props.data[assignedAssets2].assetFkId,
            "assignedDate": this.props.data[assignedAssets2].assignedDate,
            "releasedDate": this.state.text,
            "createDateTime": this.props.data[assignedAssets2].createDateTime,
            "updateDateTime": this.props.data[assignedAssets2].updateDateTime,
            "organization": this.props.data[assignedAssets2].organization,
            "activeInd": this.props.data[assignedAssets2].activeInd
        }
            , )
    }



    onRelease(assignedAsset) {

        this.state.releaseID = assignedAsset.assignedId;

        let assignedAssets3 = this.props.data.findIndex(x => x.assignedId === this.state.releaseID);

        axios.post(`http://${serverUrl}/api/save_released_history`, {

            "historyId": this.props.data[assignedAssets3].assignedId,
            "empId": this.props.data[assignedAssets3].empId,
            "empName": this.props.data[assignedAssets3].empName,
            "assetId": this.props.data[assignedAssets3].assetFkId,
            "assetType": this.props.data[assignedAssets3].objRegisteredAssetBean.assetType,
            "assignedDate": this.props.data[assignedAssets3].assignedDate,
            "releasedDate": this.props.data[assignedAssets3].releasedDate,
            "createDateTime": "",
            "updateDateTime": "",
            "location":this.props.data[assignedAssets3].location,
            "organization": this.props.data[assignedAssets3].organization,
            "makeModel": this.props.data[assignedAssets3].objRegisteredAssetBean.makeModel,
            "assetSpecifications": this.props.data[assignedAssets3].objRegisteredAssetBean.assetSpecification
        }).then(res =>{
            console.log("this is the value" + res.data)
        }

        )


        axios.put(`http://${serverUrl}/api/release/${this.state.releaseID}`, {

            "assignedId": this.props.data[assignedAssets3].assignedId,
            "empId": this.props.data[assignedAssets3].empId,
            "empName": this.props.data[assignedAssets3].empName,
            "assetFkId": this.props.data[assignedAssets3].assetFkId,
            "assignedDate": this.props.data[assignedAssets3].assignedDate,
            "releasedDate": this.props.data[assignedAssets3].releasedDate,
            "location":this.props.data[assignedAssets3].location,
            "createDateTime": "",
            "updateDateTime": "",
            "organization": this.props.data[assignedAssets3].organization,
            "activeInd": true

        }).then(res => {
            let updatedRows = this.props.data.filter(i => i.assignedId !== this.state.releaseID);


            this.props.getFreshAssets(updatedRows)
        })
        this.setState({
            alert: false
        });
    }

    showAlert(title, message, callBack, style) {
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Sure"
                    cancelBtnText="No"
                    confirmBtnBsStyle={style ? style : "warning"}
                    cancelBtnBsStyle="default"
                    customIcon="thumbs-up.jpg"
                    title={title}
                    onConfirm={callBack()}
                    onCancel={this.hideAlert}
                >
                    {message}
                </SweetAlert>
            )
        });
    }

    hideAlert = () => {
        this.setState({
            alert: false
        });
    };


    exportExcelData = (data) => {
        let exportDataArray = new Array();
        let pushableData = {};
        for (let i = 0; i < data.length; i++) {
            pushableData = {
                empId: data[i].empId,
                empName: data[i].empName,
                orgName: data[i].organization,
                assetId: data[i].assetFkId,
                assetType: data[i].objRegisteredAssetBean.assetType,
                makeModel: data[i].objRegisteredAssetBean.makeModel,
                assetSpecification: data[i].objRegisteredAssetBean.assetSpecification,
                assignedDate: data[i].assignedDate,
                releasedDate: data[i].releasedDate
            }
            exportDataArray.push(pushableData)
        }
        return exportDataArray;
    }

    getCurrentDateTime = () => {
        var filename = new Date();
        return "AssignedAssetsOn" + filename;
    }

    dateTime = new Date();

    render() {

        var assignedAssets;


        if (this.props.data && this.props.filter === 1) {
            assignedAssets = this.props.data.map((assignedAsset, index) => {

                return (

                    <tr>
                        <td key={index + "a"}> {assignedAsset.empId} </td>
                        <td key={index + "b"}> {assignedAsset.empName} </td>
                        <td key={index + "c"}>{assignedAsset.organization}</td>
                        <td key={index + "d"}>{assignedAsset.assetFkId}</td>
                        <td key={index + "e"}>{assignedAsset.objRegisteredAssetBean.assetType}</td>
                        <td key={index + "f"}> {assignedAsset.objRegisteredAssetBean.makeModel}</td>
                        <td key={index + "g"} title={assignedAsset.objRegisteredAssetBean.assetSpecification}>
                            {assignedAsset.objRegisteredAssetBean.assetSpecification.slice(0, 20)}</td>
                        <td key={index + "h"}>{assignedAsset.location}</td>
                        <td key={index + "i"}> {assignedAsset.assignedDate}</td>
                        <td key={index + "j"}>
                            <p> {this.state.btnToggle && this.state.temp === index ? <input type="date" onChange={this.dateChanged.bind(this)} /> : <p>{assignedAsset.releasedDate}</p>} </p>
                        </td>
                        <td key={index + "k"}>
                            {this.state.btnToggle && this.state.temp === index ? <button className="btn btn-success btn-sm" onClick={this.saveButtonClicked.bind(this, (assignedAsset.assignedId))}><span className="glyphicon glyphicon-saved"></span> Save</button> : <button className="btn btn-info btn-sm" onClick={this.saveButtonAppear.bind(this, index)}><span className="glyphicon glyphicon-pencil"></span> Edit</button>}
                        </td>
                        <td key={index + "l"}><button className="btn btn-danger btn-sm" color="primary" onClick={() => this.showAlert("Delete Confirmed?", "", () => this.onRelease.bind(this, assignedAsset), null)}><span className="glyphicon glyphicon-trash"></span> Release</button></td>
                        {this.state.alert}


                    </tr>

                );
            });
        }
        else if (this.props.data && this.props.filter === 0) {
            assignedAssets = this.props.filterData.map((assignedAsset, index) => {



                return (

                    <tr>
                        <td key={index + "a"}> {assignedAsset.empId} </td>
                        <td key={index + "b"}> {assignedAsset.empName} </td>
                        <td key={index + "c"}>{assignedAsset.organization}</td>
                        <td key={index + "d"}>{assignedAsset.assetFkId}</td>
                        <td key={index + "e"}>{assignedAsset.objRegisteredAssetBean.assetType}</td>
                        <td key={index + "f"}> {assignedAsset.objRegisteredAssetBean.makeModel}</td>
                        <td key={index + "g"} title={assignedAsset.objRegisteredAssetBean.assetSpecification}> {assignedAsset.objRegisteredAssetBean.assetSpecification.slice(0, 20)}</td>
                        <td key={index + "z"}> {assignedAsset.location}</td>
                        <td key={index + "h"}> {assignedAsset.assignedDate}</td>

                        <td key={index + "i"}>
                            <p> {this.state.btnToggle && this.state.temp === index ? <input type="date" onChange={this.dateChanged.bind(this)} /> : <p>{assignedAsset.releasedDate}</p>} </p>
                        </td>

                        <td key={index + "j"}>
                            {this.state.btnToggle && this.state.temp === index ? <button className="btn btn-success btn-sm" onClick={this.saveButtonClicked.bind(this, (assignedAsset.assignedId))}><span className="glyphicon glyphicon-saved"></span> Save</button> : <button className="btn btn-info btn-sm" onClick={this.saveButtonAppear.bind(this, index)}><span className="glyphicon glyphicon-pencil"></span> Edit</button>}


                        </td>
                        <td key={index + "k"}><button className="btn btn-danger btn-sm" color="primary" onClick={() => this.showAlert("Delete Confirmed?", "", () => this.onRelease.bind(this, assignedAsset), null)}><span className="glyphicon glyphicon-trash"></span> Release</button></td>
                        {this.state.alert}
                    </tr>
                );
            });

        }


        return (
            <div className="container-fluid">

                <table className="table table-bordered table-hover " id='tblData'>
                    <thead>
                        <tr className="table_head">
                            <TableHeaderColumn className="text-center">EmpID</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">EmpName</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">OrgName</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">AssetID</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">AssetType</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">Make&Model</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">Specifications</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">Location</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">AssignDate</TableHeaderColumn>
                            <TableHeaderColumn className="text-center">ReleaseDate</TableHeaderColumn>
                            <TableHeaderColumn className="text-center" export={false} >Edit</TableHeaderColumn>
                            <TableHeaderColumn className="text-center" export={false}>Release</TableHeaderColumn>

                        </tr>
                    </thead>
                    <tbody>
                        {assignedAssets}


                    </tbody>

                </table>

                <CSVLink data={this.exportExcelData(this.props.data)} filename={"Assigned Assets on " + this.dateTime + ".csv"} className="btn btn-primary" target="_blank">
                    Download Excel file
                            </CSVLink>



                <br /> <br /><br />
            </div>

        );
    }
}
