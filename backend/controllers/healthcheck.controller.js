export const healthcheck = (req, res) => {
  res.status(200).json("health is fine");
}