"use client";

import React, { useState, useEffect } from "react";
import { addBoardMember, removeBoardMember, updateBoard, updateBoardMember } from "./firebase";

interface BoardMember {
  name: string;
  id: string;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  const [nameDelete, setNameDelete] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);

  const handleAddMember = async () => {
    if (name) {
      try {
        await addBoardMember({ name });
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

  const handleUpdateName = async (name: string, nameUpdate: string) => {
    try {
      await updateBoardMember(name, nameUpdate);
      setName("")
      await handleUpdateBoard();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateBoard = () => {
    updateBoard()
      .then((boardMembers: BoardMember[]) => setBoardMembers(boardMembers))
      .catch((error) => console.error("Error fetching baord members: ", error));
  };

  const handleClear = () => {
    setNameDelete("");
    setName("");
    setNameUpdate("");
  };

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
      <button
        onClick={() => {
          handleAddMember();
          handleClear();
        }}
      >
        Add Board Member
      </button>

      <input
        value={nameDelete}
        onChange={(e) => setNameDelete(e.target.value)}
        placeholder="Delete Member"
        className={"text-black"}
      />
      <button
        onClick={() => {
          handleDeleteMember(nameDelete);
          handleClear();
        }}
      >
        Delete Member
      </button>

      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Update Current Member"
        className={"text-black"}
        />
      <input 
        value={nameUpdate}
        onChange={(e) => setNameUpdate(e.target.value)}
        placeholder="New Name"
        className={"text-black"}
        />
      <button 
      onClick={() => {
        handleUpdateName(name, nameUpdate);
        handleClear();
      }}>
        Update Member
      </button>
    </div>
  );
}
