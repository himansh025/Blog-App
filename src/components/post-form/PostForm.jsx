import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import service from "../../appwrite/config.js";
import { useCallback, useEffect } from "react";
import { Input, Button, Container, RTE } from "../index.js";

export default function PostForm({ postData }) {
  console.log(postData)
  const navigate = useNavigate();
  const { watch, control, getValues, setValue, register, handleSubmit } =
    useForm({
        defaultValues : 
        {
            title: postData?.title || '',
            slug: postData?.$id || '',
            content: postData?.content || '',
            status: postData?.status || true,
        }
    });
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    if (postData) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        await service.deleteFile(postData.featuredImage);
      }

      const updatePost = await service.updatePost(postData.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      console.log(updatePost)

      updatePost && navigate(`/post/${updatePost.$id}`);
    } else {
        const file = await service.uploadFile(data.image[0]);
        data.featuredImage = file.$id;
      const createPost = await service.createPost({
        ...data,
        status: true,
        userID: userData.$id,
      });
      createPost && navigate(`/post/${createPost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => value.replace(/ /g, "-"), []);

  useEffect(() => {
    const subscription = watch(( value, {name} ) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <Input label='Title' placeholder='Title' {...register('title', {required:true})}/>
        <Input label='Slug' placeholder='Slug' name='slug' {...register('slug')} />
        <RTE control={control} initialValue={getValues('content')} label={"Content Form"} name={'content'}/>
        {
          postData && <div><img src={service.getPreviewFile(postData.featuredImage)} alt="" srcset="" /></div>
        }
        <Input type="file"  accept="image/png, image/jpg, image/jpeg, image/gif" label="Featured Image" {...register("image")}/>
        <Button>Submit</Button>
      </form>
    </Container>
  );
}
