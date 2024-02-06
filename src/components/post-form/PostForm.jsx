import { BiImageAdd } from "react-icons/bi"; 
import React, { useState } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { addUserPosts, updateUserPosts } from "../../store/appSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../button/Button";

function PostForm({ oldPostData }) {
  const { handleSubmit, register, control, getValues } = useForm({
    defaultValues: {
      title: oldPostData?.title || "",
      content: oldPostData?.content || "",
      slug: oldPostData?.$id || "",
      imageFile: oldPostData?.imageFile || "",
      isPublic: oldPostData?.isPublic || true,
    },
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = (formData) => {
    setLoading(true);
    const userName = userData?.name.replace(" ", "");
    const userID = userData?.$id;
    const imageFile = formData.imageFile[0] || null;
    const isPublic = Boolean(formData.isPublic);
    const data = { ...formData, userName, userID, isPublic, imageFile };

    if (oldPostData) {
      data.postImage = oldPostData.postImage;
      appwriteService
        .updatePost(oldPostData.$id, imageFile, data)
        .then((userPost) => {
          console.log(userPost);
          dispatch(updateUserPosts(userPost));
          toast.success("Post Updated");
          navigate(`/post/${formData.slug}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      appwriteService
        .createPost(data)
        .then((userPost) => {
          console.log(typeof userPost);
          if (typeof userPost == "string") {
            toast.error(userPost);
            setLoading(false);
          } else {
            dispatch(addUserPosts(userPost));
            toast.success("Post Added");
            navigate(`/post/${formData.slug}`);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error, "error in catch");
          toast.error(error.message);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex gap-3">
          <Input
            placeholder="Title"
            disabled={oldPostData}
            {...register("title", { required: true })}
          />
          <Input
            placeholder="Slug"
            disabled={oldPostData}
            {...register("slug", { required: true })}
          />
        </div>
        <RTE control={control} name="content" prevData={getValues("content")} />
        {!oldPostData ? (
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("imageFile", { required: true })}
          />
        ) : (
          <div className="relative w-fit bg-red-400 shadow-inner my-2">
              <Input
                type="file"
                id='prevImage'
                hidden
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("imageFile")}
              />
              <label className="bg-gray-200 absolute inline-block p-1 rounded-full right-[40%] top-[40%] z-10" htmlFor="prevImage"><BiImageAdd size={35}/></label>
              <div className="w-full h-full absolute bg-[#ffffff3b]"></div>
            <img className="w-[300px] h-48 object-cover" src={appwriteService.getPreviewImage(oldPostData.postImage)} alt="" srcset="" />
          </div>
        )}
        <select className="p-2 rounded-xl my-2" {...register("isPublic")}>
          <option value={true}>Public</option>
          <option value={false}>Private</option>
        </select>
        <Button loading={loading} className="bg-green-300 p-4">
          {!oldPostData ? "Create Post" : "Update Post"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
