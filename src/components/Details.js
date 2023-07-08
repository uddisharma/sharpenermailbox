import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
const Details = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/emails/${params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className=" h-[80vh] w-[70%] m-auto">
        <div style={{ display: "flex", marginTop: "30px" }}>
          <p className="font-bold">{data?.from}</p>
          {" -> "}
          <p>{data?.to}</p>
        </div>
        <p
          style={{
            marginTop: "30px",
            padding: "10px",
            border: "2px solid grey",
            height: "60vh",
          }}
        >
          {data?.message}
        </p>
      </div>
    );
  }
};

export default Details;
