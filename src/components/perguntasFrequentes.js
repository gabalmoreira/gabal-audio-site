const perguntasFrequentes = [
    {
      pergunta: "Qual o valor da locação dos equipamentos?",
      resposta: "Os valores apresentados correspondem a uma diária de locação de cada equipamento. O valor é 'estimado', pois a finalização do orçamento é realizado após o cálculo da taxa de deslocamento (se houver)."
    },
    {
      pergunta: "Como faço para solicitar um orçamento?",
      resposta: "Selecione os equipamentos e as quantidades desejadas e preencha os campos com seus dados e a data do evento. Clique em 'Enviar orçamento pelo WhatsApp' para nos enviar sua solicitação."
    },
    {
      pergunta: "Os equipamentos já incluem os cabos e acessórios necessários?",
      resposta: "Sim, todos os equipamentos são fornecidos com os cabos e acessórios básicos para sua utilização. Caso necessite de algum item específico, mencione no seu orçamento."
    },
    {
      pergunta: "Vocês realizam a montagem e desmontagem dos equipamentos no local do evento?",
      resposta: "Sim, para sua comodidade, geralmente oferecemos o serviço completo de montagem, desmontagem e configuração dos equipamentos como cortesia. Queremos garantir que tudo esteja perfeito para o seu evento sem preocupações adicionais. Apenas em casos onde o local do evento seja significativamente distante do centro da cidade, pode ser cobrada uma pequena taxa adicional para cobrir os custos de deslocamento da nossa equipe. Consulte-nos ao solicitar seu orçamento para verificar as condições para o seu evento específico."
    },
    {
      pergunta: "Qual o prazo mínimo de locação?",
      resposta: "O prazo mínimo de locação é de uma diária. Para períodos mais longos, podemos oferecer condições especiais. Entre em contato para conversarmos sobre as necessidades do seu evento."
    },
    {
      pergunta: "Não encontrei o equipamento que preciso na lista. Vocês não têm mais opções disponíveis?",
      resposta: "Sentimos não encontrar exatamente o que você procura em nossa listagem inicial. Para garantir que seu evento tenha a sonorização e iluminação perfeitas, colaboramos com uma rede de parceiros confiáveis. Se a configuração ideal para sua necessidade específica não estiver visível, não hesite em nos contatar! Explique detalhadamente o que você precisa e faremos o possível para encontrar a solução ideal através de nossos parceiros. Estamos aqui para ajudar a tornar seu evento um sucesso!"
    },
    {
      pergunta: "Qual a região de atendimento?",
      resposta: "Atendemos na região metropolitana de Goiânia."
    },
    {
      pergunta: "Qual a forma de pagamento?",
      resposta: `<strong>Para reservar a data:</strong><br/> Solicitamos um valor de entrada (30%) na assinatura do contrato. O saldo restante (70%) pode ser pago de forma parcelada sem juros (via PIX, boleto, transferência ou depósito), desde que a quitação total ocorra até 5 dias antes da data do evento.<br/><br/>
      Para contratos firmados com menos de 5 dias de antecedência da realização do evento, o pagamento integral será necessário no momento da reserva.<br/><br/>
      <strong>Por que o pagamento total é solicitado antes do evento?</strong><br/>
      - O pagamento integral antes do evento é uma prática padrão, alinhada com as condições de pagamento dos nossos parceiros e colaboradores.<br/>
      - Nosso contrato oferece garantias de entrega dos serviços e equipamentos, além de prever condições para devoluções e multas em diversas situações.<br/>
      A ausência do pagamento total antes do evento pode gerar impasses, como:<br/>
      - Dificuldade em realizar o pagamento no local do evento antes da montagem.<br/>
      - Restrições de tempo para montadores aguardarem o pagamento, devido a outros compromissos.<br/>
      - Problemas com sistemas de pagamento no dia do evento (limites de transação, indisponibilidade do sistema, etc.).<br/>
      - Inconvenientes de cobranças em momentos de celebração.<br/><br/>
      Nosso contrato estabelece o direito de suspender ou não realizar a entrega dos serviços e equipamentos em caso de pendências financeiras, visando evitar transtornos tanto para o cliente quanto para nossa equipe e parceiros. Priorizamos que o dia do seu evento seja dedicado à celebração e a diversão, livre de questões contratuais pendentes.`
    },
    {
      pergunta: "Quando os equipamentos estarão reservados para mim?",
      resposta: "Os equipamentos só serão reservados de forma definitiva após a confirmação do pagamento do sinal. Antes disso, as datas seguem disponíveis para outros orçamentos. Por isso, recomendamos garantir sua reserva o quanto antes para não correr o risco de perder a disponibilidade!"
    },
    {
      pergunta: "Quais tipos de eventos vocês atendem?",
      resposta: "Atendemos desde eventos pequenos, como aniversários e apresentações, até eventos corporativos, shows e festas de médio porte. Temos soluções para sonorização, iluminação e DJ, tudo adaptado à sua necessidade."
    },
    {
      pergunta: "Posso alugar apenas um item ou é necessário fechar um pacote?",
      resposta: "Sim! Você pode alugar um único item ou montar o seu combo ideal. Não exigimos quantidade mínima — você escolhe exatamente o que precisa."
    },
    {
      pergunta: "Os equipamentos são compatíveis com qualquer fonte de energia?",
      resposta: "Não. Cada equipamento possui sua especificação, sendo a maioria 220V. Se atente para não danificar os equipamentos."
    },
    {
      pergunta: "Como saber qual caixa de som é ideal para o meu evento?",
      resposta: "Se você tiver dúvidas, entre em contato conosco! Podemos te orientar com base no número de pessoas, local do evento e tipo de uso (música ambiente, voz, show, etc.)."
    },
    {
      pergunta: "Como saber qual caixa de som é ideal para o meu evento?",
      resposta: "Se você tiver dúvidas, entre em contato conosco! Podemos te orientar com base no número de pessoas, local do evento e tipo de uso (música ambiente, voz, show, etc.)."
    },
    {
      pergunta: "Consigo alterar a data da minha reserva depois de feita?",
      resposta: "Sim, caso a nova data ainda esteja disponível. Recomendamos informar com antecedência para verificarmos a disponibilidade dos itens desejados."
    },
    {
      pergunta: "A reserva é automática após preencher o orçamento no site?",
      resposta: "Ainda não. Após preencher seu orçamento e enviar para nosso WhatsApp, estabeleceremos contato para confirmar detalhe e validar a reserva mediante pagamento do sinal."
    },
    {
      pergunta: "Posso reservar com antecedência de quantos dias?",
      resposta: "Recomendamos o quanto antes! Mas aceitamos reservas com até 6 meses de antecedência."
    },
    {
      pergunta: "Posso pagar apenas no dia do evento?",
      resposta: "ão. É necessário o pagamento de um sinal antecipado para efetivar a reserva. O restante pode ser pago até o momento da montagem."
    },
    {
      pergunta: "Tem suporte técnico durante o evento?",
      resposta: "Depende do tipo de evento e da contratação. Em eventos mais complexos, oferecemos suporte técnico no local para garantir que tudo corra bem."
    },
    {
      pergunta: "E se algum equipamento parar de funcionar durante o uso?",
      resposta: "Nossos equipamentos são testados antes do evento, mas caso ocorra algum problema, disponibilizamos suporte remoto imediato e, quando aplicável, técnico presencial de prontidão."
    },
    {
      pergunta: "Vocês oferecem condições especiais para eventos que duram vários dias?",
      resposta: "Sim! Temos pacotes personalizados para eventos de dois dias ou mais. Os valores são ajustados com base na quantidade de dias, logística envolvida e necessidade de suporte técnico. Fale conosco para montar um orçamento sob medida com condições mais vantajosas!"
    },


  ];

  export default perguntasFrequentes;