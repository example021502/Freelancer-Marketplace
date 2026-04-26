import React, { useState, useEffect, use } from "react";
import { get_information_common } from "../../utils/backend_calls_functions";
import Label from "../../common/Label";
import Image from "../../common/Image";
import { getIcon } from "../../utils/vectors";
import Icon from "../../common/Icon";
import MoreInfor from "./MoreInfor";
import {
  getAllPosts,
  getPostCreatorInformation,
} from "../NewPostForm/PostingBackendCalls/posts";
import { showError } from "../../utils/toastfy_notifications";
import { useQuery } from "@tanstack/react-query";

function MainDisplay() {
  const [section_selected, setSection_selected] = useState("All");
  const [moreInfo, setMoreInfo] = useState({ status: false, id: null });
  const [posts, setPosts] = useState([]);
  const [project_image, setProject_image] = useState("");
  const [user, setUser] = useState({});
  // loading the posts
  const {
    data: postsData,
    isLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });
  // showing any error while fetching posts
  useEffect(() => {
    if (postsError) showError(postsError?.message || "Error fetching posts");
  }, [postsError]);

  // setting the post information to the local state

  const { data: userInformation, error: userInformationError } = useQuery({
    queryKey: ["userInfor"],
    queryFn: () => getPostCreatorInformation(moreInfo?.id || null),
    enabled: moreInfo.status && moreInfo?.id !== null,
  });
  // displaying error in fetching creator information
  if (userInformationError)
    showError(userInformationError?.message || "Error fetching user!");
  // setting the user information to the local variable
  if (userInformation) setUser(userInformation);

  // changing section : all posts or recent posts
  const handleSelectingSection = (name) => {
    setSection_selected(name);
  };

  if (postsData) console.log(postsData);
  // displaying loading state
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg text-green-800/40">
        <Label text={"Loading..."} />
      </div>
    );
  // fallback display
  if (postsData?.length === 0 || !Array.isArray(postsData)) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg text-green-800/40">
        <Label text={"Nothing to Display yet!"} />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-start justify-start gap-2 flex-col">
      <div
        className={
          "w-full gap-2 border-b-2 pb-2 flex flex-row border-green-800/20"
        }
      >
        {["All", "Recent"].map((btn) => {
          const isSelected = btn === section_selected;
          return (
            <div key={btn} onClick={() => handleSelectingSection(btn)}>
              <Label
                key={btn}
                text={btn}
                class_name={`px-2 rounded-lg cursor-pointer ${isSelected ? "border-2 border-green-800/40" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full gap-4 flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {postsData.map((post, i) => {
          const avatar = getIcon(post.title);
          return (
            <div
              onClick={() => setMoreInfo({ status: true, id: post.creator_id })}
              key={i}
              className="w-full h-60 flex relative flex-col shadow-sm rounded-lg overflow-hidden bg-gray-200"
            >
              <div className=" px-2 py-1 text-xs flex absolute top-2 right-2 flex-row rounded-md bg-gray-50/80 items-start justify-start gap-1 space-2">
                <Icon icon={"ri-star-fill"} class_name={"text-yellow-600"} />
                <Label text={post?.rating || "N/A"} />
              </div>
              <Image
                avatar={avatar}
                image={post?.image_url}
                class_name={"w-full h-[60%] object-contain"}
              />
              <div className="w-full  relative flex-1 text-xs flex flex-col bg-gray-50 p-2 items-start justify-center gap-1">
                <span className=" rounded-full p-1 backdrop-blur-[2px] cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.04] bg-green-800/20 flex items-center justify-center w-4 h-4 absolute top-1 right-1">
                  <Icon icon={"ri-info-i"} />
                </span>
                <Label
                  text={[post?.budget] || "N/A"}
                  class_name={
                    "font-bold text-lg backdrop-blur-sm shadow-lg px-2 py-1 -mt-8 bg-gray-50/60 rounded-xl text-sm"
                  }
                />
                <Label
                  text={post.title || "No title available"}
                  class_name={"font-semibold"}
                />
                <Label
                  text={post.description || "No description available"}
                  class_name={"text-xs"}
                />
              </div>
            </div>
          );
        })}
      </div>
      {moreInfo && (
        <MoreInfor
          setInfo={setMoreInfo}
          user={user}
          project_image={project_image}
        />
      )}
    </div>
  );
}

export default MainDisplay;
