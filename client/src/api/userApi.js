export async function createUser({ email }) {
  const response = await fetch(`http://localhost:8080/api/v1/user/`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData.data;
}

export async function sendOTP({ email }) {
  const response = await fetch(`http://localhost:8080/api/v1/user/send-otp`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData.data;
}

export async function checkOTP({ email, code }) {
  const response = await fetch(`http://localhost:8080/api/v1/user/check-otp`, {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData.data;
}

export async function updateCity({ email, city }) {
  const response = await fetch(`http://localhost:8080/api/v1/user`, {
    method: "PUT",
    body: JSON.stringify({ email, city }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData;
}

export async function findUserByEmail({ email }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/user?email=${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData.data;
}

export async function deleteUser({ email }) {
  const response = await fetch(`http://localhost:8080/api/v1/user`, {
    method: "DELETE",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occur");
  }

  const resData = await response.json();
  return resData;
}
