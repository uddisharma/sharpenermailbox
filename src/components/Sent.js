import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
const Sent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let [data, setData] = useState([]);
  const getData = () => {
    axios
      .get("http://localhost:8080/emails")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  data = data.filter((e) => {
    return e.from === user[0].email;
  });
  const updateRead = (id) => {
    axios
      .patch(`http://localhost:8080/emails/${id}`, {
        isRead: true,
      })
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <div class="flex flex-col h-[80vh] w-[70%] m-auto">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <tbody>
                    {data
                      ? data.map((e) => (
                          <Link to={`/mail/${e.id}`}>
                            <tr
                              onClick={() => {
                                updateRead(e.id);
                              }}
                              key={e.id}
                              style={{
                                backgroundColor: e.isRead ? "white" : "",
                                border: "2px solid white",
                              }}
                              class="border-b cursor-pointer bg-neutral-100 dark:border-neutral-500 "
                            >
                              <td
                                style={{ width: "70px" }}
                                class="whitespace-nowrap px-6 py-4 font-medium"
                              >
                                {e.isRead ? "read" : "unread"}
                              </td>
                              <td
                                style={{ width: "150px" }}
                                class="whitespace-nowrap px-6 py-4"
                              >
                                {e.from}
                              </td>
                              <td class="whitespace-nowrap px-6 py-4">
                                {e.message}
                              </td>
                            </tr>
                          </Link>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Sent;
