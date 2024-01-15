const addUser = async (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  const response = await fetch('https://datenest.herokuapp.com/user', requestOptions)
  const body = await response.json()

  return body
};


const getUser = async (deviceId) => {
  const requestOptions = {
    method: 'GET',
    Accept: 'application/json, text/plain, */*',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    console.log("fetching")
    const response = await fetch(`https://datenest.herokuapp.com/${deviceId}/user`, requestOptions)
    const body = await response.json()
    return body
  } catch (e) {
    console.log('Error', e)
  }
}


/*
* @return array of dates, which are objects
*/
const getMyDates = async (deviceId) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch(`https://datenest.herokuapp.com/${deviceId}/allmydates`, requestOptions)
  const body = await response.json()

  return body
}

/*
* Saves a date document, and adds it to a user 
* @return user with updated dates field
*/
const addDate = async (deviceId, date) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(date)
  };
  const response = await fetch(`https://datenest.herokuapp.com/${deviceId}/date`, requestOptions)
  const body = await response.json()

  console.log(body)

  return body
}

/*
* deletes a date
* @param date is an object that represents a date
* @return the deleted date
*/
const deleteDate = async (deviceId, date) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(date)
  };
  const response = await fetch(`https://datenest.herokuapp.com/${deviceId}/date`, requestOptions)
  const body = await response.json()
  return body
}


/*
* Updates the info of a date
* @return updated date
*/
const updateDate = async (date) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(date)
  };
  const response = await fetch(`https://datenest.herokuapp.com/date/update`, requestOptions)
  const body = await response.json()

  return body
}

export default {
  addUser,
  getUser,
  getMyDates,
  addDate,
  deleteDate,
  updateDate
};
