import { AnswerT } from "@/models/Answer";
import { FlashcardT } from "@/models/Flashcard";

export const updateAnswer = (answer: any, flashcard:any) => {
    console.log(answer)
    return answer;
}

export const updateResult= (answer: any, result:any) => {
    console.log(result)
    return result;
}

export const checkValidity=(flashcard:FlashcardT, answer:AnswerForm)=>{
    return flashcard.wordLang2?.toLowerCase() == answer.givenAnswer.toLowerCase();
}
