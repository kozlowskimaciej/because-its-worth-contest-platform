import * as api from "../../fakeApi/contests";
import { Contest } from "../../models/Contest";
import { prepareContests } from "../prepareContests";

describe("prepareContests", () => {
  const expectedResult: Contest[] = [
    {
      id: "75a69632-9603-11ee-b9d1-0242ac120002",
      name: `Konkurs "Melodie Marzeń"`,
      description:
        "Twórz magiczną muzykę, która przeniesie słuchaczy w krainę marzeń. Niech dźwięki budują emocje i tworzą niezapomniane chwile.",
      category: "filmowy",
      entryCategories: ["grupa wiekowa 7 - 10", "grupa wiekowa 10 - 13"],
      published: true,
      deadline: new Date("2023-04-20T18:34:59.000Z"),
      termsAndConditions: ["http://url/regulamin.pdf", "http://url/zgoda.docx"],
      acceptedFileFormats: ["mp3", "mp4", "pdf", "docx"],
      background: "http://ydfItExists/image.png",
    },
    {
      id: "80f49100-feaf-4d8d-b88a-e2b99c9fb971",
      name: `Konkurs "Wzory Wyobraźni: Sztuka i Nauka Wspólnie"`,
      description: `W "Wzorach Wyobraźni" łączymy siły sztuki i nauki, aby odkryć nieznane obszary kreatywności. Zapraszamy artystów, naukowców i wszystkich, którzy pragną zanurzyć się w fascynującym świecie współpracy między sztuką a nauką. Twoim zadaniem jest stworzyć dzieło, które odzwierciedli inspirację, jaką czerpiesz z najnowszych osiągnięć naukowych. Przeżyj ekscytującą podróż, eksplorując granice wyobraźni i przyczyniając się do dialogu między dwoma dziedzinami, które na pozór są odległe, a jednak mogą razem otworzyć nowe horyzonty twórczości.`,
      category: "literacki",
      entryCategories: ["grupa wiekowa 7 - 10", "grupa wiekowa 10 - 13"],
      published: false,
      deadline: new Date("2023-04-20T18:34:59.000Z"),
      termsAndConditions: ["http://url/regulamin.docx"],
      acceptedFileFormats: ["png", "jpg", "jpeg"],
      background: "http://justY/image.jpg",
    },
    {
      id: "71cd5578-13f1-41b0-bd5b-709fcdc40589",
      name: `Konkurs "Artystyczna Wizja"`,
      description:
        "Wyraź swoją artystyczną wizję poprzez dowolne medium. Odkryj piękno w kolorach i formach!",
      category: "filmowy",
      entryCategories: ["grupa wiekowa 7 - 10", "grupa wiekowa 10 - 13"],
      published: true,
      deadline: new Date("2023-12-15T18:34:59.000Z"),
      termsAndConditions: ["http://localhost:8000/static_files/regulamin.pdf"],
      acceptedFileFormats: ["mp3", "mp4", "pdf", "docx"],
      background: "http://ydfItExists/image.png",
    },
    {
      id: "620bf3e3-84f4-435c-8752-8cd18c5aaf3e",
      name: `Konkurs "Podróże w Czasie Literackie"`,
      description:
        "Przenieś się w czasie poprzez literaturę! Stwórz opowieść, która zabierze czytelników w niezwykłą podróż przez epoki i światy wyobraźni.",
      category: "fotograficzny",
      entryCategories: ["grupa wiekowa 7 - 10"],
      published: false,
      deadline: new Date("2024-04-20T18:34:59.000Z"),
      termsAndConditions: ["http://url/regulamin.docx"],
      acceptedFileFormats: ["png", "jpg", "jpeg"],
      background: "http://justY/image.jpg",
    },
  ];

  it("correctly transforms data", () => {
    const result = prepareContests(api.contests);

    expect(result).toEqual(expectedResult);
  });
});
