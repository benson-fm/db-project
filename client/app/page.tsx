"use client";

import React, { useState, useEffect } from "react";
import {
  fetchBoardMembers,
  addBoardMember,
  removeBoardMember,
  updateBoard,
} from "./firebase";

interface BoardMember {
  name: string;
  id: string;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  const [nameDelete, setNameDelete] = useState("");
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);

  const handleAddMember = async () => {
    if (name) {
      try {
        await addBoardMember({ name });
        // setBoardMembers((prevMembers) => [
        //   ...prevMembers,
        //   { id: docRef.id, name },
        // ]);
        setName("");
        await handleUpdateBoard();

      } catch (error) {
        console.error("Error adding board member:", error);
      }
    }
  };

  const handleDeleteMember = async (name: string) => {
    try {
      await removeBoardMember(name);
      setName("");
      await handleUpdateBoard();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBoard = () => {
    updateBoard()
    .then((boardMembers: BoardMember[]) => setBoardMembers(boardMembers))
    .catch((error) => console.error("Error fetching baord members: ", error));
  }

  useEffect(() => {
    handleUpdateBoard();
  }, []);



  return (
    <div>
      <h1>Board Members</h1>
      <ul>
        {boardMembers.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add Member"
        className="text-black"
      />
      <button onClick={handleAddMember}>Add Board Member</button>

      <input
        value={nameDelete}
        onChange={(e) => setNameDelete(e.target.value)}
        placeholder="Delete Member"
        className={"text-black"}
      />
      <button onClick={() => handleDeleteMember(nameDelete)}>
        Delete Member
      </button>
    </div>
  );
}
