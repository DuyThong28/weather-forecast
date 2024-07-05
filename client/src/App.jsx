import { useEffect, useRef, useState } from "react";
import "./App.scss";
import WeatherItem from "./components/WeatherItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCityData, getForecastData } from "./api/forecastApi";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  checkOTP,
  createUser,
  deleteUser,
  findUserByEmail,
  sendOTP,
  updateCity,
} from "./api/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerStep = {
  CHECKMAIL: "check mail",
  CHECKOTP: "check otp",
};

function App() {
  const [forecastState, setForecastState] = useState();
  const [citiesState, setCitiesState] = useState(null);
  const [cityState, setCityState] = useState("");
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [registerState, setRegisterState] = useState(registerStep.CHECKMAIL);
  const [isRegister, setIsRegister] = useState(true);
  const [emailState, setEmailState] = useState(null);
  const formRef = useRef();
  const inputRef = useRef();

  const { data: temporaryData } = useQuery({
    queryKey: ["forecast"],
    queryFn: async () => {
      const data = await getForecastData({
        city: localStorage.getItem("city"),
        days: 4,
      });
      console.log("Save temporary weather information history");
      inputRef.current.value = null;
      setCitiesState(null);
      setCityState(() => "");
      setForecastState(data.data);
      return data.data;
    },
    enabled: localStorage.getItem("city") !== null,
  });

  const { mutate: forecastMutate } = useMutation({
    mutationFn: getForecastData,
    onSuccess: ({ data }) => {
      inputRef.current.value = null;
      setCitiesState(null);
      setCityState(() => "");
      setForecastState(data);
    },
  });

  const { mutate: getCityMutate } = useMutation({
    mutationFn: getCityData,
    onSuccess: ({ data }) => {
      setCitiesState(data);
      setCityState(() => "");
    },
  });

  const { mutate: createUserMutate } = useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      setEmailState(data.email);
      setRegisterState(registerStep.CHECKOTP);
      toast.success(`Check your email to get OTP`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      await sendOTP({ email: data.email });
    },
  });

  const { mutate: checkEmailMutate } = useMutation({
    mutationFn: findUserByEmail,
    onSuccess: async (data) => {
      setEmailState(data.email);
      setRegisterState(registerStep.CHECKOTP);
      toast.success(`Check your email to get OTP`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      await sendOTP({ email: data.email });
    },
    onError: () => {
      toast.error(`Could not find your email`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const { mutate: checkOPTMutate } = useMutation({
    mutationFn: checkOTP,
    onSuccess: async () => {
      if (isRegister) {
        const city = forecastState.todayData.location;
        await updateCity({ email: emailState, city: city });
        toast.success(`Subscribe to ${city} weather forecast success`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        await deleteUser({ email: emailState });
        toast.success(`Unsubscribe to weather forecast success`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      handleClose();
    },
    onError: () => {
      toast.error(`Check your OTP again`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  function searchHandler() {
    if (cityState.trim() == "") {
      return;
    } else {
      forecastMutate({ city: cityState, days: 4 });
    }
  }

  function inputHandler() {
    const textSearch = inputRef.current.value;
    setCityState(() => textSearch);
    if (textSearch == null || textSearch.trim() == "") {
      setCitiesState(null);
    } else {
      getCityMutate({ name: inputRef.current.value });
    }
  }

  function useCurrentLocationHandler() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        forecastMutate({ latitude, longitude, days: 4 });
      },
      () => {
        alert("Please reset location permission.");
      }
    );
  }

  function setSearchTextHandler({ city }) {
    setCityState(() => city);
    inputRef.current.value = city;
    setCitiesState(null);
  }

  function loadMoreHandler() {
    const city = forecastState.todayData.location;
    forecastMutate({ city, days: 13 });
  }

  const handleClose = () => {
    setShow(false);
    setEmailState(null);
    setRegisterState(registerStep.CHECKMAIL);
  };
  const handleShow = () => setShow(true);

  function registerHandler() {
    if (!forecastState) {
      toast.warn("Search for a city that you want to register", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setIsRegister(() => true);
    handleShow();
  }

  function unSubscribeHandler() {
    setIsRegister(() => false);
    handleShow();
  }

  function submitHandler(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    if (registerState === registerStep.CHECKMAIL) {
      const email = data.email.trim();
      if (isRegister) {
        createUserMutate({ email });
      } else {
        checkEmailMutate({ email });
      }
    } else if (registerState === registerStep.CHECKOTP) {
      const code = data.code.trim();
      checkOPTMutate({ email: emailState, code: code });
    }
    setValidated(false);
  }

  return (
    <>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isRegister ? "Register" : "Unsubscribe"}</Modal.Title>
        </Modal.Header>
        <div className="modal-body h-100" style={{ padding: "1rem" }}>
          <Form
            method="post"
            ref={formRef}
            onSubmit={submitHandler}
            noValidate
            validated={validated}
          >
            {registerState === registerStep.CHECKMAIL && (
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>
            )}
            {registerState === registerStep.CHECKOTP && (
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="code"
                  name="code"
                  required
                />
                <label htmlFor="code">OTP</label>
              </div>
            )}
            <div
              className={`d-flex gap-3 mt-3 justify-content-center bg-white`}
            >
              <button
                type="button"
                className="btn btn-secondary shadow-sm"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary fw-bold shadow-sm"
              >
                Confirm
              </button>
            </div>
          </Form>
        </div>
      </Modal>
      <div className="header">
        <p>Weather Forecast</p>
        <div className="d-flex flex-row gap-3">
          <button className="btn-primary " onClick={registerHandler}>
            Register
          </button>
          <button className="btn-secondary " onClick={unSubscribeHandler}>
            Unsubscribe
          </button>
        </div>
      </div>
      <div className="body">
        <div className="weather-form">
          <div className="input-container">
            <label>Enter a City Name</label>
            <input
              ref={inputRef}
              placeholder="E.g., New York, London. Tokyo"
              onInput={inputHandler}
              type="search"
            />
            <ul className="search-result">
              {citiesState &&
                citiesState.length > 0 &&
                citiesState.map((searchItem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        setSearchTextHandler({ city: searchItem.name })
                      }
                    >
                      {`${searchItem.name}, ${searchItem.country}`}
                    </li>
                  );
                })}
              {citiesState && citiesState.length === 0 && <div>No result</div>}
            </ul>
          </div>

          <button className="btn-primary" onClick={searchHandler}>
            Search
          </button>
          <div className="horizon">
            <hr />
            <span>or</span>
          </div>
          <button className="btn-secondary" onClick={useCurrentLocationHandler}>
            Use Current Location
          </button>
        </div>
        <div className="forecast-container">
          <div className="today-data">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="data">
              <p className="date">
                {forecastState?.todayData
                  ? `${forecastState.todayData.location} (${forecastState.todayData.date})`
                  : "CITY (YYYY-MM-DD)"}
              </p>
              <p>
                {`Temperature: ${
                  forecastState?.todayData ? forecastState.todayData.temp : 0
                }`}
                &deg;C
              </p>
              <p>
                {`Wind: ${
                  forecastState?.todayData ? forecastState.todayData.wind : 0
                } M/S`}
              </p>
              <p>
                {`Humidity: ${
                  forecastState?.todayData
                    ? forecastState.todayData.humidity
                    : 0
                }%`}
              </p>
            </div>
            <div className="icon">
              {forecastState?.todayData && (
                <img src={forecastState.todayData.icon} />
              )}
              <p>
                {forecastState?.todayData && forecastState.todayData.condition}
              </p>
            </div>
          </div>

          <p className="next-forecast-header">4-Day Forecast</p>
          {forecastState?.forecastData ? (
            <div className="next-day-data">
              <ul className="weather-container">
                {forecastState?.forecastData.length > 0
                  ? forecastState?.forecastData.map((forecastItem, index) => {
                      return <WeatherItem key={index} data={forecastItem} />;
                    })
                  : ""}
              </ul>
              {forecastState?.forecastData.length < 5 && (
                <button onClick={loadMoreHandler}>Load more</button>
              )}
            </div>
          ) : (
            <div className="w-100 fs-3 text-center p-2 fw-medium text-dark">
              No data
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
