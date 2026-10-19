import { BOOK_CALL_URL } from "../links";
import { SplitCard } from "../page-kit/split-card";
import { CallAgenda } from "../page-kit/visuals";

/** "Who do I talk to on the call?" from the copy doc's FAQ, as iClosed's
 * onboarding card. */
export function AttorneyCall() {
  return (
    <SplitCard
      eyebrow="Book a call"
      heading="Talk to a licensed attorney, not a sales rep"
      body={
        <p>
          The call is with a licensed attorney on our team. On the call you will see our ads, our
          landing pages, our intake questions, and the names of firms we work with.
        </p>
      }
      cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      visual={<CallAgenda />}
    />
  );
}
