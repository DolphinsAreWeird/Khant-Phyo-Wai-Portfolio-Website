"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address is on screen to select.
      window.getSelection()?.selectAllChildren(document.getElementById("contact-email")!);
    }
  }

  return (
    <button type="button" className="button" onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
