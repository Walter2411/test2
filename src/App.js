import moment from "moment";

function App() {
  const data = {
    start: "10:00",
    appointments: [
      {
        start: "10:45",
        duration: 45,
      },
      {
        start: "13:50",
        duration: 20,
      },
      {
        start: "16:50",
        duration: 20,
      },
    ],
    end: "18:00",
  };

  const result = [data.start];

  function increaseTime(time, increaseValue) {
    return moment(time, "HH:mm").add(increaseValue, "m");
  }

  function check(strDate, appointments) {
    let startDate = strDate;

    return function checkRange() {
      startDate = increaseTime(startDate, 45);

      if (startDate.isSameOrAfter(moment(appointments.start, "HH:mm"))) {
        result.length > 1 && result.pop();
        result.push(
          increaseTime(appointments.start, appointments.duration).format(
            "HH:mm"
          )
        );
        return;
      } else {
        result.push(startDate.format("HH:mm"));
      }

      checkRange();
    };
  }
  data.appointments.map((item) => {
    let schedule = check(result[result.length - 1], item);
    schedule();
  });

  return (
    <div className="App">
      {result.map((i, index) => (
        <div key={index}>{i}</div>
      ))}
    </div>
  );
}

export default App;
