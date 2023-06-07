"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import logo from "@/public/logo.svg";

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
    <main className="flex min-h-screen flex-col items-center p-8 lg:p-12">
      <Toaster position="top-center" />
      <section className="mb-8 flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-center sr-only">
          Template Twilio Verification Next.js
        </h1>
        <a
          className="block mx-auto my-8"
          href="https://cameronyoungblood.com"
          target="_blank"
        >
          <Image src={logo} alt="logo" width={150} height={150}></Image>
        </a>
        <h2 className="text-xl max-w-screen-sm text-center">
          A generic Twilio Verification Template using Next JS, Twilio, DaisyUI,
          and Toast by Sonner. Created by Bridger Tower and Cameron Youngblood.
        </h2>
      </section>
      <div className="flex gap-4 mb-12 items-center justify-center">
        <a
          className="border-b-2 hover:opacity-75"
          href="https://github.com/by9d8/twilio-next-template"
          target="_blank"
        >
          See the Repo on GitHub
        </a>
        <a
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fby9d8%2Ftwilio-next-template&env=TWILIO_SID,TWILIO_AUTH_TOKEN,VERIFICATION_SID"
          target="_blank"
        >
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a>
      </div>
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
          <h1 className="text-6xl mt-16">👍</h1>
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
