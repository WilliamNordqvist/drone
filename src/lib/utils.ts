import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function uuid() {
  let counter = 0;
  counter = (counter + 1) % 100000; // Increment the counter and keep it under 100,000
  const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99,999

  // Combine the counter and random number to create a unique ID
  return counter * 100000 + randomNumber;
}
