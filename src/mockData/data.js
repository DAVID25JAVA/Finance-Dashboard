import { v4 as uuidv4 } from "uuid";

export const transactionsData = [
  {
    id: uuidv4(),
    title: "Salary",
    amount: 5000,
    category: "Income",
    type: "income",
    date: "2024-01-15",
  },
  {
    id: uuidv4(),
    title: "Groceries",
    amount: -200,
    category: "Food",
    type: "expense",
    date: "2024-01-16",
  },
  {
    id: uuidv4(),
    title: "Shopping",
    amount: -500,
    category: "Shopping",
    type: "expense",
    date: "2024-01-17",
  },
  {
    id: uuidv4(),
    title: "Freelance",
    amount: 1200,
    category: "Income",
    type: "income",
    date: "2024-01-18",
  },
  {
    id: uuidv4(),
    title: "Restaurant",
    amount: -75,
    category: "Food",
    type: "expense",
    date: "2024-01-19",
  },
  {
    id: uuidv4(),
    title: "Netflix",
    amount: -15,
    category: "Entertainment",
    type: "expense",
    date: "2024-01-20",
  },
];
