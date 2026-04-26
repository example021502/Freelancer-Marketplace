import React, { useEffect, useState } from "react";
import Label from "../../common/Label";
import { get_user_data } from "../../utils/backend_calls_functions";
import { showError, showWarning } from "../../utils/toastfy_notifications";
import Icon from "../../common/Icon";
import Textarea from "../../common/Textarea";
import api from "../../utils/api_interceptor";
import { useQuery } from "@tanstack/react-query";
import { load_messages } from "./messages_api";

function Messages() {
  // setting the local chtat messages
  const [chats_messages, setChatMessages] = useState([]);
  const [chats_profiles, setChat_profiles] = useState([]);
  // setUser data
  const [user, setuser] = useState({});
  // laoding reusable function
  const loading = () => {
    return (
      <div className="w-full h-full flex items-center justify-center font-semibold text-xl">
        <Label text={"Loading..."} />
      </div>
    );
  };

  // getting the chat profiles first
  const get_chats_profiles = async (user_id) => {
    const profiles = await api.get(
      `/get/chat_profiles?connectedTo=${encodeURIComponent(user_id)}`,
    );
  };

  // using use query to extract the chat profiles
  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useQuery({
    queryKey: "chatProfiles",
    queryFn: get_chats_profiles(user?.id),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    enabled: !!user?.id,
  });

  // setting the data
  if (usersData) {
    setChat_profiles(usersData);
  }

  // handling error
  if (usersError) return showError(`Error: ${usersError}`);

  // handling loading
  if (isLoading) return loading();

  // tracking the recipient information
  const [otherId, setOtherId] = useState({
    id: "",
    username: "",
    lastActive: "",
  });

  // tracking which users to show on chat environment
  const [users, setUsers] = useState({
    sender_id: null,
    receiver_id: null,
  });

  // getting the user information
  const get_user = async () => {
    const user = await get_user_data();
    if (!user) return showError("User failed to load!");
    return setUser(user);
  };

  // useEffect loader: on loading the component
  useEffect(() => {
    get_user();
  }, []);

  // setting up the target person information for chatting
  const handleOpenMessages = async (profile) => {
    const sender_id = user.id;
    const receiver_id = profile.id;
    setUsers({
      sender_id: sender_id,
      receiver_id: receiver_id,
    });
    setChattingOpen(true);
  };

  // loading chats messages
  const {
    data: chatsData,
    isLoading: chatsIsLoading,
    error: chatsError,
  } = useQuery({
    query: "chats",
    queryFn: load_messages(users?.sender_id, users?.receiver_id),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    enabled: !!users?.sender_id && !!users?.receiver_id,
  });

  // checking if the chat messages are loaded
  if (chatsData) {
    setChatMessages(chatsData);
  }

  // checking if there is an error for loading chats messages
  if (chatsError) return showError(`Error: ${chatsError}`);

  // checking if the chat messages are still being loaded
  if (chatsIsLoading) return loading();

  // new chat temporary
  const [newChat, setNewChat] = useState({
    sender_id: "sender",
    receiver_id: "receiver",
    message: "",
    date: new Date().toLocaleString(),
  });
  // opening and closing the chat environment
  const [chattingOpen, setChattingOpen] = useState(false);

  // handle sending the chat
  const handleSending = () => {
    if (newChat.message === "") return showInfo("Type something to send");
    setChatMessages((prev) => [...prev, newChat]);
    setNewChat((prev) => ({ ...prev, message: "" }));
  };

  // inserting a new chat message
  const handlechatting = (chat, id) => {
    setNewChat((prev) => ({ ...prev, message: chat }));
  };

  return (
    <div className="w-full h-full flex flex-row items-start justify-start gap-2">
      <div className="max-w-64 h-full rounded-xl w-full flex border border-gray-200 flex-col items-start px-4 py-2 justify-start">
        <Label
          text={"Chats"}
          class_name={
            "text-[1.5em] border-b border-gray-200 py-1 my-2 font-bold text-gray-800"
          }
        />
        <div
          aria-label="chat-users"
          className="h-full w-full flex flex-col items-start justify-start gap-4"
        >
          {chats_profiles.map((profile, i) => {
            return (
              <div
                onClick={() => handleOpenMessages(profile)}
                key={`chat-${i}`}
                className="flex p-2 cursor-pointer hover:bg-gray-200/50 hover:scale-[1.02] transition-all ease-in-out duration-150 rounded-xl bg-gray-100 w-full border border-gray-200 shadow-sm tracking-wide flex-row items-start justify-start gap-2"
              >
                <Icon
                  icon={profile.icon}
                  class_name={
                    "font-semibold text-lg border border-gray-200 shadow-sm p-2 rounded-full w-10 h-10 flex items-center justify-center"
                  }
                />
                <div className="flex flex-col items-start justify-start">
                  <Label
                    text={profile.username}
                    class_name={`font-semibold text-lg`}
                  />
                  <Label
                    text={profile.about}
                    class_name={`font-light text-sm`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {chattingOpen ? (
        <div
          className={`flex h-full gap-4  overflow-y-auto no-scrollbar flex-1 flex-col items-start justify-start border border-gray-200 rounded-xl`}
        >
          <div className="w-full flex border-b border-gray-300 flex-row p-4 items-center justify-start gap-4">
            <Icon
              icon={"ri-user-line"}
              class_name={
                "w-12 h-12 border text-2xl flex items-center justify-center rounded-full"
              }
            />
            <Label text={otherId.username} />
            <Label
              text={otherId.lastActive}
              class_name={"ml-auto opacity-60"}
            />
          </div>
          <div
            className={
              "w-full h-full gap-4 p-4 pt-0 flex flex-col items-start justify-start"
            }
          >
            {chats_messages.map((message, i) => {
              const isMe = message.sender_id === "sender";
              return (
                <div
                  className={`p-2 rounded-xl shadow-md text-white cursor-pointer ${isMe ? "ml-auto bg-green-600 rounded-tl-none" : "mr-auto bg-blue-600 rounded-tr-none"}`}
                >
                  <Label
                    class_name={`font-lighter text-sm`}
                    text={message.message}
                  />
                </div>
              );
            })}
            <div
              className={
                "w-full flex flex-row items-center justify-center relative mt-auto"
              }
            >
              <Textarea
                value={newChat.message}
                id={"chat"}
                handleInputChange={handlechatting}
                placeholder={`Start chatting with ${otherId.username}`}
                class_name={
                  "flex-1 border border-gray-200 shadow-sm rounded-xl p-3 pr-6"
                }
              />
              <span
                onClick={handleSending}
                className="font-light text-4xl p-2 rounded-full hover:border flex items-center justify-center absolute top-3 right-3"
              >
                <Icon icon={"ri-send-ins-fill"} />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-1 items-center justify-center p-4 rounded-xl shadow-sm">
          <Label
            text={"Select a chat profile to start chatting"}
            class_name={
              "font-bold text-xl text-green-800 opacity-60 tracking-wide"
            }
          />
        </div>
      )}
    </div>
  );
}

export default Messages;
