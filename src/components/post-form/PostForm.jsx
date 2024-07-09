import { BiImageAdd } from "react-icons/bi";
import React, { useCallback, useEffect, useState } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import {
  addUserPosts,
  updateUserPosts,
  updatePublicPosts,
} from "../../store/appSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../button/Button";

function PostForm({ oldPostData = "" }) {
  const { handleSubmit, register, control, getValues, watch, setValue} = useForm({
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
  
  const titleToSlug = useCallback((title)=>{
    if(typeof title == 'string' && title!= ''){
      return title.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
    }
    return ''
  })

  useEffect(()=>{
    const subscription = watch((value,{name}) =>{
      console.log(name)
      if(name === 'title')
        setValue('slug', titleToSlug(value.title), {shouldValidate: true})
    });
    return ()=>subscription.unsubscribe()
  }, [titleToSlug])

  // Submit function
  const submit = (formData) => {
    setLoading(true);
    const userName = userData?.name.replace(" ", "");
    const userID = userData?.$id;
    const imageFile = formData.imageFile[0] || null;
    const isPublic = formData.isPublic === "true" ? true : false;
    const data = { ...formData, userName, userID, isPublic, imageFile };
  
    console.log("Data to be sent:", data);  // Log the data being sent
  
    if (oldPostData) {
      console.log(data);
      console.log(data.isPublic, typeof data.isPublic);
      data.postImage = oldPostData.postImage;
      appwriteService
        .updatePost(oldPostData.$id, imageFile, data)
        .then((userPost) => {
          dispatch(updateUserPosts(userPost));
          dispatch(updatePublicPosts(userPost));
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
          console.log(userPost, 'userPost data here');
          if (typeof userPost === "string") {  // Corrected type check
            console.log(userPost, 'impose if string');
            toast.error(userPost);
            setLoading(false);
          } else {
            dispatch(addUserPosts(userPost));
            if (userPost.isPublic) {
              dispatch(updatePublicPosts(userPost));
            }
            toast.success("Post Added");
            navigate(`/post/${formData.slug}`);
            setLoading(false);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="sm:flex gap-5">
          <Input
            placeholder="Title"
            width="w-full"
            className="sm:p-2 p-0.5"
            disabled={oldPostData}
            {...register("title", { required: true })}
          />
          <Input
            placeholder="Slug"
            className="mt-0 sm:my-3 sm:p-2 p-0.5"
            width="w-full"
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
          <div className="relative w-fit shadow-inner my-2">
            <Input
              type="file"
              id="prevImage"
              hidden
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("imageFile")}
            />
            <label
              className="bg-gray-200 absolute inline-block p-1 rounded-full right-[40%] top-[40%] z-10 hover:bg-green-200 cursor-pointer"
              htmlFor="prevImage"
            >
              <BiImageAdd size={35}/>
            </label>
            <div className="w-full h-full absolute bg-[#ffffff3b]"></div>
            <img
              className="w-[300px] h-48 object-cover"
              src={appwriteService.getPreviewImage(oldPostData.postImage)}
              alt=""
              srcset=""
            />
          </div>
        )}
        <div className="flex gap-6">
          <select className="p-2 rounded-xl my-2 " {...register("isPublic")}>
            <option disabled value={true}>Select Visiblity</option>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
          <Button loading={loading} className="bg-green-300">
            {!oldPostData ? "Create Post" : "Update Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
