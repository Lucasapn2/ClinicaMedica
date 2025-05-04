import { Medico } from "./Medico.js";
import { Pacientes } from "./Pacientes.js";
import { DomHandler } from "./DomHandler.js";

let medicos = [];
let pacientes = [];

async function carregarDados() {
  try {
    const responseMedicos = await fetch("/assets/data/medicos.json");
    const medicosData = await responseMedicos.json();
    //console.log(medicosData);

    medicos = medicosData.map((medico) => {
      return new Medico(
        medico.nome,
        medico.idade,
        medico.CPF,
        medico.especialidade
      );
    });

    const responsePacientes = await fetch("/assets/data/pacientes.json");
    const pacientesData = await responsePacientes.json();

    //Criar instancia de paciente
    pacientes = pacientesData.map(({ nome, idade, CPF }) => {
      return new Pacientes(nome, idade, CPF);
    });

    // atualizar interface
    DomHandler.atualizarListaPacientes(pacientes);
    DomHandler.atualizarListaMedicos(medicos);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

//função para formatar a data

function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Função para agendar e exibir consulta
function agendarConsulta() {
  const pacienteSelecionado = document.getElementById("selectPaciente").value;
  const medicoSelecionado = document.getElementById("selectMedico").value;
  const dataSelecionada = document.getElementById("inputData").value;

  if (!pacienteSelecionado || !medicoSelecionado || !dataSelecionada) {
    alert("Por favor, selecione um paciente, médico e uma data!");
    return;
  }

  const paciente = pacientes.find((p) => p.nome === pacienteSelecionado);
  const medico = medicos.find((m) => m.nome === medicoSelecionado);

  if (paciente && medico) {
    medico
      .agendarConsulta(formatarData(dataSelecionada), paciente)
      .then((mensagem) => {
        DomHandler.exibirConsulta(mensagem);
      })
      .catch((erro) => {
        console.error("Erro ao agendar consulta:", erro);
        alert("Ocorreu um erro ao agendar a consulta.");
      });
  } else {
    alert("Paciente ou médico não encontrados!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
  document
    .getElementById("btnAgendar")
    .addEventListener("click", agendarConsulta);
});
