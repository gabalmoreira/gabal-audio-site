// Equipamentos.js - Exemplo de um arquivo de dados sem usar useState

const equipamentos = [
  {
    id: "SOM01",
    categoria: "SOM",
    nome: "Caixa de Grave Ativa 18\" 1000W \nAttack VRS-1810A",
    preco: 300,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/subwoofer vrs-1810a.jpg",
    descricao: "Sinta a potência vibrante que transforma qualquer evento! Com 1000W de puro grave, a Attack VRS-1810A entrega um reforço sonoro profundo e impactante, essencial para envolver seus convidados em eventos de médio a grande porte. Experimente a excelência na reprodução de baixas frequências, garantindo que cada batida seja sentida, da pista de dança ao palco."
  },
  {
    id: "SOM02",
    categoria: "SOM",
    nome: "Caixa de Grave Passiva 18\" 800W \nAttack VRS-1880",
    preco: 300,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/caixa-grave-attack-vrs1880.jpg",
    descricao: "Para quem busca graves que realmente fazem a diferença, a Attack VRS-1880 é a escolha inteligente. Com 800W de potência passiva, ela complementa seu sistema de som, especialmente quando utilizada com a ativa VRS-1810A, criando uma experiência sonora imersiva com graves profundos e bem definidos. Amplie a intensidade sonora do seu evento e deixe a música envolver a todos."
  },
  {
    id: "SOM03",
    categoria: "SOM",
    nome: "Caixa de Grave Ativa 12\" 2000W \nOversound",
    preco: 250,
    max: 2,
    imagem: process.env.PUBLIC_URL + "/images/caixa-grave-oversound-12.jpg",
    descricao: "Pequena no tamanho, GIGANTE na potência! A Caixa Ativa 12\" Oversound entrega incríveis 2000W em um formato compacto. Perfeita para eventos em ambientes internos e médios espaços onde a potência e a praticidade são essenciais. Surpreenda seus convidados com um som encorpado e de alta definição, mesmo em espaços mais intimistas."
  },
  {
    id: "SOM04",
    categoria: "SOM",
    nome: "Caixa Ativa 15\" 500W \nAttack VRF-1550A",
    preco: 250,
    max: 2,
    imagem: process.env.PUBLIC_URL + "/images/caixa-ativa-attack-vrf1550a.jpg",
    descricao: "A Attack VRF-1550A é a solução sonora completa para seus eventos de médio porte. Com 500W de potência ativa, ela oferece uma resposta sonora equilibrada, com médios definidos e graves presentes, garantindo que a música e a voz cheguem com clareza a todos os cantos. Versatilidade e eficiência em um único equipamento para uma experiência sonora impecável."
  },
  {
    id: "SOM05",
    categoria: "SOM",
    nome: "Caixa Passiva 15\" 500W \nAttack VRF-1530",
    preco: 250,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/caixa-passiva-attack-vrf1530.jpg",
    descricao: "Construída para performance e durabilidade, a Caixa Passiva 15\" Attack VRF-1530 oferece uma excelente dispersão sonora, preenchendo o ambiente com áudio de qualidade. Ideal para integrar seu sistema com amplificadores ou em conjunto com a ativa VRF-1550A, proporcionando um som robusto e envolvente para o seu evento."
  },
  {
    id: "SOM06",
    categoria: "SOM",
    nome: "Caixa Ativa 12\" 1000W \nYamaha DBR-12",
    preco: 250,
    max: 2,
    imagem: process.env.PUBLIC_URL + "/images/yamaha-dbr12.jpg",
    descricao: "Experimente a renomada qualidade sonora Yamaha com a DBR-12. Com 1000W de potência ativa, esta caixa é sinônimo de clareza e fidelidade na reprodução de áudio. Se a sua prioridade são vocais nítidos e instrumentos bem definidos, a DBR-12 é a escolha confiável para garantir uma experiência sonora profissional em seu evento."
  },
  {
    id: "SOM07",
    categoria: "SOM",
    nome: "Retorno Ativo 12\" 300W \nAttack VRM-1230A",
    preco: 200,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/retorno-ativo-attack-vrm1230a.jpg",
    descricao: "Garanta que cada artista se ouça com perfeita clareza no palco! O Retorno Ativo 12\" Attack VRM-1230A, com seus 300W de potência, oferece a definição sonora essencial para vocalistas e instrumentistas performarem com confiança. Um monitor robusto e eficiente para palcos e ensaios de todos os níveis."
  },
  {
    id: "SOM08",
    categoria: "SOM",
    nome: "Retorno Passivo 12\" 300W \nAttack VRM-1220",
    preco: 200,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/retorno-passivo-attack-vrm1220.jpg",
    descricao: "Para um monitoramento de palco confiável e consistente, o Retorno Passivo 12\" Attack VRM-1220 é a solução ideal. Com performance estável e a flexibilidade de uso com amplificadores externos ou integrado ao seu sistema ativo (VRM-1230A), ele garante que os artistas tenham um feedback sonoro preciso durante toda a apresentação."
  },
  {
    id: "SOM09",
    categoria: "SOM",
    nome: "Sistema de Som Torre \nElectro-Voice Evolve30M",
    preco: 600,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/evolve30m.jpg",
    descricao: "Leve a potência sonora com você! O Sistema de Som Torre Electro-Voice Evolve30M combina um som potente e de alta qualidade com uma portabilidade incrível. Com mixer integrado e Bluetooth, ele é a solução completa e prática para eventos onde a facilidade de transporte e a qualidade sonora são cruciais. Prepare-se para um som que preenche o ambiente sem complicação. Esse valor corresponde a uma unidade do conjunto (1 Subwoofer + 1 Conjunto de alto falantes para médio e agudos)"
  },
  {
    id: "SOM10",
    categoria: "SOM",
    nome: "Par de microfones sem fio \nArmer AX-802m",
    preco: 150,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/microfone-armer-ax802m.jpg",
    descricao: "Liberdade de movimento com qualidade de áudio impecável! O Par de Microfones Sem Fio Armer AX-802m oferece ótimo alcance e clareza vocal, essenciais para cerimônias emocionantes, apresentações impactantes e eventos corporativos profissionais. Garanta que cada palavra seja ouvida com nitidez e sem interferências."
  },
  {
    id: "SOM11",
    categoria: "SOM",
    nome: "Par de microfones sem fio \nKadosh K482m",
    preco: 125,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/microfone-kadosh-k482m.jpg",
    descricao: "Para quem busca confiabilidade e simplicidade, o Par de Microfones Sem Fio Kadosh K482m é a escolha certa. Fácil de usar e com transmissão estável, ele é perfeito para eventos casuais e profissionais leves, garantindo que sua voz seja amplificada com clareza e sem complicações."
  },
  {
    id: "DJ01",
    categoria: "DJ",
    nome: "Controladora \nPioneer DDJ-400",
    preco: 200,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/pioneer-ddj400.jpg",
    descricao: "Comece sua jornada no mundo do DJing com a ferramenta perfeita! A Controladora Pioneer DDJ-400 oferece uma interface intuitiva e amigável, ideal para DJs iniciantes e intermediários explorarem sua criatividade. A compatibilidade nativa com o software Rekordbox facilita o aprendizado e a performance, colocando você no controle da festa em instantes."
  },
  {
    id: "DJ02",
    categoria: "DJ",
    nome: "Misturador \nPioneer DJM-900NXS2",
    preco: 300,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/pioneer-djm900nxs2.jpg",
    descricao: "Eleve seu set a um novo patamar com a mesa de som profissional Pioneer DJM-900NXS2. Reconhecida como padrão em grandes eventos e clubes internacionais, ela oferece desempenho de ponta e recursos avançados para DJs que buscam a máxima qualidade sonora e controle total sobre a mixagem. Prepare-se para dominar a pista com uma ferramenta lendária."
  },
  {
    id: "DJ03",
    categoria: "DJ",
    nome: "Controlador \nPioneer XDJ-1000MK2",
    preco: 200,
    max: 2,
    imagem: process.env.PUBLIC_URL + "/images/pioneer-xdj1000mk2.jpg",
    descricao: "Explore novas possibilidades criativas com o controlador profissional Pioneer XDJ-1000MK2. Sua tela sensível ao toque intuitiva, o suporte completo ao software Rekordbox e a excelente resposta dos controles proporcionam uma experiência de performance fluida e precisa. Leve sua arte a um novo nível com um equipamento projetado para os DJs mais exigentes."
  },
  {
    id: "DJ04",
    categoria: "DJ",
    nome: "Setup 1 DJ:\n1 DJM-900NXS2 + 2x XDJ-1000MK2",
    preco: 600,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/setup-dj-completo.jpg",
    descricao: "O arsenal definitivo para o DJ profissional! Este setup completo inclui a mesa de som Pioneer DJM-900NXS2 e dois controladores XDJ-1000MK2, o padrão de excelência em clubes e grandes eventos ao redor do mundo. Desfrute de performance incomparável, qualidade sonora superior e integração perfeita para criar sets inesquecíveis e dominar qualquer pista."
  },
  {
    id: "LUZ01",
    categoria: "LUZ",
    nome: "Mini Moving-Head 12W",
    preco: 50,
    max: 2,
    imagem: process.env.PUBLIC_URL + "/images/mini-moving-head.jpg",
    descricao: "Adicione movimento e energia à sua iluminação cênica! O Mini Moving-Head 12W é compacto, eficiente e capaz de criar efeitos dinâmicos surpreendentes. Totalmente controlável via mesa DMX, ele permite personalizar a atmosfera do seu evento, desde cores vibrantes a padrões de luz envolventes."
  },
  {
    id: "LUZ02",
    categoria: "LUZ",
    nome: "Refletor Parled RGB 36W",
    preco: 30,
    max: 8,
    imagem: process.env.PUBLIC_URL + "/images/parled-rgb-36w.jpg",
    descricao: "Transforme a atmosfera do seu evento com cores vibrantes! O Refletor Parled RGB 36W é perfeito para ambientação e para destacar áreas específicas com a tonalidade desejada. Totalmente controlável via mesa DMX, ele oferece infinitas possibilidades de cores para criar o clima perfeito para cada momento."
  },
  {
    id: "LUZ03",
    categoria: "LUZ",
    nome: "Máquina de Fumaça 2000W",
    preco: 150,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/maquina-fumaca-2000w.jpg",
    descricao: "Crie uma atmosfera mágica e intensifique os efeitos de iluminação do seu evento com a Máquina de Fumaça 2000W. Essencial para envolver seus convidados e dar um toque especial à pista de dança ou ao palco. Totalmente controlável via mesa DMX, permitindo sincronizar a fumaça com o ritmo da música e os efeitos de luz."
  },
  {
    id: "LUZ04",
    categoria: "LUZ",
    nome: "Mesa DMX Operator 512 canais",
    preco: 50,
    max: 1,
    imagem: process.env.PUBLIC_URL + "/images/mesa-dmx-operator.jpg",
    descricao: "Assuma o controle total da sua iluminação profissional com a Mesa DMX Operator de 512 canais. Uma ferramenta essencial para gerenciar e sincronizar diversos equipamentos de luz, permitindo criar shows de iluminação complexos e impressionantes. Liberte sua criatividade e transforme seu evento em um espetáculo visual!"
  }
];

export default equipamentos;
