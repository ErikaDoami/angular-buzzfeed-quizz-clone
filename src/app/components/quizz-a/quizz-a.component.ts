import quizz_questions from 'src/assets/data/quizz_questions.json';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz-a',
  templateUrl: './quizz-a.component.html',
  styleUrls: ['./quizz-a.component.css']
})

export class QuizzComponentA implements OnInit {

  title:string = ""

  questionsa:any = ""
  questionSelecteda:any = ""

  answersa:string[] = []
  answerSelecteda:string = ""

  questionIndexa:number = 0
  questionMaxIndexa:number = 0

  finisheda:boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title

      this.finisheda = false
      this.questionsa = quizz_questions.questionsA
      this.questionSelecteda = this.questionsa[this.questionIndexa]
      this.questionIndexa = 0
      this.questionMaxIndexa = this.questionsa.length

    }
  }

  playerChoose(value:string){
    this.answersa.push(value)
    this.nextStepA()
  }

  async nextStepA(){
    this.questionIndexa+=1

    if (this.questionMaxIndexa > this.questionIndexa) {
      this.questionSelecteda = this.questionsa[this.questionIndexa]
    }
    else{
      const finalAnswera:string = await this.checkResulta(this.answersa)
      this.finisheda = true
      this.answerSelecteda = quizz_questions.resultsa[finalAnswera as keyof typeof quizz_questions.resultsa]
      //verificador opção ganhadora
    }
  }
  async checkResulta(anwsersa:string[]){
    const resulta = anwsersa.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      }else{
        return current
      }
    })

  return resulta

  }
  
}
