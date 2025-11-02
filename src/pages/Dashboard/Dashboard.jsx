import { useAuth } from "react-oidc-context";
import { useLogout } from "../../../hooks/useLogout";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const auth = useAuth();
  const { signOutRedirect } = useLogout();
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (auth.user) {
      getEntries();
    }
  }, [auth.user, isAdded]);

  const getEntries = async () => {
    const url = `${import.meta.env.VITE_API_GATEWAY}/items?userId=${
      auth.user?.profile?.sub
    }`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => setEntries(data))
      .catch((err) => console.error(err));
  };

  const addEntry = () => {
    setEntry("");
    const url = `${import.meta.env.VITE_API_GATEWAY}/items`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        userId: auth.user?.profile?.sub,
        entryId: `entry-id-${Math.floor(Math.random() * 1000000000000000)}`,
        item: entry,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        setIsAdded(!isAdded);
        return res.json();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>dashboard:</h2>
      <pre>Hello: {auth.user?.profile.email} </pre>

      <button onClick={() => signOutRedirect()}>logout</button>

      <div>
        <input
          type="text"
          placeholder="entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>

      <div>
        <h2>entries:</h2>
        {entries.map((entry, index) => {
          return (
            <pre key={entry.entryId}>
              <div>#{index+1}</div>
              <div>Entry ID: {entry.entryId}</div>
              <div>User ID: {entry.userId}</div>
              <div>Created at: {entry.createdAt}</div>
              <div>Entry: {entry.item}</div>
            </pre>
          );
        })}
      </div>
    </>
  );
};
