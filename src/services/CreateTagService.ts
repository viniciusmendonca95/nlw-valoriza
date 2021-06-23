import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService{
  async execute(name: string){
    const tagsRepository = getCustomRepository(TagsRepositories);

    if(!name){
      throw new Error("Incorrect Name!");
    }

    const tagAlreadyExist = await tagsRepository.findOne({
      name,
    })

    if(tagAlreadyExist) {
      throw new Error("Tag already exists!")
    }

   const tag = tagsRepository.create({
     name,
   })

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService }