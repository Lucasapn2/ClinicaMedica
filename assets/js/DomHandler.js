export class DomHandler {
  static atualizarListaPacientes(pacientes) {
    const selectorPacientes = document.querySelector("#selectPaciente");
    selectorPacientes.innerHTML =
      '<option value="">--Selecione um paciente--</option>';

    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.nome;
      option.textContent = paciente.nome;
      selectorPacientes.appendChild(option);
    });
  }

  static atualizarListaMedicos(medicos) {
    const selectorMedicos = document.querySelector("#selectMedico");
    selectorMedicos.innerHTML =
      '<option value="">--Selecione um Médico--</option>';

    medicos.forEach((medico) => {
      const option = document.createElement("option");
      option.value = medico.nome;
      option.textContent = medico.nome;
      selectorMedicos.appendChild(option);
    });
  }

  static exibirConsulta(mensagem) {
    const listaConsultas = document.querySelector("#listaConsultas");
    //verifica se já existe um elemento com a mesma mensagem/texto
    const consultas = Array.from(listaConsultas.getElementsByTagName("li"));
    const consultaExistentes = consultas.some((li) =>
      li.textContent.includes(mensagem)
    );

    if (consultaExistentes) {
      alert("essa Consulta já foi agendada!");
      return;
    }

    //criar elemento da lista de consultas
    const li = document.createElement("li");
    li.classList.add("consulta-item");
    li.textContent = mensagem;

    // criar botão de cancelar consulta
    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    btnCancelar.classList.add = "btn-cancelar";

    // evento de clique para cancelar a consulta
    btnCancelar.addEventListener("click", () => {
      li.remove();
    });
    li.appendChild(btnCancelar);
    listaConsultas.appendChild(li);
  }
}
