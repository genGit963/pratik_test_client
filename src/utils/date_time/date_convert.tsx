import React from "react";
interface DateStringInterface {
  date_string: string;
}
const DateConverter: React.FC<DateStringInterface> = ({
  date_string,
}: DateStringInterface) => {
  const date: Date = new Date(date_string);
  return <span>{date.toLocaleString()}</span>;
};

export default DateConverter;
