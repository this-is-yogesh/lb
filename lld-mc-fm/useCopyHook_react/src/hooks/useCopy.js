const useCopy = () => {
  const copy = async text => {
    if (!navigator.clipboard) /**1-- we use in-built navigator to copy  */
    {
      console.warn("clipboard is not enabled or available");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(`there was error copying text${error}`);
    }
  };
  return copy;
};

export default useCopy;
