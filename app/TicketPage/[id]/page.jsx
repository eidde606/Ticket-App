const TicketPage = ({ ticket }) => {};

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

      updateTicketData = await res.json();
      updateTicketData = updateTicketData.foundTicket;
    } catch (error) {
      console.error("Error fetching ticket:", error);
      // Handle the error appropriately
    }
  }

  return { ticket: updateTicketData };
};

export default TicketPage;
