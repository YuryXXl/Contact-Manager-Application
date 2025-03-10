export async function deleteTodo(todoId, userId) {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(
    `/api/todos/${todoId}?user_id=${userId}`,
    options
  );
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