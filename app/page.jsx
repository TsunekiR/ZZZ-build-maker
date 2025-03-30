"use client"; // This is a client-side only module

import React from "react";
import { CurrentCharProvider } from "@/contexts/CurrentCharContext";
import CharBuilder from "@/components/page/CharBuilder";

export default function Home() {
    return (
        <CurrentCharProvider>
            <CharBuilder />
        </CurrentCharProvider>
  );
}
