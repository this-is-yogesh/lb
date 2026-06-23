1. navigator.clipboard.writeText() and navigator.clipboard.readText()
2.  it works because writeText and readText are fast apis
3. 
import { useState } from "react";

function useCopyHook() {
  const [copiedText, setCopiedText] = useState("");

  function copy(text) {
    if (!navigator?.clipboard) {
      alert("no clipboard found");
      return;
    }
    try {
      navigator.clipboard.writeText(text).then(() => {
        navigator.clipboard.readText().then(res => {
          setCopiedText(res);
        });
      });
    } catch (e) {}
  }

  return [copiedText, copy];
}

export default useCopyHook;
