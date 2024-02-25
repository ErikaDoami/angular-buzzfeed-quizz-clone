import quizz_questions from 'src/assets/data/quizz_questions.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz-b',
  templateUrl: './quizz-b.component.html',
  styleUrls: ['./quizz-b.component.css']
})

export class QuizzComponentB implements OnInit {

  title:string = ""

  questionsb:any = ""
  questionSelectedb:any = ""

  answersb:string[] = []
  answerSelectedb:string = ""

  questionIndexb:number = 0
  questionMaxIndexb:number = 0

  finishedb:boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title

      this.finishedb = false
      this.questionsb = quizz_questions.questionsB
      this.questionSelectedb = this.questionsb[this.questionIndexb]
      this.questionIndexb = 0
      this.questionMaxIndexb = this.questionsb.length
    }
  }

  playerChoose(value:string){
    this.answersb.push(value)
    this.nextStepB()
  }

  async nextStepB(){
    this.questionIndexb+=1

    if ((this.questionMaxIndexb > this.questionIndexb)) {
      this.questionSelectedb = this.questionsb[this.questionIndexb]
    }
    else{
      const finalAnswerb:string = await this.checkResultb(this.answersb)
      this.finishedb = true
      this.answerSelectedb = quizz_questions.resultsb[finalAnswerb as keyof typeof quizz_questions.resultsb]
      //verificador opção ganhadora
    }
  }

  async checkResultb(anwsersb:string[]){
    const resultb = anwsersb.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      }else{
        return current
      }
    })

  return resultb
  }

}
