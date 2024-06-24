import { dateFormatted } from "../helpers/date-helper";

describe("dateFormatted", () => {
  it("should format the date correctly when given a valid date string", () => {
    const inputDate = "Thu, 15 Feb 2024 13:50:47 GMT";
    const expectedOutput = "2/15/2024";
    const formattedDate = dateFormatted(inputDate);

    expect(formattedDate).toBe(expectedOutput);
  });

  it("should return undefined when given an invalid date string", () => {
    const inputDate = "invalid-date";
    const formattedDate = dateFormatted(inputDate);

    expect(formattedDate).toBe("");
  });
});
