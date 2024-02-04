import React, { useState } from "react";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { updateUserPosts } from "../../store/appSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../button/Button";

function PostForm({ newPost = "hello" }) {
  const { handleSubmit, getValues, setValues, register, control } = useForm();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData);

  const submit = (formData) => {
    setLoading(true)
    const userName = userData?.name.replace(" ", '');
    const userID = userData?.$id
    const imageFile = formData.imageFile[0]
    const isPublic = Boolean(formData.isPublic)
    const data = {...formData,userName,userID,isPublic,imageFile}
    appwriteService.createPost(data).then((userPost)=>{
      dispatch(updateUserPosts(userPost))
      toast.success("Post Added")
      navigate(`/post/${formData.slug}`)
    }).catch(error=>console.log(error))
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex gap-3">
          <Input
            placeholder="Title"
            disabled={!newPost}
            {...register("title", { required: true })}
          />
          <Input
            placeholder="Slug"
            disabled={!newPost}
            {...register("slug", { required: true })}
          />
        </div>
        <RTE control={control} name="content" />
        {newPost ? (
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("imageFile", { required: true })}
          />
        ) : (
          <div className="flex gap-3 items-center">
            <Input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image")}
            />
            <label htmlFor="">Change Image</label>
          </div>
        )}
        <select {...register('isPublic')}>
            <option value={true}>Public</option>
            <option value={false}>Private</option>
        </select>
        <Button loading={loading} className="bg-green-300 p-4">
          {newPost ? "Create Post" : "Update Post"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
