// =====================================================
// DADOS CENTRALIZADOS - MÁRCIO FRANÇA ADVOCACIA
// Edite este arquivo para alterar dados do escritório.
// =====================================================

export const SITE_CONFIG = {
  nome: 'Márcio França Advocacia',
  nomeAdvogado: 'Dr. Márcio Junior dos Santos França',
  oab: 'OAB/AC 2882',
  slogan: 'Advocacia técnica e estratégica em Rio Branco/AC',
  descricao: 'Escritório de advocacia em Rio Branco/AC com atuação em Direito Previdenciário, Consumidor Bancário, Energisa, Família e Criminal. Atendimento presencial e online.',
  telefone: '(68) 99951-1555',
  whatsapp: '5568999511555',
  email: 'contato@marciofrancaadvocacia.com.br',
  endereco: 'Av. Epaminondas Jacome, nº 2172, bairro Cerâmica, Rio Branco/AC - CEP 69905-076',
  cidade: 'Rio Branco',
  estado: 'AC',
  pais: 'BR',
  horario: 'Segunda a sexta, 08h às 12h e 14h às 18h',
  instagram: 'https://instagram.com/marcio4dv',
  facebook: 'https://facebook.com/marciofrancaadvocacia',
  linkedin: 'https://linkedin.com/in/marciofrancaadvocacia',
  googleBusiness: 'https://www.google.com/search?q=Advocacia+Dr.+M%C3%A1rcio+Fran%C3%A7a',
  gaId: '', // Substituir pelo ID real do Google Analytics
  gscVerification: '', // Substituir pela chave de verificação do Search Console
  avisoLegal: 'Este site possui finalidade exclusivamente informativa. O envio de informações pelo formulário ou WhatsApp não constitui contratação automática nem garante resultado. Cada caso depende de análise individualizada.',
  avisoConteudo: 'Este conteúdo é informativo e não substitui consulta jurídica individualizada.',
};

export type AreaAtuacao = {
  id: string;
  titulo: string;
  tituloLp: string;
  subtitulo: string;
  descricao: string;
  slug: string;
  icone: string;
  conteudoLp: {
    explicacao: string;
    quandoProcurar: string[];
    documentos: string[];
    faq: { pergunta: string; resposta: string }[];
  };
  triagem: {
    label: string;
    perguntas: { id: string; texto: string; opcoes: string[] }[];
  };
  palavrasChave: string[];
};

