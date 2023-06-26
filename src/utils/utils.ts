export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year} ${formattedTime}`;

  return formattedDate;
}

export const validateForm = (
  title: string,
  description: string,
  email: string,
  phone: string
) => {
  if (!title.trim()) {
    alert("Please enter a title");
    return false;
  }

  if (!description.trim()) {
    alert("Please enter a description");
    return false;
  }

  if (!email.trim()) {
    alert("Please enter an email");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    alert("Please enter a valid email");
    return false;
  }

  if (!phone.trim()) {
    alert("Please enter a phone number");
    return false;
  }
  return true;
};
