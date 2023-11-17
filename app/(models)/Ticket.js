// mongoose.connect(process.env.MONGODB_URI);
// mongoose.Promise = global.Promise;
// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected successfully");
// });
const ticketSchema = {
  title: String,
  description: String,
  category: String,
  priority: Number,
  progress: Number,
  status: String,
  active: Boolean,
};

export default ticketSchema;
