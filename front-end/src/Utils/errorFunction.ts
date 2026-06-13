export const serverErrorMessageFunc = (
  myCode: string,
  resourceType?: string,
) => {
  let message = "";
  if (myCode) {
    switch (myCode) {
      case "Too_many_request":
        message = `Too Many Requests`;
        break;
      case "validation_failed":
        message = `Validation Faild`;
        break;
      case "invalid_credentials":
        message = `invalid Credentials`;
        break;

      default:
        message = `Validation Faild`;
        break;
    }
  }
  return message;
};
