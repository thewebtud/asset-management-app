import React, { Component } from "react";
import LineChart from './LineChart'
import axios from 'axios';
import {serverUrl} from './UrlConstants';

class ProgramGraph extends React.Component {
      constructor(props) {
    super(props);

    this.state = {
        barData1: {
                labels: [],
                datasets: [
                    {
                       label: 'Available Asset Details',
                       backgroundColor:'rgba(54, 162, 235, 0.6)',                                   
                    
                       data: [],
                        
                    },
                  
                ]
            },
            barData2:{
                        labels: [],
                        datasets: [
                              {
                        label: 'Assigned Asset Details',
                        backgroundColor:'rgba(255, 206, 86, 0.6)',
                        data:[],
                        }
                        ]
            },
            barData3:{
                        labels: [],
                        datasets: [
                              {
                                    label: 'Available Asset Details',
                       backgroundColor:'rgba(54, 162, 235, 0.6)',
                       
                        data:[],
                    },
                    { label: 'Assigned Asset Details',
                        backgroundColor:'rgba(255, 206, 86, 0.6)',                                 
                    
                       data: [],
                    }
                        ]
            },
            qtyAssignedAssets: '',
            qtyAvailableAssets:''


    };
  }



   componentDidMount() {
        this.getAvailableAsset(); 
        this.getAssignedAsset();
        this.getAssetRecords();  
    }


    getAssignedAsset(){
             axios
            .get("http://"+serverUrl+"/api/assignedAssetCount ")
            .then(res => {
                console.log(res.data)
                const AssignedassetType = res.data;
               
                console.log(res.data.length)
         
                this.manageAssignedData(res.data,res.data.length);
                    

            });
    }

    //----------------------------------------------------------------------

    getAvailableAsset() {
        axios
            .get("http://"+serverUrl+"/api/availableAssetCount")
            .then(res => {
                console.log(res.data.length)
                const AvailableassetType = res.data;
                
                this.manageAvailableData(res.data,res.data.length);
            });
    }

    //----------------------------------------------------------------------
    getAssetRecords() {
        axios.get("http://" + serverUrl + "/api/getAssetRecord").then(res => {
            console.log(res.data)
            this.manageAllData(res.data,res.data.length);
            

        });
    }

   //-----------------------------------------------------------------------
   manageAllData=(AllassetType,length)=>{
        let name = new Array();
        let qty1= new Array();
        let qty2= new Array();
        let y = {};
        let z = {};
        let x = {};


         for(let i=0;i<length;i++)
            {
                     y=AllassetType[i][0]
                     name.push(y)

                     z=AllassetType[i][2]
                     qty1.push(z)

                     x=AllassetType[i][3]
                     qty2.push(x)



    }
    console.log(name);
      

    let barData3 = {...this.state.barData3};

    barData3.labels=name;
    console.log(barData3.labels);

    barData3.datasets[0].data = qty1;
    console.log(barData3.datasets[0].data);
    
    barData3.datasets[1].data = qty2;
    console.log(barData3.datasets[1].data);

    this.setState({barData3});
    
   
    

     
  
      
 

    
}
   //----------------------------------------------------------------------
    manageAvailableData=(AvailableassetType,length)=>{
        let name = new Array();
        let qty= new Array();
        let y = {};
        let z = {};

         for(let i=0;i<length;i++)
            {
                     y=AvailableassetType[i][0]
                     name.push(y)

                     z=AvailableassetType[i][1]
                     qty.push(z)

    }
    console.log(name);
      

    let barData1 = {...this.state.barData1};

    barData1.labels=name;
    console.log(barData1.labels);

    barData1.datasets[0].data = qty;
    console.log(barData1.datasets[0].data);

    this.setState({barData1});
    
     let max = 1;
     if(qty.length>1){
    for(let i=0;i<qty.length;i++){
       
        if(qty[i]>=qty[i+1]){
            max = qty[i]
        }
    }}
    this.setState({qtyAvailableAssets:max})
    

     
  
      
 

    
}
//---------------------------------------------------------------------
manageAssignedData=(AssignedassetType,length)=>{
        let name = new Array();
        let qty= new Array();
        let y = {};
        let z = {};

         for(let i=0;i<length;i++)
            {
                     y=AssignedassetType[i][0]
                     name.push(y)

                     z=AssignedassetType[i][1]
                     qty.push(z)
                   

    }
    console.log(name)
    console.log(qty)

   let barData2 = {...this.state.barData2};


    barData2.labels=name;
    console.log(barData2.labels);

    barData2.datasets[0].data = qty;
    console.log(barData2.datasets[0].data);

    this.setState({barData2});
    let max = 1;
    if(qty.length>1){
    for(let i=0;i<qty.length;i++){
       
        if(qty[i]>=qty[i+1]){
            max = qty[i]
        }
    }}
    this.setState({qtyAssignedAssets:max})
      
 

    
}
    render() {
        console.log(this.state.qtyAssignedAssets)
        console.log(this.state.qtyAvailableAssets)
        console.log(this.state.barData1)
        console.log(this.state.barData2)
      
   
    return (
      <div className="app">
        
     
                 
                                    
                     <LineChart chartData1={this.state.barData1} chartData3={this.state.barData3} chartData2={this.state.barData2} qtyAvailableAssets={this.state.qtyAvailableAssets} qtyAssignedAssets={this.state.qtyAssignedAssets} />
             
<br/><br/><br/>

      </div>
    );
  }


} 

export default ProgramGraph;
