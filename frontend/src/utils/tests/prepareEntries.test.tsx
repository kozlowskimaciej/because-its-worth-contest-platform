import * as api from "../../fakeApi/entries";
import { Entry } from "../../models/Entry";
import { prepareEntries } from "../prepareEntries";

describe("prepareEntries", () => {
  const expected: Entry[] = [
    {
      id: "1",
      author: {
        id: "5",
        firstName: "Elon",
        lastName: "Musk",
        phone: "123456789",
        email: "elon.musk@gmail.com",
        address: "Polna 2",
      },
      guardian: {
        firstName: "Joe",
        lastName: "Biden",
      },
      place: "none",
      submissionDate: new Date("2023-04-20T18:34:59.000Z"),
      files: [
        "https://img.freepik.com/darmowe-zdjecie/obraz-przedstawiajacy-gorskie-jezioro-z-gora-w-tle_188544-9126.jpg",
        "https://storage.googleapis.com/pod_public/1300/167870.jpg",
        "http://foundation.com/contests/13/poem1.pdf",
      ],
    },
    {
      id: "2",
      author: {
        id: "5",
        firstName: "Jan",
        lastName: "Kowalski",
        phone: null,
        email: null,
        address: null,
      },
      guardian: null,
      place: "laureat",
      submissionDate: new Date("2023-04-20T18:34:59.000Z"),
      files: [
        "https://www.creativefabrica.com/wp-content/uploads/2023/09/01/gothic-halloween-wallpaper-Graphics-78301352-1.jpg",
      ],
    },
  ];

  it("correctly transforms data", () => {
    const expectedResult = prepareEntries(api.entries);

    expect(expectedResult).toEqual(expected);
  });
});
