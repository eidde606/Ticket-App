import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (_id) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/${_id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to get ticket. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching tickets: ${error.message}`);
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
