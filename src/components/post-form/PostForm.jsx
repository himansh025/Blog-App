import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import service from "../../appwrite/config.js";
import { useCallback, useEffect } from "react";
import { Input, Button, Container, RTE } from "../index.js";

export default function PostForm({ postData }) {
  const navigate = useNavigate();
  const { watch, control, getValues, setValue, register, handleSubmit } =
    useForm({
        initialValue : 
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

      updatePost && navigate(`/post/${updatePost.$id}`);
    } else {
        const file = await service.uploadFile(data.image[0]);
        data.featuredImage = file.$id;
        delete data.image
        console.log(data)
      const createPost = await service.createPost({
        ...data,
        userID: userData.$id,
      });
    //   createPost && navigate(`/post/${createPost.$id}`);
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

  const clickHandler = async() =>{
        await service.createPost('mai-hoon-yaar',{
            content: 'is this working', title: 'yoo man', featuredImage: '65b9252d893fb707f021',  userID : '4354'
        })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <Input label='Title' placeholder='Title' {...register('title', {required:true})}/>
        <Input label='Slug' placeholder='Slug' name='slug' {...register('slug')} />
        <RTE control={control} initialValue={getValues('content')} label={"Content Form"} name={'content'}/>
        <Input type="file"  accept="image/png, image/jpg, image/jpeg, image/gif" label="Featured Image" {...register("image")}/>
        <Button>Submit</Button>
      </form>
      <button className="bg-green-400 p-10" onClick={clickHandler}>click here yoo</button>
    </Container>
  );
}
