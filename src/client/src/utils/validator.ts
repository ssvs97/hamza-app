export const validateRespone = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const isDate = (date: string) => {
  return date.match(/[0-9]+-[0-9]+-[0-9]+/);
};

export const validateInput = (input: string, textArea: string = "default") => {
  if (!input) throw Error("Account ID Field Required!");

  if (!+input) throw Error("Account ID Accepts Only Numbers!");

  if (!textArea) throw Error("Textarea Field Required!");
};
