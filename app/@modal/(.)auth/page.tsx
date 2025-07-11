"use client";

import SignInModal from "@/src/components/Auth/SignIn";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function SignInPage() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="border rounded relative backdrop:bg-black/50"
      onClose={() => router.back()}
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        className="absolute text-red-600 text-lg font-bold top-2 right-4 border-none"
      >
        <p className="sr-only">close</p>
        &times;
      </button>

      <SignInModal />
    </dialog>
  );
}
