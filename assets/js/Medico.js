import { Pessoa } from "./Pessoa.js";


export class Medico extends Pessoa {
  constructor(nome, idade, CPF, especialidade) {
    super(nome, idade, CPF);
    this.especialidade = especialidade;
  }

  agendarConsulta(data, paciente) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `Consulta agendada com Dr(a). ${this.nome} para ${data} com o paciente ${paciente.nome}`
        );
      }, 2000); 
    });
  }
}
