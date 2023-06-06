"use client";

import { useState } from "react";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="phoneNumber">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            name="phoneNumber"
            type="text"
            placeholder="(222)-222-2222"
            className="input input-bordered w-full max-w-xs"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <button className="btn btn-wide my-4">Submit</button>
      </form>
    </main>
  );
}
