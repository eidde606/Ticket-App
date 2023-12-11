import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/${_id}`, {
      cache: "no-store",
      mode: "cors",
    });
    if (!res.ok) {
      console.error(`Failed to fetch tickets. Status: ${res.status}`);
      throw new Error(`Failed to fetch tickets. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { tickets: [] };
  }
};

const Dashboard = async () => {
  try {
    const data = await getTickets();
    console.log("Fetched tickets:", data);

    // Ensure there are tickets
    const tickets = data.length ? data : data?.tickets || [];

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
