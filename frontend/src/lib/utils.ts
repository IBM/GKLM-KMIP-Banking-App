import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(transaction: object, secretKey: string) {
  let encJson = CryptoJS.AES.encrypt(
    JSON.stringify(transaction),
    secretKey
  ).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
}

export function decrypt(transaction: string, secretKey: string) {
  let newExactString = transaction.replaceAll('"', "");
  let decData = CryptoJS.enc.Base64.parse(newExactString).toString(
    CryptoJS.enc.Utf8
  );
  let decrypted = CryptoJS.AES.decrypt(decData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decrypted);
}
export function getRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}
