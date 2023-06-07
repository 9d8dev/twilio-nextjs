"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [twilioCode, setTwilioCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [verified, setVerified] = useState(false);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleTwilioCodeChange = (e) => {
    const formattedTwilioCode = formatTwilioCode(e.target.value);
    setTwilioCode(formattedTwilioCode);
  };

  const handlePhoneNumberSubmit = async (e) => {
    try {
      e.preventDefault();
      const cleanedNumber = cleanPhoneNumber(phoneNumber);
      const promise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(
            `/api/twilio?phoneNumber=${encodeURIComponent(cleanedNumber)}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });

      toast.promise(promise, {
        loading: "Sending code to phone.",
        success: (data) => {
          return "Please check your phone for a code.";
        },
        error: "Something went wrong.",
      });

      const data = await promise;
      setVisible(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleTwilioCodeSubmit = async (e) => {
    try {
      e.preventDefault();
      const cleanedCode = cleanTwilioCode(twilioCode);
      const cleanedNumber = cleanPhoneNumber(phoneNumber);
      const promise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`/api/twilio`, {
            method: "POST",
            body: JSON.stringify({
              code: cleanedCode,
              phoneNumber: cleanedNumber,
            }),
          });
          const data = await response.json();
          resolve(data);
          setVerified(true);
        } catch (error) {
          reject(error);
        }
      });

      toast.promise(promise, {
        loading: "Verifying code ...",
        success: (data) => {
          return "Successfully verified.";
        },
        error: "Invalid code. Please try again.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 lg:p-24">
      <Toaster position="top-center" />
      {!verified ? (
        <div className={styles.neu}>
          <div className="w-max">
            {!visible ? (
              <form onSubmit={handlePhoneNumberSubmit}>
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="phoneNumber">
                    <span className="label-text uppercase">Phone Number</span>
                  </label>
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="(222)-222-2222"
                    className="input input-bordered w-full max-w-xs"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required={!visible}
                  />
                </div>
                <button className="btn btn-wide my-4">Submit</button>
              </form>
            ) : (
              <form onSubmit={handleTwilioCodeSubmit}>
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor="twilioCode">
                    <span className="label-text uppercase">
                      Verification Code
                    </span>
                  </label>
                  <input
                    name="twilioCode"
                    type="text"
                    placeholder="222-222"
                    className="input input-bordered w-full max-w-xs"
                    required={visible}
                    value={twilioCode}
                    onChange={handleTwilioCodeChange}
                  />
                </div>
                <button className="btn btn-wide my-4">Submit</button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-6xl mt-32">👍</h1>
        </>
      )}
    </main>
  );
}

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

function cleanPhoneNumber(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  const formattedNumber = "+1" + cleanedNumber;
  return formattedNumber;
}

function formatTwilioCode(value) {
  if (!value) return value;
  const code = value.replace(/[^\d]/g, "");
  const codeLength = code.length;
  if (codeLength < 4) {
    return code;
  } else {
    return `${code.slice(0, 3)}-${code.slice(3, 6)}`;
  }
}

function cleanTwilioCode(code) {
  const cleanedCode = code.replace(/\D/g, "");
  return cleanedCode;
}
