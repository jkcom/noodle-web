export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Calculate expiration date

  const expires = `expires=${date.toUTCString()}`;
  const cookieValue = `${name}=${value}; ${expires}; path=/`;

  document.cookie = cookieValue;
};

// Example usage:
setCookie("myCookie", "cookieValue", 7); // Set a cookie named 'myCookie' with the value 'cookieValue' that expires in 7 days
