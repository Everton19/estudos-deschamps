function status(req, res) {
  res.status(200).json(
    {
      status: 'endpoint is working',
    }
  );
}

export default status;