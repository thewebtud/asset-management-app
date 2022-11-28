import React from "react"
import { Bar } from 'react-chartjs-2';

export default class LineChart extends React.Component {
    render() {
        console.log(this.props.qtyAssignedAssets + 5)
        console.log(this.props.qtyAvailableAssets)

        let qty1 = this.props.qtyAssignedAssets + 5
       return (
            <div className="container">
                <div className="row" >
                  <div className="col-sm-4"></div>
                   <div className="col-sm-4"><h3>Available & Assigned asset graph</h3></div>
                    <div className="col-sm-4"></div>
                 </div><br/>
                <div className="row">

              
                    <div className ="col-sm-1" ></div>
                    <div className ="col-sm-11" >
                    <Bar data={this.props.chartData3}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 20
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max : 50
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                     
                   </div>
                <div className="row">
                    <br/><br/><br/><br/>
                   </div>
                   <div className="row" >
                  <div className="col-sm-4"></div>
                   <div className="col-sm-4"><h3>Available asset graph</h3></div>
                    <div className="col-sm-4"></div>
                 </div><br/>
            <div className="row">

              
                    <div className ="col-sm-1" ></div>
                    <div className ="col-sm-11" >
                    <Bar data={this.props.chartData1}
                         options={{ 
                            title: {
                                display: true,                                
                                fontSize: 20
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max : 50
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                     
                   </div> 
                   <div className="row">
                    <br/><br/><br/><br/>
                   </div>
                    <div className="row" >
                  <div className="col-sm-4"></div>
                   <div className="col-sm-4"><h3>Available asset graph</h3></div>
                    <div className="col-sm-4"></div>
                 </div><br/>
                
           <div className="row">
              
                    <div className ="col-sm-12">
                    <Bar data={this.props.chartData2}
                         options={{ 
                            title: {
                                display: false,                                
                                fontSize: 5
                                   },
                            legend: {
                                display: true,
                                position: "bottom"
                                    },
                                     scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: 50
                                            }
                                            }]
                                        }
                                }}/>
                    </div>
                </div>
                </div>
          
        )
    }
}
