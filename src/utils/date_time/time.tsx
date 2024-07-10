import { useState, useEffect } from "react";

function TimeLocale() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 999);

    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return <span>{formattedTime}</span>;
}

export default TimeLocale;
