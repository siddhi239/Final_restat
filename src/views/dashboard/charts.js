import React, { useEffect, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2'
import BarChart from "./chartComponents/barChart";
import { useUserAuth } from '../../context/UserAuthContext'
import { firestore } from 'src/firebase';
import { addDoc, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore"
import { Chart as ChartJS } from 'chart.js/auto'


const Charts = () => {

    const { user } = useUserAuth();
    const id = user.uid
    const [users, setUsers] = useState([]);
    const [citedgd, setcitedgd] = useState(" ");
    const docRef = collection(firestore, "Graph Data");
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([]);

    const arr = []

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(docRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // setU(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        }

        getUsers();
    }, []);

    console.log(users)

    useEffect(() => {
        for (let item of users) {
            if (item.id == user.uid) {
                setChartData([item.Year_18, item.Year_19, item.Year_20, item.Year_21, item.Year_22])
            }
        }
        // users.map(item => {
        //     if (user.uid === item.id) {
        //         sety_18(item.Year_18);
        //         sety_19(item.Year_19);
        //         sety_20(item.Year_20);
        //         sety_21(item.Year_21);
        //         sety_22(item.Year_22);
        //         setChartData()
        //     }
        //     console.log(user.uid);
        //     console.log(y_18);
        //     console.log(y_19);
        //     console.log(y_20);
        //     console.log(y_21);
        //     console.log(y_22);


        // }
        // )
    }, [users]);



    useEffect(() => {
        setLoading(true);
    }, [citedgd])


    const [citationData, setCitationData] = useState({

        labels: [2018, 2019, 2020, 2021, 2022],
        datasets: [{
            label: "Citations per year",
            data: [2, 4, 5, 6],
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
            {chartData.length != 0 ? <Bar data={citationData} options={{ maintainAspectRatio: false }} /> : null}

            {/* <BarChart charData={citationData}/> */}
    
        </div>


    );

}

export default Charts;