export async function deleteContact(contactId, userId) {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(
    `/api//user/contacts/${contactId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function updateContact(contactId, userId, updatedData) {
  const response = await fetch(`/api/user/contacts/${contactId}?user_id=${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function fetchUserByEmail(email) {
  const options = { headers: { 'X-Secret-Token': 'qwerty' } };
  const response = await fetch(`/api/users/email/${email}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function createNewUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const response = await fetch('/api/users', options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function addContact(userId, contactData) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, ...contactData }),
  };
  const response = await fetch(`/api/user/contacts`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function fetchContacts(userId) {
  const response = await fetch(`/api/user/contacts?user_id=${userId}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function addToFavorites(userId, contactId) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, contact_id: contactId }),
  };
  const response = await fetch(`/api/user/contacts/favorites`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function deleteFromFavorites(userId, contactId) {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(
    `/api/user/contacts/favorites/${contactId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}