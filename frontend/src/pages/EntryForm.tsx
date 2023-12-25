import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { prepareSingleContest } from "../utils/prepareContests";
import EntryFormContent from "../components/EntryForm/EntryFormContent";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import PrintButton from "../components/EntryForm/PrintButton";
import EntryFormContextProvider, {
  useEntryFormContext,
} from "../contexts/EntryFormContext";
import SuccessfulSubmission from "../components/EntryForm/SuccessfulSubmission";
import { Contest } from "../models/Contest";

export default function EntryForm() {
  const { id } = useParams();

  const { data, error, isLoading } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  if (isLoading) return <Loading text="" />;
  if (error)
    return (
      <NotFoundInfo
        text="Podany konkurs nie istnieje. Sprawdź czy wpisałeś poprawny link."
        isDisplayingButton={false}
      />
    );

  const contest = prepareSingleContest(data.data);

  if (contest.deadline < new Date()) {
    return (
      <NotFoundInfo
        text="Termin zgłaszania upłynął. Nie możesz już wysłać swojej pracy."
        isDisplayingButton={false}
      />
    );
  }

  return (
    <EntryFormContextProvider>
      <EntryFormPageInner contest={contest} />
    </EntryFormContextProvider>
  );
}

const EntryFormPageInner = ({ contest }: { contest: Contest }) => {
  const { hasSuccessfullySubmitted } = useEntryFormContext();

  if (hasSuccessfullySubmitted) return <SuccessfulSubmission />;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <EntryFormContent contest={contest} />
      <PrintButton />
    </div>
  );
};
