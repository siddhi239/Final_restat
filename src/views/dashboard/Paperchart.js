import React, { useEffect, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2'
import BarChart from "./chartComponents/barChart";
import { useUserAuth } from '../../context/UserAuthContext'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import { Chart as ChartJS } from 'chart.js/auto'


const Paperchart = () => {

    
    const [users, setUsers] = useState([]);
    const docRef = collection(firestore, "Total Paper per User");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(docRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // setU(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }

        getUsers();
    }, []);

    console.log(users)


    const [citationData, setCitationData] = useState({

        labels: [users.map((item,index)=> item.Name)],
        datasets: [{
            label: "Faculty Paper",
            data: users.map((item)=> item.Count),
            //data: [y_18,y_19,y_20,y_21,y_22],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',

            ],


        }]
    });

    return (
        <div>
            {/* {chartData.length != 0 ? <Bar data={citationData} options={{ maintainAspectRatio: false }} /> : null} */}

            <BarChart charData={citationData}/>
            {/* {y_18} */}
        </div>


    );

}

export default Paperchart;