import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import Head from "next/head"; // Importing Head for managing document head
import Card from "../../components/Card"; // Importing Card component
import Image from "next/image"; // Importing Image component from Next.js

export default function Home() {
  const { currentUser } = useContext(UserContext); // Accessing current user information from context

  return (
    <>
      {/* Setting up document head with title, viewport meta tag, and favicon */}
      <Head>
        <title>Bad Bank Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Displaying a welcome message if a user is logged in */}
      {currentUser && (
        <div>
          <h5 style={{ paddingTop: "1.3rem", paddingLeft: "1.3rem" }}>
            Welcome back {currentUser.name}!
          </h5>
        </div>
      )}

      {/* Card component displaying information about the BadBank platform */}
      <Card
        txtcolor="black"
        header="BadBank Platform"
        title="Welcome to the bank"
        text="For all your banking needs."
        body={<Image src="/bank.png" alt="Responsive image" width={250} height={250} />}
      />
    </>
  );
}
