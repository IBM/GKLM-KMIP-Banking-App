"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { getRandomLetter } from "@/lib/utils";

export const KeyContext = createContext<{
  key: string;
  updateKey: (newKey: string) => void;
}>({
  key: "",
  updateKey: () => {},
});

export const KeyProvider = ({ children }: { children: React.ReactNode }) => {
  const [key, setKey] = useState<string>("");

  const updateKey = (newKey: string) => {
    setKey(newKey);
    localStorage.setItem("key", newKey);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem("key");
    if (storedKey) {
      setKey(storedKey);
    } else {
      axios
        .post("/api/create-key", {
          key_name: getRandomLetter() + getRandomLetter() + getRandomLetter(),
        })
        .then((res) => {
          console.log(res.data.key_id);
          updateKey(res.data.key_id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <KeyContext.Provider value={{ key, updateKey }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useKey = () => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error("useStringKey must be used within a StringKeyProvider");
  }
  return context;
};
