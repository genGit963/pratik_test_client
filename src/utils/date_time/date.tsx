import React, { useEffect, useState } from "react";

const DateLocale: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const continueClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    continueClock();
  }, []);

  return <span>{date.toDateString()}</span>;
};

export default DateLocale;
