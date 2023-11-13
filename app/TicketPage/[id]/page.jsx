import TicketForm from "@/app/(components)/TicketForm";

const baseUrl = "https://api-ticket-54ababcdb63f.herokuapp.com";

const TicketPage = ({ ticket }) => {
  return <TicketForm ticket={ticket} />;
};

TicketPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  const EDITMODE = id !== "new";

  let updateTicketData = {};

  if (EDITMODE) {
    try {
      const res = await fetch(`${baseUrl}/api/Tickets/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to get ticket. Status: ${res.status}`);
      }

      const data = await res.json();
      updateTicketData = data.foundTicket;
    } catch (error) {
      console.error("Error fetching ticket:", error);
      // Handle the error appropriately
    }
  }

  return { ticket: updateTicketData };
};

export default TicketPage;
