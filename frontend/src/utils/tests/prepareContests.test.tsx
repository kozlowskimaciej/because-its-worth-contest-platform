import * as api from "../../fakeApi/contests";
import { Contest } from "../../models/Contest";
import { prepareContests } from "../prepareContests";

describe("prepareContests", () => {
  const expectedResult: Contest[] = [
    {
      id: "657e1e85d9a591885cd7a032",
      name: `Test Contest`,
      description: "This is a test contest.",
      category: "Test",
      entryCategories: ["foo", "boo", "bar"],
      published: true,
      deadline: new Date("2021-09-01T00:00:00Z"),
      termsAndConditions: [
        "https://foo.bar/static/contest-terms1.jpg",
        "https://foo.bar/static/contest-terms2.jpg",
      ],
      acceptedFileFormats: ["jpg", "png"],
      background: "https://foo.bar/static/contest-background.jpg",
    },
    {
      id: "657e2152d9a591885cd7a033",
      name: `Test Contest`,
      description: "This is a test contest.",
      category: "Test",
      entryCategories: ["foo", "boo", "bar"],
      published: true,
      deadline: new Date("2021-09-01T00:00:00Z"),
      termsAndConditions: [
        "https://foo.bar/static/contest-terms1.jpg",
        "https://foo.bar/static/contest-terms2.jpg",
      ],
      acceptedFileFormats: ["jpg", "png"],
      background: "https://foo.bar/static/contest-background.jpg",
    },
  ];

  it("correctly transforms data", () => {
    const result = prepareContests(api.contests);

    expect(result).toEqual(expectedResult);
  });
});
