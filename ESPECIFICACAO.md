# Lab 02 — Fila Fácil: especificação do fluxo básico

## 1. Problema e objetivo

Uma recepção precisa emitir senhas e chamar as pessoas por ordem de chegada.
Construiremos um protótipo didático de uma única aba, com uma fila e um atendimento
por vez. O foco da Unidade 2 é supervisionar um agente: observar leituras e edições,
verificar resultados e intervir quando necessário. Especificação e testes apoiam o fluxo.

## 2. Entrega e arquivos

A interface HTML/CSS e a ligação dos botões já estão prontas. O aluno implementa
três operações em src/fila.js. Isso mantém o trabalho pequeno e permite ver o efeito
imediatamente no navegador. Não é necessário instalar pacote JavaScript.

## 3. Contrato público

O script disponibiliza `globalThis.FilaFacil`, com cinco funções:

| Função | Resultado e efeito |
|---|---|
| criarEstado() | Novo objeto independente: {proximaSenha: 1, aguardando: [], atual: null, totalChamadas: 0}. Já fornecida. |
| formatarSenha(numero) | null → “—”; número positivo → prefixo N e ao menos três dígitos, sem truncar. Já fornecida. |
| emitirSenha(estado) | Adiciona o valor de proximaSenha ao fim de aguardando; incrementa proximaSenha; retorna o número emitido. |
| chamarProxima(estado) | Se houver espera, remove a primeira senha, define atual, incrementa totalChamadas e retorna essa senha. Vazia: retorna null e não altera nada. |
| reiniciarFila(estado) | Restaura os quatro campos aos valores iniciais no mesmo objeto. Sem valor de retorno exigido. |

As três operações alteram o objeto recebido. Retornar somente um novo objeto, sem
atualizar o original, não cumpre o contrato. As entradas são estados válidos produzidos
por criarEstado e pelas operações deste contrato. Chamadas são síncronas.

## 4. Requisitos

- **RF-01 / início:** fila vazia, nenhuma senha atual, próxima senha 1 e zero chamadas.
- **RF-02 / emissão:** senhas inteiras sequenciais, únicas entre reinícios, na ordem de emissão. Emitir não muda a senha atual nem o total chamado.
- **RF-03 / chamada:** atendimento FIFO: primeira emitida ainda aguardando é a próxima chamada. Cada chamada efetiva soma 1 em totalChamadas. Chamar não consome um novo número de emissão.
- **RF-04 / fila vazia:** retornar null e preservar todo o estado, inclusive a última senha chamada. A interface deve avisar “Não há senhas aguardando.”
- **RF-05 / reinício:** após confirmação na interface, limpar espera, atual e contador, voltando a emitir 1. Cancelar não altera o estado. A confirmação pertence à interface fornecida; reiniciarFila apenas reinicia.
- **RF-06 / apresentação:** N001, N002… N999, N1000. Ausência de atual: “—”. Quantidade em espera sempre corresponde ao tamanho da fila.
- **RF-07 / isolamento:** uma fila não modifica outra. Recarregar a página cria uma sessão vazia; não há persistência nem sincronização entre abas.

## 5. Critérios e evidências

A suíte compartilhada possui 24 testes de domínio, identificados com RF. Ela verifica
estado inicial, emissão, FIFO, mistura de ações, fila vazia, reinício, formatação e
isolamento. Além da suíte verde, executar o roteiro visual do tutorial: emissão,
chamada, esvaziamento, cancelamento e confirmação do reinício, teclado e recarga.
Testes de domínio não comprovam sozinhos que os botões e o painel funcionam.

## 6. Fora do fluxo básico

Prioridade, triagem clínica, nomes, prontuários, dados pessoais, impressão física,
múltiplos guichês, login, banco de dados, som, persistência, API e publicação.
Prioridade será uma extensão de fila administrativa com regras didáticas próprias,
não uma implementação de classificação de risco clínico. Ver EXERCICIOS.md.