export const AREAS_ATUACAO: AreaAtuacao[] = [
  {
    id: 'bpc-loas',
    titulo: 'BPC/LOAS',
    tituloLp: 'Advogado para BPC/LOAS em Rio Branco/AC',
    subtitulo: 'Benefício de Prestação Continuada',
    descricao: 'Atuação em pedidos de BPC/LOAS para pessoas com deficiência e idosos de baixa renda, incluindo recursos administrativos e ações judiciais.',
    slug: '/bpc-loas-rio-branco',
    icone: 'ShieldCheck',
    conteudoLp: {
      explicacao: 'O Benefício de Prestação Continuada (BPC), previsto na Lei Orgânica da Assistência Social (LOAS), garante um salário mínimo mensal para pessoas com deficiência e idosos com 65 anos ou mais que comprovem situação de vulnerabilidade socioeconômica. É um direito constitucional, mas muitos pedidos são negados administrativamente pelo INSS, o que pode exigir análise jurídica para identificar possíveis alternativas.',
      quandoProcurar: [
        'O pedido de BPC/LOAS foi negado pelo INSS',
        'Há dúvidas sobre os requisitos de renda familiar',
        'Existe laudo médico mas o benefício não foi concedido',
        'O benefício foi cessado ou revisado',
        'Não sabe como iniciar o pedido administrativo',
      ],
      documentos: [
        'Documento de identidade e CPF',
        'Comprovante de residência',
        'Laudos médicos e exames (se pessoa com deficiência)',
        'Comprovante de renda de todos os membros da família',
        'CadÚnico atualizado',
        'Carta de indeferimento do INSS (se houver)',
      ],
      faq: [
        { pergunta: 'Quem tem direito ao BPC/LOAS?', resposta: 'Pessoas com deficiência de qualquer idade e idosos com 65 anos ou mais, que comprovem renda familiar per capita inferior ao previsto em lei. Cada caso é analisado individualmente.' },
        { pergunta: 'Preciso ter contribuído para o INSS?', resposta: 'Não. O BPC/LOAS é um benefício assistencial, diferente dos benefícios previdenciários. Não exige contribuição prévia ao INSS.' },
        { pergunta: 'O INSS negou meu pedido. O que fazer?', resposta: 'Existem possibilidades de recurso administrativo e de ação judicial. É recomendável buscar orientação jurídica para análise do caso concreto.' },
        { pergunta: 'Quanto tempo demora o processo?', resposta: 'O prazo varia conforme a complexidade do caso e a via escolhida (administrativa ou judicial). Cada situação deve ser analisada individualmente.' },
      ],
    },
    triagem: {
      label: 'INSS/BPC',
      perguntas: [
        { id: 'negado', texto: 'O benefício foi negado pelo INSS?', opcoes: ['Sim', 'Não', 'Ainda não solicitei'] },
        { id: 'laudo', texto: 'Possui laudo médico atualizado?', opcoes: ['Sim', 'Não', 'Não sei'] },
        { id: 'renda', texto: 'A renda da família é considerada baixa?', opcoes: ['Sim', 'Não', 'Não sei calcular'] },
        { id: 'pedido', texto: 'Já fez pedido no INSS?', opcoes: ['Sim, foi negado', 'Sim, está em análise', 'Ainda não fiz'] },
      ],
    },
    palavrasChave: ['BPC LOAS Rio Branco', 'advogado BPC Acre', 'benefício assistencial Rio Branco'],
  },
  {
    id: 'aposentadoria-rural',
    titulo: 'Aposentadoria Rural',
    tituloLp: 'Advogado para Aposentadoria Rural no Acre',
    subtitulo: 'Previdenciário Rural',
    descricao: 'Orientação jurídica para trabalhadores rurais e agricultores familiares que buscam aposentadoria por idade rural no Acre.',
    slug: '/aposentadoria-rural-acre',
    icone: 'Landmark',
    conteudoLp: {
      explicacao: 'A aposentadoria por idade rural é destinada a trabalhadores que exerceram atividade rural em regime de economia familiar. As mulheres podem requerer a partir dos 55 anos e os homens a partir dos 60 anos, desde que comprovem ao menos 15 anos de atividade rural. No Acre, muitas famílias trabalham na agricultura familiar, e a comprovação dessa atividade pode exigir análise jurídica especializada.',
      quandoProcurar: [
        'O INSS negou o pedido de aposentadoria rural',
        'Não sabe quais documentos servem como prova',
        'Possui apenas documentos antigos ou informais',
        'Precisa de orientação sobre prova testemunhal',
        'Trabalhou na roça mas não tem registro formal',
      ],
      documentos: [
        'Documento de identidade e CPF',
        'Certidão de casamento (se constar profissão)',
        'Declaração do Sindicato dos Trabalhadores Rurais',
        'Bloco de produtor rural',
        'ITR (Imposto Territorial Rural)',
        'Contratos de parceria ou arrendamento',
        'Notas fiscais de venda de produção',
        'Comprovantes de participação em programas rurais (DAP, Pronaf)',
      ],
      faq: [
        { pergunta: 'Qual a idade mínima para aposentadoria rural?', resposta: '55 anos para mulheres e 60 anos para homens, com comprovação de no mínimo 15 anos de atividade rural.' },
        { pergunta: 'Posso me aposentar sem ter documentos?', resposta: 'A legislação e a jurisprudência admitem diferentes meios de prova, incluindo prova testemunhal. É importante buscar orientação jurídica para avaliar as possibilidades de cada caso.' },
        { pergunta: 'Trabalho na roça há décadas. Por que o INSS negou?', resposta: 'Há diversas razões pelas quais o INSS pode indeferir o pedido. A análise do motivo da negativa e dos documentos disponíveis pode indicar se há fundamento para recurso.' },
      ],
    },
    triagem: {
      label: 'Aposentadoria Rural',
      perguntas: [
        { id: 'trabalhoRural', texto: 'Trabalhou na roça ou em atividade rural?', opcoes: ['Sim', 'Não', 'Parcialmente'] },
        { id: 'documentos', texto: 'Possui documentos que comprovem atividade rural?', opcoes: ['Sim', 'Tenho alguns', 'Não tenho', 'Não sei quais servem'] },
        { id: 'inssNegou', texto: 'O INSS negou o pedido?', opcoes: ['Sim', 'Não solicitei ainda', 'Está em análise'] },
        { id: 'testemunhas', texto: 'Possui testemunhas que conhecem sua atividade rural?', opcoes: ['Sim', 'Não sei', 'Não'] },
      ],
    },
    palavrasChave: ['aposentadoria rural Acre', 'aposentadoria trabalhador rural Rio Branco', 'advogado previdenciário rural AC'],
  },
  {
    id: 'consignado-indevido',
    titulo: 'Consignado Indevido',
    tituloLp: 'Desconto Indevido no INSS por Empréstimo Consignado',
    subtitulo: 'Descontos e Empréstimos Não Reconhecidos',
    descricao: 'Atuação em casos de descontos não autorizados em benefícios do INSS, cartões consignados não reconhecidos e empréstimos fraudulentos.',
    slug: '/consignado-indevido-inss',
    icone: 'Wallet',
    conteudoLp: {
      explicacao: 'Muitos aposentados e pensionistas do INSS identificam em seus extratos descontos de empréstimos consignados ou cartões de crédito que não reconhecem. Essas situações podem configurar prática abusiva ou fraude contratual. A análise jurídica pode verificar a regularidade dos contratos e identificar possíveis medidas cabíveis.',
      quandoProcurar: [
        'Há desconto no benefício do INSS que não reconhece',
        'Recebeu cartão de crédito consignado sem solicitar',
        'O banco não resolve a reclamação',
        'Identificou mais de um desconto desconhecido',
        'O valor descontado compromete o sustento',
      ],
      documentos: [
        'Extrato de pagamento do INSS (HISCRE)',
        'Extrato bancário dos últimos meses',
        'Cópia do contrato (se possuir)',
        'Protocolo de reclamação no banco ou ouvidoria',
        'Registros de reclamação no Procon ou Bacen',
      ],
      faq: [
        { pergunta: 'Como sei se o desconto é indevido?', resposta: 'Compare os descontos listados no extrato do INSS (HISCRE) com os contratos que reconhece. Descontos sem contrato válido ou sem sua autorização podem ser questionados.' },
        { pergunta: 'Preciso ir ao banco antes de procurar um advogado?', resposta: 'É recomendável registrar uma reclamação no banco e guardar o protocolo. Essa providência pode ser útil para demonstrar a tentativa de resolução administrativa.' },
        { pergunta: 'Posso reaver valores descontados indevidamente?', resposta: 'A possibilidade de restituição depende da análise do caso concreto, considerando a existência ou não de contrato válido e outras circunstâncias.' },
      ],
    },
    triagem: {
      label: 'Banco/Consignado',
      perguntas: [
        { id: 'desconto', texto: 'Há desconto desconhecido no seu benefício?', opcoes: ['Sim', 'Não sei', 'Vários descontos'] },
        { id: 'contrato', texto: 'Você reconhece o contrato do empréstimo?', opcoes: ['Não reconheço', 'Não sei', 'Reconheço parcialmente'] },
        { id: 'extrato', texto: 'Possui extrato do INSS (HISCRE)?', opcoes: ['Sim', 'Não', 'Não sei o que é'] },
        { id: 'reclamacao', texto: 'Já reclamou no banco?', opcoes: ['Sim, sem retorno', 'Sim, recusaram', 'Ainda não'] },
      ],
    },
    palavrasChave: ['consignado indevido INSS Acre', 'desconto indevido benefício Rio Branco', 'empréstimo consignado fraude AC'],
  },
  {
    id: 'energisa',
    titulo: 'Energisa',
    tituloLp: 'Cobrança Abusiva da Energisa em Rio Branco',
    subtitulo: 'Cobranças e Cortes de Energia',
    descricao: 'Atuação em casos de cobranças abusivas, valores irregulares e cortes indevidos de energia elétrica pela Energisa no Acre.',
    slug: '/energisa-acre',
    icone: 'Zap',
    conteudoLp: {
      explicacao: 'Consumidores no Acre têm enfrentado situações de cobranças com valores acima do consumo habitual, cobranças retroativas por supostas irregularidades e ameaças ou efetivação de corte de energia. A legislação consumerista e as normas da ANEEL estabelecem regras que podem ser verificadas para cada caso concreto.',
      quandoProcurar: [
        'Recebeu conta com valor muito acima do normal',
        'A energia foi cortada sem aviso prévio adequado',
        'Recebeu cobrança retroativa por "irregularidade"',
        'Houve troca de medidor seguida de aumento da conta',
        'Não consegue resolver o problema nos canais da Energisa',
      ],
      documentos: [
        'Faturas de energia dos últimos 12 meses',
        'Fotos do medidor (se possível)',
        'Protocolo de reclamação na Energisa',
        'Protocolo de reclamação no Procon ou ANEEL',
        'Comprovante de pagamentos realizados',
        'Notificação de irregularidade (se houver)',
      ],
      faq: [
        { pergunta: 'A Energisa pode cortar minha energia?', resposta: 'O corte de energia deve seguir regras específicas previstas na legislação. Existem situações em que o corte pode ser considerado irregular, o que deve ser analisado caso a caso.' },
        { pergunta: 'A conta aumentou muito de uma vez. Isso é normal?', resposta: 'Variações significativas podem ter diversas causas. Se o aumento não corresponde ao seu consumo real, pode ser recomendável buscar orientação para avaliar a cobrança.' },
        { pergunta: 'Devo pagar a conta enquanto questiono?', resposta: 'Essa decisão depende da análise do caso concreto. Em algumas situações, há medidas judiciais cabíveis. É importante buscar orientação antes de tomar qualquer decisão.' },
      ],
    },
    triagem: {
      label: 'Energisa',
      perguntas: [
        { id: 'problema', texto: 'A conta de energia aumentou muito?', opcoes: ['Sim, de repente', 'Vem subindo aos poucos', 'Recebi cobrança retroativa'] },
        { id: 'corte', texto: 'Houve corte ou ameaça de corte de energia?', opcoes: ['Sim, cortaram', 'Sim, ameaçaram', 'Não'] },
        { id: 'faturas', texto: 'Possui as faturas de energia?', opcoes: ['Sim', 'Algumas', 'Não'] },
        { id: 'reclamacao', texto: 'Já reclamou na Energisa, Procon ou ANEEL?', opcoes: ['Sim, sem solução', 'Ainda não', 'Sim, em andamento'] },
      ],
    },
    palavrasChave: ['Energisa cobrança abusiva Rio Branco', 'advogado Energisa Acre', 'conta de energia alta Rio Branco'],
  },
  {
    id: 'negativacao-indevida',
    titulo: 'Negativação Indevida',
    tituloLp: 'Negativação Indevida: o que fazer?',
    subtitulo: 'Nome Negativado Indevidamente',
    descricao: 'Orientação jurídica para casos de inscrição indevida em cadastros de inadimplentes como SPC e Serasa.',
    slug: '/negativacao-indevida',
    icone: 'BadgeAlert',
    conteudoLp: {
      explicacao: 'A negativação indevida ocorre quando uma pessoa é inscrita em cadastros de inadimplentes (SPC, Serasa) de forma irregular — seja por dívida já paga, dívida que não reconhece ou cobrança decorrente de fraude. Essa situação pode afetar o acesso ao crédito e gerar constrangimento. A análise jurídica pode verificar se a negativação é procedente e quais medidas podem ser adotadas.',
      quandoProcurar: [
        'Descobriu que o nome está negativado sem motivo aparente',
        'A dívida já foi paga mas a negativação persiste',
        'Não reconhece a dívida que gerou a negativação',
        'Suspeita de fraude com uso dos seus dados',
        'A negativação está impedindo acesso a crédito',
      ],
      documentos: [
        'Consulta ao SPC e/ou Serasa (pode ser online)',
        'Comprovante de pagamento da dívida (se já pagou)',
        'Boletim de ocorrência (em caso de fraude)',
        'Correspondências ou cobranças recebidas',
        'Documentos pessoais',
      ],
      faq: [
        { pergunta: 'Como descubro se meu nome está negativado?', resposta: 'É possível consultar gratuitamente pelo site do SPC e do Serasa. A consulta mostra se há apontamentos em seu CPF.' },
        { pergunta: 'Posso ser negativado sem ser avisado?', resposta: 'A legislação exige notificação prévia ao consumidor antes da inscrição em cadastros de inadimplentes. A ausência dessa notificação pode ser relevante para a análise do caso.' },
        { pergunta: 'Quanto tempo a negativação pode ficar no meu nome?', resposta: 'A legislação estabelece que as informações negativas devem ser excluídas após 5 anos da data de vencimento da dívida.' },
      ],
    },
    triagem: {
      label: 'Negativação',
      perguntas: [
        { id: 'conhece', texto: 'Você reconhece a dívida que gerou a negativação?', opcoes: ['Não reconheço', 'Já paguei', 'Reconheço mas discordo do valor'] },
        { id: 'aviso', texto: 'Foi avisado antes de ter o nome negativado?', opcoes: ['Não', 'Sim', 'Não lembro'] },
        { id: 'tempo', texto: 'Há quanto tempo está negativado?', opcoes: ['Menos de 1 ano', 'Entre 1 e 5 anos', 'Mais de 5 anos', 'Não sei'] },
        { id: 'prejuizo', texto: 'A negativação está causando algum problema concreto?', opcoes: ['Sim, não consigo crédito', 'Sim, constrangimento', 'Não ainda'] },
      ],
    },
    palavrasChave: ['negativação indevida Rio Branco', 'nome negativado SPC Serasa Acre', 'advogado negativação AC'],
  },
  {
    id: 'familia',
    titulo: 'Família e Sucessões',
    tituloLp: 'Advogado de Família em Rio Branco/AC',
    subtitulo: 'Direito de Família',
    descricao: 'Atuação em ações de família como divórcio, guarda, pensão alimentícia, reconhecimento de paternidade e inventário.',
    slug: '/familia',
    icone: 'Users',
    conteudoLp: {
      explicacao: 'O Direito de Família trata de questões que envolvem relações familiares, como divórcio, guarda de filhos, pensão alimentícia, regulamentação de visitas, reconhecimento e dissolução de união estável, partilha de bens e inventário. São situações que exigem orientação jurídica cuidadosa e humanizada.',
      quandoProcurar: [
        'Deseja formalizar um divórcio (consensual ou litigioso)',
        'Precisa discutir guarda dos filhos ou regime de visitas',
        'A pensão alimentícia precisa ser fixada, revisada ou executada',
        'Houve falecimento e é necessário fazer inventário',
        'Deseja reconhecimento ou dissolução de união estável',
      ],
      documentos: [
        'Certidão de casamento ou declaração de união estável',
        'Certidão de nascimento dos filhos',
        'Documentos dos bens a serem partilhados',
        'Comprovantes de renda',
        'Certidão de óbito (em caso de inventário)',
        'Documentos pessoais das partes envolvidas',
      ],
      faq: [
        { pergunta: 'Quanto tempo demora um divórcio?', resposta: 'O prazo depende de ser consensual ou litigioso, e se há questões como partilha de bens e guarda de filhos a resolver. Um divórcio consensual tende a ser mais rápido.' },
        { pergunta: 'Posso pedir revisão de pensão alimentícia?', resposta: 'A revisão pode ser solicitada quando há mudança nas condições econômicas de quem paga ou de quem recebe. É necessário demonstrar a alteração das circunstâncias.' },
        { pergunta: 'Qual o prazo para fazer inventário?', resposta: 'A legislação estabelece prazo de 60 dias a partir do óbito para abertura do inventário. O atraso pode gerar multa sobre o imposto de transmissão.' },
      ],
    },
    triagem: {
      label: 'Família',
      perguntas: [
        { id: 'tipo', texto: 'O caso envolve qual assunto?', opcoes: ['Divórcio', 'Guarda de filhos', 'Pensão alimentícia', 'Inventário/herança', 'União estável', 'Outro'] },
        { id: 'urgencia', texto: 'Há urgência na situação?', opcoes: ['Sim, muita', 'Moderada', 'Não é urgente'] },
        { id: 'documentos', texto: 'Possui documentos relacionados ao caso?', opcoes: ['Sim', 'Alguns', 'Não'] },
      ],
    },
    palavrasChave: ['advogado família Rio Branco', 'divórcio Rio Branco AC', 'pensão alimentícia Acre', 'inventário Rio Branco'],
  },
  {
    id: 'criminal',
    titulo: 'Direito Criminal',
    tituloLp: 'Defesa Criminal em Rio Branco/AC',
    subtitulo: 'Defesa em Processos Criminais',
    descricao: 'Defesa técnica em inquéritos policiais, processos criminais, audiências de custódia e execução penal.',
    slug: '/criminal',
    icone: 'Scale',
    conteudoLp: {
      explicacao: 'A defesa criminal é um direito constitucional. Toda pessoa acusada de uma infração penal tem direito à ampla defesa e ao contraditório. A atuação do advogado criminalista envolve acompanhamento em inquéritos policiais, audiências de custódia, instrução criminal, recursos e execução penal. A orientação jurídica desde o início pode ser determinante para a defesa.',
      quandoProcurar: [
        'Foi intimado para depor ou comparecer à delegacia',
        'Recebeu citação de processo criminal',
        'Há audiência marcada e precisa de advogado',
        'Um familiar foi preso e precisa de defesa',
        'Precisa de orientação sobre processo criminal em andamento',
      ],
      documentos: [
        'Boletim de ocorrência',
        'Mandado de citação ou intimação',
        'Cópia do inquérito ou processo',
        'Documentos pessoais',
        'Comprovante de residência',
      ],
      faq: [
        { pergunta: 'Posso ser preso sem mandado?', resposta: 'A prisão sem mandado judicial é permitida apenas em situações de flagrante delito, conforme previsto na Constituição Federal e no Código de Processo Penal.' },
        { pergunta: 'Preciso de advogado para ir à delegacia?', resposta: 'O acompanhamento de advogado em depoimentos na delegacia é um direito. A orientação jurídica antes do depoimento pode ser importante para a defesa.' },
        { pergunta: 'O que é audiência de custódia?', resposta: 'É a apresentação da pessoa presa em flagrante ao juiz em até 24 horas, para avaliar a legalidade da prisão e decidir sobre a manutenção ou concessão de liberdade provisória.' },
      ],
    },
    triagem: {
      label: 'Criminal',
      perguntas: [
        { id: 'situacao', texto: 'Qual a situação atual?', opcoes: ['Audiência marcada', 'Fui intimado', 'Familiar preso', 'Processo em andamento', 'Inquérito policial'] },
        { id: 'prisao', texto: 'Há prisão, intimação ou investigação?', opcoes: ['Sim, prisão', 'Sim, intimação', 'Sim, investigação', 'Não'] },
        { id: 'urgencia', texto: 'Qual é a urgência?', opcoes: ['Imediata (próximas horas)', 'Urgente (próximos dias)', 'Posso aguardar'] },
      ],
    },
    palavrasChave: ['advogado criminal Rio Branco', 'defesa criminal Acre', 'advogado criminalista Rio Branco AC'],
  },
  {
    id: 'transito-cnh',
    titulo: 'Trânsito e CNH',
    tituloLp: 'Defesa em Multas e Suspensão de CNH no Acre',
    subtitulo: 'Defesa de Trânsito',
    descricao: 'Atuação em recursos de multas de trânsito, suspensão e cassação de CNH.',
    slug: '/transito-cnh',
    icone: 'CarFront',
    conteudoLp: {
      explicacao: 'Multas de trânsito, suspensão e cassação da CNH podem afetar diretamente a vida profissional e pessoal. A legislação de trânsito prevê procedimentos específicos para aplicação de penalidades, e irregularidades no processo podem fundamentar recursos administrativos ou ações judiciais.',
      quandoProcurar: [
        'Recebeu notificação de suspensão ou cassação da CNH',
        'Deseja recorrer de multas de trânsito',
        'Ultrapassou o limite de pontos na CNH',
        'Foi autuado em blitz e discorda da infração',
        'Precisa da CNH para trabalhar e está na iminência de perdê-la',
      ],
      documentos: [
        'Notificação de autuação (multa)',
        'Notificação de instauração de processo de suspensão',
        'CNH (frente e verso)',
        'Documentos do veículo',
        'Comprovantes de recurso administrativo (se houver)',
      ],
      faq: [
        { pergunta: 'Quantos pontos suspendem a CNH?', resposta: 'A legislação prevê que a CNH pode ser suspensa quando o condutor atinge determinado número de pontos em 12 meses, conforme o tipo de infração. O limite varia conforme a situação.' },
        { pergunta: 'Posso recorrer de uma multa?', resposta: 'Sim. O Código de Trânsito Brasileiro prevê a possibilidade de recurso em instância administrativa. Há prazos específicos que devem ser observados.' },
        { pergunta: 'Perdi o prazo para recurso. Ainda posso fazer algo?', resposta: 'Dependendo da situação, podem existir alternativas. É importante buscar orientação jurídica para avaliar as possibilidades no caso concreto.' },
      ],
    },
    triagem: {
      label: 'Trânsito/CNH',
      perguntas: [
        { id: 'problema', texto: 'Qual o problema relacionado ao trânsito?', opcoes: ['Multa que desejo recorrer', 'Suspensão da CNH', 'Cassação da CNH', 'Excesso de pontos', 'Outro'] },
        { id: 'prazo', texto: 'Recebeu notificação com prazo?', opcoes: ['Sim, prazo próximo', 'Sim, tenho tempo', 'Não recebi notificação'] },
        { id: 'trabalho', texto: 'Precisa da CNH para trabalhar?', opcoes: ['Sim, essencial', 'Sim, mas tenho alternativas', 'Não'] },
      ],
    },
    palavrasChave: ['multa trânsito Rio Branco', 'suspensão CNH Acre', 'advogado trânsito Rio Branco AC'],
  },
  {
    id: 'plano-de-saude',
    titulo: 'Planos de Saúde',
    tituloLp: 'Advogado Especialista em Planos de Saúde em Rio Branco/AC',
    subtitulo: 'Direito à Saúde e Negativas de Cobertura',
    descricao: 'Atuação jurídica em casos de negativa de tratamento, exames, cirurgias, reajustes abusivos e carências em planos de saúde.',
    slug: '/planos-de-saude',
    icone: 'HeartPulse',
    conteudoLp: {
      explicacao: 'Os beneficiários de planos de saúde frequentemente enfrentam desafios ao solicitar a cobertura de procedimentos indicados por seus médicos. É recorrente a ocorrência de negativas de cobertura para cirurgias, exames complexos, órteses/próteses e medicamentos de alto custo, além de aumentos abusivos na mensalidade por mudança de faixa etária. A análise jurídica especializada ajuda a verificar a legalidade das negativas e cobranças.',
      quandoProcurar: [
        'Houve negativa de cobertura para cirurgia ou procedimento médico',
        'O plano de saúde recusou o fornecimento de medicamento de alto custo',
        'Foi cobrado reajuste de mensalidade considerado abusivo',
        'O plano impôs carência indevida para atendimento de urgência/emergência',
        'Deseja orientação sobre reembolso de despesas médicas',
      ],
      documentos: [
        'Documento de identidade e CPF',
        'Carteira do plano de saúde e contrato assinado',
        'Pedido médico detalhado com indicação de urgência/emergência',
        'Negativa formal emitida pela operadora (ou número de protocolo)',
        'Comprovantes de pagamento das mensalidades recentes',
        'Laudos, exames e relatórios médicos',
      ],
      faq: [
        { pergunta: 'O plano de saúde pode negar cirurgia prescrita pelo médico?', resposta: 'A indicação do tratamento mais adequado cabe ao médico que acompanha o paciente, não à operadora do plano. Havendo prescrição médica fundamentada e cobertura da especialidade, a negativa pode ser questionada.' },
        { pergunta: 'O que é reajuste por faixa etária nos planos de saúde?', resposta: 'Trata-se de reajuste aplicado quando o beneficiário atinge determinada idade. A legislação e a jurisprudência estabelecem limites para evitar reajustes discriminatórios ou abusivos, especialmente contra idosos, o que deve ser analisado caso a caso.' },
        { pergunta: 'Quanto tempo demora a análise de uma liminar para saúde?', resposta: 'Pedidos liminares de urgência na área da saúde costumam ser analisados de forma prioritária e rápida pelo Judiciário, muitas vezes em poucas horas ou dias, devido ao risco envolvido.' },
      ],
    },
    triagem: {
      label: 'Planos de Saúde',
      perguntas: [
        { id: 'problema', texto: 'Qual é o problema com o plano de saúde?', opcoes: ['Negativa de cirurgia/exame', 'Negativa de medicamento', 'Aumento abusivo da mensalidade', 'Problema com carência', 'Outro'] },
        { id: 'urgente', texto: 'Há indicação médica de urgência ou emergência?', opcoes: ['Sim, com risco à vida', 'Sim, mas está estável', 'Não é urgente', 'Não tenho certeza'] },
        { id: 'negativaEscrita', texto: 'Possui a negativa por escrito ou o protocolo?', opcoes: ['Sim, por escrito', 'Tenho apenas o protocolo', 'Não possuo nenhum', 'Vou solicitar'] },
      ],
    },
    palavrasChave: ['advogado plano de saúde Rio Branco', 'negativa de cirurgia plano de saúde Acre', 'reajuste abusivo plano de saúde advogado'],
  },
  {
    id: 'servidor-publico',
    titulo: 'Servidor Público',
    tituloLp: 'Advogado para Servidor Público em Rio Branco e no Acre',
    subtitulo: 'Direito Administrativo e Estatutário',
    descricao: 'Orientação jurídica para servidores federais, estaduais e municipais do Acre em questões de vencimentos, licenças, aposentadoria, PAD e direitos estatutários.',
    slug: '/servidor-publico-acre',
    icone: 'Briefcase',
    conteudoLp: {
      explicacao: 'Os servidores públicos federais, estaduais e municipais no Acre possuem direitos regulados por estatutos próprios e pela Constituição. Questões relativas a adicionais, licenças especiais, promoções, progressões de carreira, revisão de aposentadoria e defesas em Processo Administrativo Disciplinar (PAD) exigem assessoria jurídica técnica.',
      quandoProcurar: [
        'Foi instaurado Processo Administrativo Disciplinar (PAD) ou sindicância',
        'Ocorreu retenção ou não pagamento de adicionais (insalubridade, noturno, etc.)',
        'Houve indeferimento de licenças (maternidade, prêmio, tratamento de saúde)',
        'Deseja revisar o cálculo de sua aposentadoria estatutária',
        'Foi negada progressão funcional ou promoção devida',
      ],
      documentos: [
        'Documento de identidade e CPF',
        'Últimos contracheques (holerites)',
        'Termo de posse ou ato de nomeação',
        'Cópia integral do PAD ou sindicância (se houver)',
        'Decisão administrativa de indeferimento del direito pleiteado',
        'Histórico funcional e ficha financeira',
      ],
      faq: [
        { pergunta: 'Posso ser demitido em Processo Administrativo Disciplinar (PAD)?', resposta: 'A demissão é a penalidade mais grave e deve observar estritamente os princípios do contraditório, da ampla defesa e da proporcionalidade. A presença de defesa técnica é essencial.' },
        { pergunta: 'O que são progressões funcionais?', resposta: 'São avanços na carreira previstos em lei conforme tempo de serviço ou avaliação de desempenho. Caso a administração atrase ou recuse a progressão cumpridos os requisitos, cabe questionamento.' },
        { pergunta: 'Servidor temporário tem direito a verbas rescisórias?', resposta: 'Depende do regime de contratação e da legislação aplicável. Em algumas situações de contratação irregular ou de natureza específica, há decisões judiciais favoráveis ao recebimento de parcelas.' },
      ],
    },
    triagem: {
      label: 'Servidor Público',
      perguntas: [
        { id: 'esfera', texto: 'Qual é a esfera do seu cargo público?', opcoes: ['Estadual (Acre)', 'Municipal (Rio Branco)', 'Federal', 'Temporário/Contrato', 'Outro'] },
        { id: 'assunto', texto: 'Qual é o assunto do seu caso?', opcoes: ['Processo Disciplinar (PAD)', 'Cobrança de adicionais/verbas', 'Progressão ou Promoção', 'Licenças ou Afastamento', 'Aposentadoria', 'Outro'] },
        { id: 'indeferimento', texto: 'Já possui decisão administrativa negando o pedido?', opcoes: ['Sim', 'Não, está em análise', 'Não entrei com pedido administrativo', 'Não se aplica'] },
      ],
    },
    palavrasChave: ['advogado servidor público Acre', 'direito do servidor público Rio Branco', 'defesa em PAD advogado Rio Branco'],
  },
  {
    id: 'regularizacao-fundiaria',
    titulo: 'Regularização Fundiária',
    tituloLp: 'Regularização Fundiária Urbana e Rural em Rio Branco/AC',
    subtitulo: 'Propriedade, Usucapião e Escrituras',
    descricao: 'Consultoria jurídica para regularização de imóveis urbanos e rurais, ações de usucapião, escrituração, registros de imóveis e assessoria em desapropriações.',
    slug: '/regularizacao-fundiaria-acre',
    icone: 'MapPinned',
    conteudoLp: {
      explicacao: 'Grande parte dos imóveis urbanos e rurais no Acre não possui registro de propriedade definitivo (matrícula/escritura), limitando-se a contratos de gaveta ou posses de fato. A regularização fundiária, seja judicial (usucapião, adjudicação compulsória) ou administrativa (REURB), é fundamental para garantir a segurança da posse, valorizar o patrimônio e permitir financiamentos.',
      quandoProcurar: [
        'Imóvel comprado não possui escritura ou matrícula registrada',
        'Possui a posse do imóvel há anos, mas não é o proprietário legal',
        'Necessita realizar desmembramento, loteamento ou retificação de área',
        'Enfrenta disputa possessória ou ameaça de reintegração de posse',
        'Precisa de assessoria jurídica em processo de desapropriação pelo Estado/Município',
      ],
      documentos: [
        'Documento de identidade e CPF',
        'Contrato de compra e venda (contrato de gaveta) ou cessão de direitos',
        'Comprovantes de pagamento de IPTU (urbano) ou ITR (rural) antigos e atuais',
        'Comprovantes de residência (contas de luz, água) de vários anos no local',
        'Fotos do imóvel e planta/memorial descritivo (se possuir)',
        'Certidão negativa ou positiva do registro de imóveis',
      ],
      faq: [
        { pergunta: 'O que é Usucapião e quando se aplica?', resposta: 'Usucapião é a aquisição da propriedade pelo uso prolongado do imóvel, cumprindo requisitos como tempo de posse mansa, pacífica e sem oposição. Existem várias modalidades urbanas e rurais.' },
        { pergunta: 'Qual a diferença entre posse e propriedade?', resposta: 'A posse é o exercício de fato de alguns dos poderes de proprietário (como morar). A propriedade é a titularidade jurídica registrada no Cartório de Registro de Imóveis.' },
        { pergunta: 'O que é a REURB?', resposta: 'É a Regularização Fundiária Urbana, um procedimento administrativo que visa incorporar núcleos urbanos informais ao ordenamento territorial e outorgar títulos de propriedade.' },
      ],
    },
    triagem: {
      label: 'Imóveis/REURB',
      perguntas: [
        { id: 'tipoImovel', texto: 'Qual o tipo do imóvel?', opcoes: ['Urbano (na cidade)', 'Rural (chácara/fazenda)', 'Loteamento', 'Outro'] },
        { id: 'tempoPosse', texto: 'Há quantos anos você tem a posse do imóvel?', opcoes: ['Menos de 5 anos', 'Entre 5 e 10 anos', 'Entre 10 e 15 anos', 'Mais de 15 anos'] },
        { id: 'documento', texto: 'Que tipo de documento você possui?', opcoes: ['Contrato de compra e venda', 'Recibo de posse', 'Escritura pública sem registro', 'Nenhum documento', 'Outro'] },
      ],
    },
    palavrasChave: ['regularização fundiária Rio Branco', 'usucapião de imóvel Acre advogado', 'escritura de imóvel Rio Branco'],
  },
  {
    id: 'defesa-ambiental-rural',
    titulo: 'Defesa Ambiental Rural',
    tituloLp: 'Defesa Contra Multas e Embargos Ambientais no Acre',
    subtitulo: 'Direito Ambiental e Agrário para Produtores Rurais',
    descricao: 'Assessoria jurídica para produtores rurais do Acre em autuações, multas e embargos do IMAC, Ibama, ICMBio, além de regularização ambiental da propriedade (CAR e PRA).',
    slug: '/defesa-ambiental-rural-acre',
    icone: 'Leaf',
    conteudoLp: {
      explicacao: 'Produtores rurais e proprietários de terras no Acre frequentemente lidam com fiscalizações de órgãos ambientais (IMAC, Ibama, ICMBio). A aplicação de auto de infração, multa administrativa, embargo de atividades ou apreensão de bens exige defesa administrativa célere e fundamentada, bem como assessoria na regularização da propriedade rural perante o Cadastro Ambiental Rural (CAR).',
      quandoProcurar: [
        'Recebeu auto de infração ou notificação do IMAC, Ibama ou ICMBio',
        'A propriedade rural teve atividades ou áreas embargadas pelos órgãos ambientais',
        'Foi intimado em Inquérito Civil Público para apurar dano ambiental',
        'Necessita de assessoria para assinatura de Termo de Compromisso Ambiental (TCA/TAC)',
        'Precisa regularizar o Cadastro Ambiental Rural (CAR) com pendências',
      ],
      documentos: [
        'Documento de identidade e CPF do proprietário/possuidor',
        'Cópia integral do Auto de Infração e Termo de Embargo',
        'Documento da propriedade (Matrícula, Título definitivo ou Contrato de posse)',
        'Cadastro Ambiental Rural (CAR) e memorial descritivo',
        'Fotos da área objeto da autuação',
        'Relatórios ou pareceres técnicos de engenheiro florestal/agrônomo (se houver)',
      ],
      faq: [
        { pergunta: 'Qual o prazo para apresentar defesa contra multa ambiental?', resposta: 'O prazo geral é de 20 dias a contar da ciência do auto de infração, mas pode variar de acordo com o órgão autuador. É essencial agir rápido para evitar revelia.' },
        { pergunta: 'O que acontece se eu desobedecer um termo de embargo?', resposta: 'A desobediência a embargo é infração administrativa autônoma, gera novas multas diárias e pode configurar crime ambiental de desobediência, agravando a situação jurídica.' },
        { pergunta: 'O que é o CAR (Cadastro Ambiental Rural)?', resposta: 'É um registro público eletrônico obrigatório para todos os imóveis rurais, destinado a integrar as informações ambientais das propriedades rurais para controle e combate ao desmatamento.' },
      ],
    },
    triagem: {
      label: 'Defesa Ambiental',
      perguntas: [
        { id: 'orgao', texto: 'Qual órgão realizou a autuação ou fiscalização?', opcoes: ['IMAC (Estadual)', 'IBAMA (Federal)', 'ICMBio (Federal)', 'Polícia Ambiental', 'Outro/Não sei'] },
        { id: 'medida', texto: 'Qual medida foi aplicada contra você?', opcoes: ['Apenas Auto de Infração (multa)', 'Auto de Infração + Embargo da área', 'Apenas Notificação', 'Apreensão de bens/maquinário', 'Outro'] },
        { id: 'prazoDefesa', texto: 'Faz quantos dias que você tomou ciência da autuação?', opcoes: ['Menos de 10 dias', 'Entre 10 e 20 dias', 'Mais de 20 dias', 'Ainda não fui autuado formalmente'] },
      ],
    },
    palavrasChave: ['defesa multa ambiental IMAC Acre', 'embargo de terra Ibama advogado Rio Branco', 'direito ambiental rural Acre'],
  },
];

