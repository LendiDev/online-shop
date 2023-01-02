const getSessionData = (req) => {
  let sessionData = req.session.flashedData;

  if (!sessionData) {
    sessionData = {
      errorMessage: '',
      enteredData: {
        email: '',
      }
    }
  }

  req.session.flashedData = null;

  return sessionData;
}

const flashDataToSession = (req, data, action) => {
  req.session.flashedData = data;
  req.session.save(action);
}

module.exports = {
  getSessionData,
  flashDataToSession
}