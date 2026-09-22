/* Interface fornecida: a tarefa do fluxo básico está em fila.js. */
(() => {
  "use strict";
  const fila = globalThis.FilaFacil;
  const estado = fila.criarEstado();
  const obter = (id) => document.getElementById(id);
  const dialogo = obter("confirmacao");

  function informar(texto) { obter("mensagem").textContent = texto; }

  function renderizar() {
    obter("senha-atual").textContent = fila.formatarSenha(estado.atual);
    obter("legenda-atual").textContent = estado.atual === null
      ? "Aguardando a primeira chamada" : "Por favor, dirija-se ao guichê 01";
    obter("quantidade").textContent = estado.aguardando.length;
    obter("total-chamadas").textContent = estado.totalChamadas;
    obter("fila-vazia").hidden = estado.aguardando.length > 0;
    obter("lista-espera").replaceChildren(...estado.aguardando.map((numero) => {
      const item = document.createElement("li");
      item.textContent = fila.formatarSenha(numero);
      return item;
    }));
  }

  function executar(acao) {
    try { acao(); renderizar(); }
    catch (erro) {
      if (erro instanceof Error && erro.message.startsWith("LAB02_PENDENTE:")) {
        informar("Esta ação ainda precisa ser implementada no laboratório.");
        return;
      }
      informar("Ocorreu um erro. Confira o console do navegador.");
      throw erro;
    }
  }

  obter("emitir").addEventListener("click", () => executar(() => {
    const numero = fila.emitirSenha(estado);
    obter("ultima-emitida").textContent = fila.formatarSenha(numero);
    obter("comprovante").hidden = false;
    informar(`Senha ${fila.formatarSenha(numero)} emitida. Aguarde a chamada.`);
  }));
  obter("chamar").addEventListener("click", () => executar(() => {
    const numero = fila.chamarProxima(estado);
    informar(numero === null ? "Não há senhas aguardando."
      : `Chamando ${fila.formatarSenha(numero)}. Guichê 01.`);
  }));
  obter("reiniciar").addEventListener("click", () => {
    dialogo.returnValue = "";
    dialogo.showModal();
  });
  dialogo.addEventListener("close", () => {
    if (dialogo.returnValue !== "confirmar") return;
    executar(() => {
      fila.reiniciarFila(estado);
      obter("comprovante").hidden = true;
      obter("ultima-emitida").textContent = "";
      informar("Demonstração reiniciada. A próxima senha será N001.");
    });
  });
  renderizar();
})();
