import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to my web</h1>
      <p>Click on the links bellow to navigate</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About me</h1>
      <p>Im a WebDeveloper</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact Me</h1>
      <p>You can reach me at titanrk1312@gmail.com</p>
    </div>
  );
}

function DashboardDetails() {
  return (
    <div>
      <h1>Dashboard Details</h1>
      <a href="/dashboard">Dashboard</a>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <a href="/dashboard/details">Dashboard Details</a>
    </div>
  );
}

function User() {
  let { userId } = useParams();
  return (
    <div>
      <h1>{userId}</h1>;
    </div>
  );
}

function WeatherAPI() {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Surakarta&appid=ddac819b38199557d4229594df4ce27f";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url); //mengirim permintaan ke url api
      setData(response.data); //menyimpan data dalam state, sudah dalam bentuk json kalau menggunakan axios
    } catch (err) {
      console.error(err);
      console.log(err.response)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Fetch API</h1>
          <center>
            {console.log(data)}
            <h3>City : {data.name}</h3>
            <p>Weather : {data.weather[0].main}</p>
            <p>Description: {data.weather[0].description}</p>
          </center>
        </>
      )}
    </div>
  );
}

function JsonAPI() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchInfo = async () => {
    try{
      setLoading(true);
      const response = await axios.get(url)
      setData(response.data)
    } catch(error){
      console.error(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchInfo();
  }, [])
  return (
    <div>
      {loading ? (<h1>
        Loading...
      </h1>) : (
        <>
        <center>
        <h1>Json User API</h1>
          {data.map((dataObj, index) => {
            return (
              <div>
                {console.log(dataObj)}
                <h3>{dataObj.name}</h3>
                <p>{dataObj.phone}</p>
                <p style={{fontStyle: "italic"}}>{dataObj.email}</p>
              </div>
            )
          })}
        </center>
        </>
      )}
    </div>
  )
}
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/details" element={<DashboardDetails />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/api/weather" element={<WeatherAPI />} />
          <Route path="/api/json" element={<JsonAPI />} />
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </nav>
      </Router>
    </>
  );
}

export default App;
