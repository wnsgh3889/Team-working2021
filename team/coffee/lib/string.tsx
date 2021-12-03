const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const dataUrlToFile = async (
  dataUrl: string,
  fileName: string,
  type: string
): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type });
};

export { getTimeString, dataUrlToFile };
