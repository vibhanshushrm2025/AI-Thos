import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [customInputVisible, setCustomInputVisible] = React.useState(false);
const [customValue, setCustomValue] = React.useState("u");

const handleDropdownChange = (event) => {
  if (event.target.value === "custom") {
    setCustomInputVisible(true);
  } else {
    setCustomInputVisible(false);
    console.log("slf");
    setCustomValue(event.target.value);
  }
};

const updateDropdownValue = () => {
  const dropdown = document.getElementById("dropdown");
  if (customValue && dropdown) {
    const customOption = dropdown.options[5]; // 6th option (index 5)
    customOption.text = customValue;
    customOption.value = customValue;
  }
};

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    console.log("a;sjf;sjd;",customValue);
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content,customValue);
    console.log(chatData);
    const newRes: Message = {role:"assistant",content:chatData};
    console.log(newMessage,newRes,"hello this is good");
    setChatMessages((prev)=>[...prev,newRes]);
    //
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#1f4f76",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {/* {auth?.user?.name.split(" ")[1][0]
            } */}
          </Avatar>
          <Typography sx={{ mx: "auto" , fontFamily: "Quicksand" }}>
            Please select the framework
          </Typography>
          <Box sx={{ mx: "auto", mt: 2, width: "100%", textAlign: "center" }}>
  <select
    id="dropdown"
    // value={customValue}
    style={{
      width: "90%", // Slightly smaller than the parent element
      maxWidth: "400px", // Optional: Set a maximum width for better control
      backgroundColor: "rgb(17,29,39)",
      color: "white",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid white",
      fontFamily: "Quicksand"
    }}
    onChange={(e) => handleDropdownChange(e)}
  >
    <option value="None" disabled>
      Select an option
    </option>
    <option value="u">Utilitarianism Ethics</option>
    <option value="d">Deontological Ethics</option>
    <option value="v">Virtue Ethics</option>
    <option value="h">Opportunistic Human </option>
    <option value="a">All Of The Above</option>
    <option value="custom">Custom Value</option>
  </select>

  {/* Conditional Text Input */}
  {customInputVisible && (
    <input
      type="text"
      placeholder="Enter custom value"
      value={customValue}
      onChange={(e) => setCustomValue(e.target.value)}
      onBlur={() => updateDropdownValue()}
      style={{
        marginTop: "10px",
        width: "90%", // Matches the dropdown width
        maxWidth: "400px", // Optional: Set a max width to align with the dropdown
        padding: "10px",
        fontSize: "14px",
        borderRadius: "5px",
        border: "1px solid white",
        backgroundColor: "rgb(17,29,39)",
        color: "white",
      }}
    />
  )}
</Box>
          <Typography sx={{ mx: "auto",  my: 4, p: 3 , fontFamily: "Quicksand" }}>
          AI-Thos: The AI-powered ethical engine that helps machines and humans think same.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "rgb(210, 3, 3)",
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          AI-Thos
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            fontFamily: "work sans",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
            fontFamily: "work sans",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
