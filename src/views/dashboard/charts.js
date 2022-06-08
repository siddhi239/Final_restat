import React,  {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2'
import BarChart from "./chartComponents/barChart";
import { useUserAuth } from '../../context/UserAuthContext'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import {Chart as ChartJS} from 'chart.js/auto'


const Charts = () => {

    const { user } = useUserAuth();
    const id = user.uid
    const [docInfo, setdocInfo] = useState([]);
    const docRef = collection(firestore, "Graph Data");
    const arr =[]

    useEffect(() => {
        const getdocInfo = async () => {
            const data = await getDocs(docRef)
            setdocInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }

        getdocInfo();
    }, []);

    // useEffect(() => {
    //     docInfo.map((item) =>{
    //         if(item.id === id){
    //             {item.2018}
    //         }
    //     })
    // }, []);



console.log(docInfo)
    // const [citationData, setCitationData] = useState({
    //     labels: [2018, 2019, 2020, 2021, 2022],
    //     datasets: [{
    //         label: "Citations per year",
    //         data: {citedgd[0], citedgd[1], citedgd[2], citedgd[3], citedgd[5]}
            
    //     }]

    // });

    return(
        <div>
            {/* <Bar data={citationData}/> */}
           {/* <BarChart charData={citationData}/> */}
           
        </div>
    );

}

export default Charts