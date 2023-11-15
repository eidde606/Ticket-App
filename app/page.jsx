import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    console.log("Fetching tickets...");
    const res = await fetch(
      `https://api-ticket-54ababcdb63f.herokuapp.com/api/Tickets/${ticket._id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch tickets. Status: ${res.status}`);
      throw new Error(`Failed to fetch tickets. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched tickets:", data);

    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { tickets: [] };
  }
};

const Dashboard = async () => {
  try {
    const data = await getTickets();

    // Ensure there are tickets
    const tickets = data?.tickets || [];

    if (tickets.length === 0) {
      return <p>No tickets.</p>;
    }

    const uniqueCategories = Array.from(
      new Set(tickets.map(({ category }) => category))
    );

    return (
      <div className="p-5">
        <div>
          {uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Dashboard:", error);
    return <p>Error loading topics.</p>;
  }
};

export default Dashboard;
