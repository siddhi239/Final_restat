import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Newfile= () => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false);
    
    const params = {
        engine: "google_scholar",
        q: "IOT",
        hl: "en"
    };
    const url =`https://serpapi.com/search.json?engine=google_scholar&q=${params.q}&hl=${params.hl}&api_key=f27584dfd4f6b31ffcf33b293880c7b88ff0404c27db802c2ad64fe38fed5f1e`;
    const fetchData = () =>{
        fetch(url)
            .then(response => {
            // console.log(res.data.organic_results[0])
            return response.json();

            }).then((data) => {
            //console.log(data)
            let val = data.organic_results[0].publication_info
            // console.log(val)
            setUser(val)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
              });
    }

    useEffect(() => {
        setLoading(true);
        fetchData()
    })

    // if (loading) {
    //     return <p>Data is loading...</p>;
    //   }

    return (
        <div>
            <div>Hello World</div>
            {/* <h2>{user}</h2> */}
            {/* {user.map(name => <h2>{name.summary}</h2>)} */}
       {user.summary}
        </div>
      );
}

export default Newfile;