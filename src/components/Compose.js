import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Compose = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  const userId = user && user.length > 0 ? user[0].id : "";
  data = data.filter((e) => {
    return e.id !== userId;
  });
  const [emaildata, setEmaildata] = useState({
    from: user && user.length > 0 ? user[0].email : "",
    to: "",
    message: "",
    isRead: false,
  });
  const compose = () => {
    axios
      .post("http://localhost:8080/emails", emaildata)
      .then((res) => {
        console.log(res);
        setEmaildata({ ...emaildata, message: "" });
      })
      .catch((err) => [console.log(err)]);
  };
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="w-[70%] m-auto">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            From
          </label>
          <div class="mt-2">
            <input
              disabled
              id="email"
              name="email"
              type="email"
              defaultValue={
                "From :" + user && user.length > 0 ? user[0].email : ""
              }
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            send To
          </label>
          <div class="mt-2">
            <select
              onChange={(e) =>
                setEmaildata({ ...emaildata, to: e.target.value })
              }
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select a User</option>
              {data ? (
                data.map((e) => <option value={e.email}>{e.name}</option>)
              ) : (
                <option value="US"></option>
              )}
            </select>
          </div>
        </div>

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          value={emaildata.message}
          onChange={(e) =>
            setEmaildata({ ...emaildata, message: e.target.value })
          }
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          onClick={compose}
          style={{ backgroundColor: "blue" }}
          class=" mt-8 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Compose +
        </button>
      </div>
    );
  }
};

export default Compose;
