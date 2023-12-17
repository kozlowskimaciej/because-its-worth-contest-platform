import * as api from "../../fakeApi/entries";
import { Entry } from "../../models/Entry";
import { prepareEntries } from "../prepareEntries";

describe("prepareEntries", () => {
  const expected: Entry[] = [
    {
      id: "657ef4a4c4d16a709a994e1f",
      author: {
        firstName: "Elon",
        lastName: "Musk",
        phone: "694202137",
        email: "someemail@email.com",
        address: "Starbase, Texas",
      },
      guardian: {
        firstName: "Nie",
        lastName: "istnieje",
      },
      place: "none",
      submissionDate: new Date("2023-12-17T13:16:20.107Z"),
      files: [],
      contestID: "657ed098a5ba96cfdd2b3d42",
    },
    {
      id: "657ef4dbc4d16a709a994e20",
      author: {
        firstName: "Elon",
        lastName: "Musk",
        phone: "694202137",
        email: "someemail@email.com",
        address: "Starbase, Texas",
      },
      guardian: {
        firstName: "Nie",
        lastName: "istnieje",
      },
      place: "none",
      submissionDate: new Date("2023-12-17T13:17:15.961Z"),
      files: [],
      contestID: "657ed098a5ba96cfdd2b3d42",
    },
  ];

  it("correctly transforms data", () => {
    const expectedResult = prepareEntries(api.entries);

    expect(expectedResult).toEqual(expected);
  });
});
