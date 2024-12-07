"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [longURL, setLongURL] = useState<string>("");
  const [shortURL, setShortURL] = useState<string>("");
  const [shortID, setShortID] = useState<string>("");
  const generateShortId = () => uuidv4().slice(0, 6);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const target: any = e.target;
    setLongURL(target.value as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longURL, shortID }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      const { shortUrl } = await response.json();
      setShortURL(shortUrl);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  useEffect(() => {
    const temp = generateShortId();
    setShortID(temp);
  }, []);

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <form className=" w-full px-96" onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-white sr-only dark:text-white"
        >
          Paste Your Link Here
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-globe-americas"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full outline-0 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Paste Your Link Here"
            required
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Convert
          </button>
        </div>
      </form>
      <h1 className="mt-10">Here is your Short URL : {shortURL}</h1>
    </div>
  );
};

export default HomePage;
