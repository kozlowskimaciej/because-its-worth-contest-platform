export const entries = {
  data: [
    {
      id: "1",
      type: "entries",
      attributes: {
        author: {
          attributes: {
            firstName: "Elon",
            lastName: "Musk",
            phone: "123456789",
            email: "elon.musk@gmail.com",
            address: "Polna 2",
          },
        },
        guardian: {
          firstName: "Joe",
          lastName: "Biden",
        },
        place: "none",
        submissionDate: "2023-04-20T18:34:59.000Z",
        files: [
          {
            type: "image",
            src: "https://img.freepik.com/darmowe-zdjecie/obraz-przedstawiajacy-gorskie-jezioro-z-gora-w-tle_188544-9126.jpg",
          },
          {
            type: "video",
            src: "https://storage.googleapis.com/pod_public/1300/167870.jpg",
          },
          {
            type: "other",
            src: "http://foundation.com/contests/13/poem1.pdf",
          },
        ],
      },
      relationships: {
        contest: {
          data: {
            id: "71cd5578-13f1-41b0-bd5b-709fcdc40589",
            type: "contests",
          },
        },
      },
    },
    {
      id: "2",
      type: "entries",
      attributes: {
        author: {
          attributes: {
            firstName: "Jan",
            lastName: "Kowalski",
            phone: null,
            email: null,
            address: null,
          },
        },
        guardian: null,
        place: "laureat",
        submissionDate: "2023-04-20T18:34:59.000Z",
        files: [
          {
            type: "image",
            src: "https://www.creativefabrica.com/wp-content/uploads/2023/09/01/gothic-halloween-wallpaper-Graphics-78301352-1.jpg",
          },
        ],
      },
      relationships: {
        contest: {
          data: {
            id: "620bf3e3-84f4-435c-8752-8cd18c5aaf3e",
            type: "contests",
          },
        },
      },
    },
  ],
};
