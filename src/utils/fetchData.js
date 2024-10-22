// src/utils/fetchData.js

export const fetchData = async (setTickets, setUsers) => {
  try {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const data = await response.json();

    setTickets(data.tickets || []);
    const usersObject = data.users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
    setUsers(usersObject);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
