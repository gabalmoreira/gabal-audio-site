import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import moment from 'moment';
import logo from './images/logo-gabal.png'; // Importe sua imagem de logo (ajuste o caminho)
import fotoGabal from './images/foto-gabal.jpg'; // Importe sua foto (ajuste o caminho)
import DatePicker from 'react-datepicker';
import { parse, isValid, format } from 'date-fns';
import { FaWhatsapp } from 'react-icons/fa'; // Importe o ícone do WhatsApp do React Icons
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { useRef } from 'react'; // Já deve ter, mas reforçando
import { FaTrash } from 'react-icons/fa';
import equipamentos from './components/equipamentos'
import perguntasFrequentes from './components/perguntasFrequentes'
import Header from './Header';

registerLocale("pt-BR", ptBR);

function EstoqueEquipamentos() {
  const [equipamentosState, setEquipamentosState] = useState(equipamentos);

  return (
    <div>
      {equipamentosState.map((equipamento, index) => (
        <div key={index}>
          <h2>{equipamento.nome}</h2>
          <p>{equipamento.descricao}</p>
        </div>
      ))}
    </div>
  );
}

function App() {

  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const nomeRef = useRef(null);
  const localRef = useRef(null);
  const dataRef = useRef(null);
  const [reservas, setReservas] = useState([]); // Reservas obtidas da Google Sheets ou de um backend

  useEffect(() => {
    // Quando a data muda:
    // 1. Esvaziar o carrinho
    setCarrinho([]);
    setQuantidades(Array(equipamentos.length).fill(""));
    setErros(Array(equipamentos.length).fill(false));

    // 2. Atualizar reservas
    console.log("Data selecionada:", data);
    consultarReservas();
  }, [data]);




  const consultarReservas = async () => {
    const SHEET_ID = "1RRDm8QhFriucaARH_IX8oMjepsBGnc3OFWS_srcSVCs";
    const API_KEY = "AIzaSyDSxMBMrzsYw7BOUKlH3rOaMbSmXbYACdo";
    const RANGE = "Reservas!A2:E";

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      console.log("🔄 Consultando planilha do Google Sheets...");

      const response = await fetch(url);
      const dataAPI = await response.json();

      if (!dataAPI.values) {
        console.warn("⚠️ Nenhum dado retornado da planilha.");
        setReservas([]);
        return;
      }

      const todasAsReservas = dataAPI.values.map((linha) => ({
        id_reserva: linha[0] || "",
        data: linha[1] || "",
        id_equipamento: linha[2] || "",
        nome: linha[3] || "",
        quantidade: parseInt(linha[4], 10) || 0
      }));

      // ➕ Normalizar data para dd-MM-yyyy
      const normalizarData = (str) => {
        const limpa = str.replace(/\//g, "-").trim();
        const parsed = parse(limpa, 'dd-MM-yyyy', new Date());
        return isValid(parsed) ? format(parsed, 'dd-MM-yyyy') : '';
      };

      const dataFormatada = normalizarData(data);
      const reservasFiltradas = todasAsReservas.filter(r => normalizarData(r.data) === dataFormatada);

      console.log("✅ Reservas carregadas da planilha:", reservasFiltradas);
      setReservas(reservasFiltradas);
    } catch (error) {
      console.error("❌ Erro ao consultar planilha do Google Sheets:", error);
      setReservas([]);
    }
  };

  // useEffect para monitorar quando o estado de reservas mudar
  useEffect(() => {
    console.log("Reservas após atualização do estado:", reservas); // Verifique o estado atualizado
  }, [reservas]); // Esse useEffect será chamado sempre que reservas for atualizado

  const calcularQuantidadeDisponivel = (equipamento) => {
    const reservasDoEquipamento = reservas.filter(
      (reserva) => reserva.id_equipamento === equipamento.id
    );

    const quantidadeReservada = reservasDoEquipamento.reduce(
      (total, reserva) => total + reserva.quantidade,
      0
    );

    const quantidadeDisponivel = equipamento.max - quantidadeReservada;

    return quantidadeDisponivel >= 0 ? quantidadeDisponivel : 0;
  };



  const [modalInfoAberto, setModalInfoAberto] = useState(false);
  const [mostrarModalDescricao, setMostrarModalDescricao] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [local, setLocal] = useState("");
  const dadosEventoPreenchidos = () => {
    return nome.trim() !== "" && local.trim() !== "" && data.trim() !== "";
  };
  const [quantidades, setQuantidades] = useState(Array(equipamentos.length).fill(""));
  const [erros, setErros] = useState(Array(equipamentos.length).fill(false));
  const [infoVisivel, setInfoVisivel] = useState(Array(equipamentos.length).fill(false));
  const [startDate, setStartDate] = useState(null); // Estado para controlar a data
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

  const [formTocados, setFormTocados] = useState({ nome: false, local: false, data: false });
  const [formErros, setFormErros] = useState({ nome: false, local: false, data: false });

  useEffect(() => {
    setFormErros({
      nome: formTocados.nome && !nome.trim(),
      local: formTocados.local && !local.trim(),
      data: formTocados.data && !data.trim(),
    });
  }, [nome, local, data, formTocados]);

  const [carrinho, setCarrinho] = useState([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false); // Novo estado para controlar a visibilidade
  const [animatingImage, setAnimatingImage] = useState(null);
  const [mainContainerClass, setMainContainerClass] = useState('');
  const [imagemAmpliada, setImagemAmpliada] = useState(null);
  const [imagemAmpliadaAlt, setImagemAmpliadaAlt] = useState('');
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);
  const [carrinhoAbertoAutomaticamente, setCarrinhoAbertoAutomaticamente] = useState(false);
  useEffect(() => {
    if (isMiniCartOpen) {
      setMainContainerClass('mini-cart-open');
    } else {
      setMainContainerClass('');
    }
  }, [isMiniCartOpen]);
  const [itemRemovendo, setItemRemovendo] = useState(null);
  const [itemParaRemover, setItemParaRemover] = useState(null);
  const [mostrarModalRemoverItem, setMostrarModalRemoverItem] = useState(false);
  const abrirModalRemoverItem = (item) => {
    setItemParaRemover(item); // Define o item a ser removido
    setMostrarModalRemoverItem(true); // Exibe o modal de confirmação
  };
  const removerItemConfirmado = () => {
    setCarrinho(carrinho.filter((item) => item.nome !== itemParaRemover.nome)); // Remove o item do carrinho
    setMostrarModalRemoverItem(false); // Fecha o modal de remoção
    setItemParaRemover(null); // Limpa o item a ser removido

    // Limpa a quantidade do item removido no estado "quantidades"
    const updatedQuantidades = [...quantidades];
    const itemIndexToUpdate = equipamentos.findIndex((equipamento) => equipamento.nome === itemParaRemover.nome);
    if (itemIndexToUpdate !== -1) {
      updatedQuantidades[itemIndexToUpdate] = ""; // Zera a quantidade do item no estado
      setQuantidades(updatedQuantidades); // Atualiza o estado de quantidades
    }

    // ✅ Mostra o toast de remoção
    toast.info(`${itemParaRemover.nome} removido do carrinho.`);
  };

  const cancelarRemocaoItem = () => {
    setMostrarModalRemoverItem(false); // Fecha o modal
    setItemParaRemover(null); // Limpa o item a ser removido
  };
  const botaoCarrinhoRef = useRef(null);

  const [modalEnviando, setModalEnviando] = useState(false);

  const removerItemDoCarrinho = (itemParaRemover) => {
    const itemIndex = carrinho.findIndex(item => item.nome === itemParaRemover.nome);
    if (itemIndex === -1) return;

    // Aplica a classe de animação
    const carrinhoAnimado = carrinho.map((item, index) =>
      index === itemIndex ? { ...item, removendo: true } : item
    );
    setCarrinho(carrinhoAnimado);

    // Força um repaint antes do setTimeout (essencial para CSS aplicar)
    requestAnimationFrame(() => {
      setTimeout(() => {
        setCarrinho(carrinho => carrinho.filter(item => item.nome !== itemParaRemover.nome));

        const updatedQuantidades = [...quantidades];
        const itemIndexToUpdate = equipamentos.findIndex((equipamento) => equipamento.nome === itemParaRemover.nome);
        if (itemIndexToUpdate !== -1) {
          updatedQuantidades[itemIndexToUpdate] = 0;
          setQuantidades(updatedQuantidades);
        }

        toast.info(`${itemParaRemover.nome} removido do carrinho.`);
      }, 400); // tempo da animação
    });
  };

  const confirmarEsvaziarCarrinho = () => {
    // Esvaziar o carrinho e resetar as quantidades
    setCarrinho([]); // Limpa o carrinho
    setQuantidades(Array(equipamentos.length).fill("")); // Resetar as quantidades
    setItemRemovendo(null); // Reseta a variável de item removido
    setMostrarConfirmacaoEsvaziar(false); // Fecha o modal de confirmação
  };

  const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '2px solid #ddd',
    color: '#555',
    fontSize: 16,
  };

  const tableRowStyle = {
    borderBottom: '1px solid #eee',

  };

  const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center', // Para centralizar horizontalmente
    verticalAlign: 'middle', // Para centralizar verticalmente
    fontWeight: 'bold', // Para deixar o número em negrito
    backgroundColor: '#f9f9f9', // Um fundo suave para a célula
    borderRadius: '8px', // Bordas arredondadas para um design mais moderno
    color: '#333', // Cor do texto
    fontSize: '16px', // Tamanho de fonte mais adequado para a célula
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Sombra suave para dar destaque à célula
  };

  const buttonClickEffect = {
    opacity: 0.7,
    transition: 'opacity 0.1s ease-in-out',
  };

  const atualizarCarrinho = (itemDoEquipamento, quantidade, onRemover) => {
    const itemExistente = carrinho.find((i) => i.nome === itemDoEquipamento.nome);

    if (quantidade > 0) {
      if (itemExistente) {
        setCarrinho(
          carrinho.map((i) =>
            i.nome === itemDoEquipamento.nome ? { ...i, quantidade } : i
          )
        );
      } else {
        setCarrinho([
          ...carrinho,
          {
            nome: itemDoEquipamento.nome,
            quantidade: quantidade || 1,
            preco: itemDoEquipamento.preco,
            imagem: itemDoEquipamento.imagem,
          },
        ]);
      }
    } else {
      // ✅ Quantidade 0 → remover do carrinho e exibir toast
      setCarrinho(carrinho.filter((i) => i.nome !== itemDoEquipamento.nome));
      if (onRemover) onRemover(); // Chama callback de remoção
    }
  };

  const [mostrarConfirmacaoEsvaziar, setMostrarConfirmacaoEsvaziar] = useState(false);
  const [confirmarEsvaziarCallback, setConfirmarEsvaziarCallback] = useState(null);

  const handleIncrement = (i, e) => {
    if (!dadosEventoPreenchidos()) {
      const novosErros = {
        nome: nome.trim() === "",
        local: local.trim() === "",
        data: data.trim() === ""
      };
      setFormErros(novosErros);

      if (novosErros.nome) {
        nomeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.local) {
        localRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.data) {
        dataRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return;
    }

    const currentValue = parseInt(quantidades[i], 10) || 0;
    const maxQuantity = calcularQuantidadeDisponivel(equipamentos[i]);

    if (currentValue < maxQuantity) {
      const novaQuantidade = currentValue + 1;
      const novasQuantidades = [...quantidades];
      novasQuantidades[i] = novaQuantidade;
      setQuantidades(novasQuantidades);
      atualizarCarrinho(equipamentos[i], novaQuantidade);

      const novosErros = [...erros];
      novosErros[i] = false;
      setErros(novosErros);

      if (!isCarrinhoAberto) {
        setIsCarrinhoAberto(true);
        setIsMiniCartOpen(true);
      }

      flyToCart(e, equipamentos[i].imagem);

      // ✅ Adiciona o toast
      toast.success(`${equipamentos[i].nome} adicionado ao orçamento!`);
    } else {
      const novosErros = [...erros];
      novosErros[i] = true;
      setErros(novosErros);
    }
  };

  const botaoQtdStyle = (tipo) => ({
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: tipo === "-" ? '5px 0 0 5px' : '0 5px 5px 0',
    padding: '0 10px',
    fontSize: '14px',
    height: '30px',
    lineHeight: '30px',
    boxSizing: 'border-box',
    opacity: dadosEventoPreenchidos() ? 1 : 0.5,
    cursor: dadosEventoPreenchidos() ? 'pointer' : 'not-allowed',
  });

  const handleDecrement = (i) => {
    if (!dadosEventoPreenchidos()) {
      const novosErros = {
        nome: nome.trim() === "",
        local: local.trim() === "",
        data: data.trim() === ""
      };
      setFormErros(novosErros);

      if (novosErros.nome) {
        nomeRef.current?.focus();
        nomeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.local) {
        localRef.current?.focus();
        localRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.data) {
        dataRef.current?.focus();
        dataRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return;
    }

    const currentValue = parseInt(quantidades[i], 10) || 0;

    if (currentValue > 0) {
      const novaQuantidade = currentValue - 1;
      const novasQuantidades = [...quantidades];
      novasQuantidades[i] = novaQuantidade;
      setQuantidades(novasQuantidades);
      atualizarCarrinho(equipamentos[i], novaQuantidade);

      const novosErros = [...erros];
      novosErros[i] = false;
      setErros(novosErros);

      // ✅ Toast com mensagem condicional
      if (novaQuantidade === 0) {
        toast.info(`${equipamentos[i].nome} removido do orçamento.`);
      } else {
        toast.info(`${equipamentos[i].nome}: quantidade reduzida para ${novaQuantidade}.`);
      }
    }
  };

  const handleIncrementTable = (item) => {
    setCarrinho((prevCarrinho) => {
      return prevCarrinho.map((i) => {
        if (i.nome === item.nome) {
          const newQuantity = i.quantidade + 1;
          if (newQuantity <= item.max) {
            return { ...i, quantidade: newQuantity }; // Atualiza a quantidade do item
          }
        }
        return i;
      });
    });
  };

  // Função de decremento
  const handleDecrementTable = (item) => {
    const newCarrinho = carrinho.map((i) => {
      if (i.nome === item.nome) {
        const newQuantity = i.quantidade - 1;
        if (newQuantity >= 0) { // Verifica se a quantidade não é negativa
          return { ...i, quantidade: newQuantity }; // Atualiza a quantidade do item
        }
      }
      return i; // Retorna item inalterado
    });

    setCarrinho(newCarrinho); // Atualiza o carrinho
  };

  const handleQuantidadeChange = (e, i) => {
    if (!dadosEventoPreenchidos()) {
      setFormErros({
        nome: nome.trim() === "",
        data: data.trim() === "",
        local: local.trim() === "",
      });
      return;
    }

    const valor = e.target.value;

    if (/^\d*$/.test(valor)) {
      const novoValor = parseInt(valor) || 0;
      const valorAnterior = parseInt(quantidades[i]) || 0;

      const novasQuantidades = [...quantidades];
      novasQuantidades[i] = novoValor;
      setQuantidades(novasQuantidades);

      atualizarCarrinho(equipamentos[i], novoValor);

      // Lógica dos Toasts
      if (valorAnterior === 0 && novoValor > 0) {
        toast.success(`${equipamentos[i].nome} adicionado ao carrinho.`);
      } else if (valorAnterior > 0 && novoValor === 0) {
        toast.info(`${equipamentos[i].nome} removido do carrinho.`);
      }
    }
  };


  const abrirModalConfirmacaoEsvaziar = (callback) => {
    setMostrarConfirmacaoEsvaziar(true);
    setConfirmarEsvaziarCallback(() => callback);
  };

  useEffect(() => {
    const novoSubtotal = equipamentos.reduce((acc, item, index) => {
      const quantidade = parseInt(quantidades[index]) || 0;
      return acc + quantidade * item.preco;
    }, 0);
    setSubtotal(novoSubtotal);
  }, [quantidades]);

  const contatoGabal = {
    nome: "Fale com o Gabriel",
    telefone: "(62) 99246-1404",
    email: "comercial@gabal.com.br",
    mensagemBotao: "Falar com nossa equipe",
    imagem: fotoGabal // Adicione o caminho da sua foto aqui
  };

  const calcularTotal = () => {
    return equipamentos.reduce((total, item, i) => {
      const qtd = parseInt(quantidades[i]) || 0;
      return total + qtd * item.preco;
    }, 0).toFixed(2).replace('.', ',');
  };

  const montarMensagem = () => {
    const itensSelecionados = equipamentos.map((item, i) => {
      const qtd = parseInt(quantidades[i]) || 0;
      if (qtd > 0) {
        // Calcula o subtotal (quantidade * preço unitário)
        const subtotal = (qtd * item.preco).toFixed(2).replace('.', ',');
        return `• *${qtd}x* ${item.nome} ----- ${qtd} x R$${item.preco.toFixed(2).replace('.', ',')}/un. = *R$${subtotal}*\n\n`;
      }
      return null;
    }).filter(Boolean).join("%0A"); // Adiciona uma linha entre cada item

    let dataFormatada = '';
    if (startDate) {
      dataFormatada = moment(startDate).format('DD/MM/YYYY');
    }

    return `Olá, meu nome é *${nome}*.\n Gostaria de prosseguir com o orçamento de locação de equipamentos para o dia *${dataFormatada}*. \n Local: *${local}*.\n%0A%0AItens:%0A${itensSelecionados}%0A%0A\n *Total Estimado: R$${calcularTotal()}*${informacoesAdicionais ? `%0A%0AInformações Adicionais:%0A${informacoesAdicionais}` : ''}`;
  };
  const CustomDateInput = React.forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      ref={ref}
      onClick={onClick}
      value={value}
      onChange={onChange}
      placeholder="Data do seu evento"
      readOnly
      className={`form-control ${formErros.data ? 'is-invalid' : ''}`}
      style={{
        width: '100%',
        padding: '6.5px',
        borderRadius: '8px',
        border: formErros.data ? '1px solid red' : "1px solid #ccc",
        fontSize: '18px',
      }}
    />
  ));
  const enviarWhatsapp = () => {
    setFormTocados({ nome: true, local: true, data: true });
    let hasErros = false;
    const novosErros = {
      nome: !nome.trim(),
      local: !local.trim(),
      data: !data.trim()
    };

    if (!nome?.trim()) {
      novosErros.nome = true;
      hasErros = true;
    }
    if (!data?.trim()) {
      novosErros.data = true;
      hasErros = true;
    }
    if (!local?.trim()) {
      novosErros.local = true;
      hasErros = true;
    }

    setFormErros(novosErros);

    if (!hasErros) {
      setModalEnviando(true); // Mostra o modal
      setTimeout(() => {
        const numero = "5562992461404";
        const mensagem = montarMensagem();
        window.open(`https://wa.me/${numero}?text=${mensagem}`);
        setModalEnviando(false); // Esconde o modal depois que abrir
      }, 1200); // Tempo para mostrar o modal antes de abrir o WhatsApp
    } else {
      if (novosErros.nome) {
        nomeRef.current?.focus();
        nomeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.local) {
        localRef.current?.focus();
        localRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (novosErros.data) {
        dataRef.current?.focus();
        dataRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const renderDescricaoComNegrito = (descricao) => {
    const palavrasParaNegrito = ["potência", "grave", "ativa", "conjunto", "passiva", "watts", "w", "db", "dj", "mixer", "controladora", "parled", "dmx", "sem fio", "retorno", "torre", "electro-voice", "pioneer", "yamaha", "attack", "oversound", "armer", "kadosh"];
    return descricao.split(' ').map((palavra, index) => {
      const palavraLimpa = palavra.toLowerCase().replace(/[^a-zA-Z0-9áéíóúçãõ]/g, '');
      if (palavrasParaNegrito.includes(palavraLimpa)) {
        return <strong key={index}>{palavra} </strong>;
      }
      return <span key={index}>{palavra} </span>;
    });
  };

  const handleFaqClick = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleContatoClick = () => {
    window.open(`https://wa.me/5562992461404?text=Olá, gostaria de mais informações.`);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = estilos;
    document.head.appendChild(style);

    // ... seu código useEffect existente
  }, []);

  const estilos = `
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body { /* Adicione isso para garantir que o body também tenha box-sizing */
      box-sizing: border-box;
    }

    .main-container {
      max-width: 100%; /* Garante que não ultrapasse a largura do pai */
      margin: 40px auto;
      font-family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      padding: 10px;
      transition: margin-right 0.3s ease;
      /* Adiciona uma transição suave */
    }

    .main-container.mini-cart-open {
      margin-right: 350px;
      /* Largura do seu mini carrinho */
    }

    .form-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
      width: 100%;
    }

    .form-field {
      flex: 1;
      flex-basis: calc((100% - 10px) / 2); /* Dois campos por linha */
      max-width: 100%;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    /* Estilos para imagens responsivas */
    img {
      max-width: 100%;
      height: auto;
    }

    .card-equipamento {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-equipamento:hover {
  transform: scale(1.03); /* Zoom-in leve */
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.item-carrinho {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.botao-quantidade {
  transition: background-color 0.3s ease, transform 0.1s ease;
}
.botao-quantidade:active {
  transform: scale(0.9);
}

    @media (max-width: 600px) {
      .form-container {
        flex-direction: column;
        gap: 8px;
      }
      .form-field {
        flex-basis: 100%; /* Um campo por linha */
      }
      .form-control {
        padding: 6px;
        font-size: 14px;
      }
    }
  `;

  const estiloBotaoWhatsApp = {
    backgroundColor: '#25D366',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const estiloBotaoEsvaziar = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const estiloBotaoSair = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const flyToCart = (e, imagemSrc) => {
    const img = document.createElement('img');
    img.src = imagemSrc;
    img.style.position = 'absolute';
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.zIndex = 2000;
    img.style.pointerEvents = 'none';
    img.style.transition = 'all 0.8s ease-in-out';
    img.style.opacity = '1';

    // Posição do clique
    const rect = e.currentTarget.getBoundingClientRect();
    img.style.top = `${rect.top + window.scrollY}px`;
    img.style.left = `${rect.left + window.scrollX}px`;

    // Adiciona a imagem ao body
    document.body.appendChild(img);

    // Posição final do carrinho
    const cartIcon = botaoCarrinhoRef.current.getBoundingClientRect();
    const cartTop = cartIcon.top + window.scrollY;
    const cartLeft = cartIcon.left + window.scrollX;

    // Anima a imagem até o carrinho
    setTimeout(() => {
      img.style.top = `${cartTop + 10}px`;
      img.style.left = `${cartLeft + 10}px`;
      img.style.width = '30px';
      img.style.height = '30px';
      img.style.opacity = '0';
    }, 10);

    // Remove a imagem após a animação
    setTimeout(() => {
      img.remove();
    }, 900); // Tempo da animação
  };

  return (
    <div className={`main-container ${mainContainerClass}`} style={{ maxWidth: 1200, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 5 }}>
      <header className="header-gabal">
        <div className="container-header">
          <img src="/images/logo-gabal.png" alt="Logo Gabal" className="logo-gabal" />

          <nav className="menu-gabal">
            <a href="#home" className="active">Home</a>
            <a href="#atendimento">Área de Atendimento</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="https://orcamentos.gabal.com.br" target="_blank" rel="noopener noreferrer">Orçamentos</a>
          </nav>

          <div className="social-buttons">
            <a href="https://instagram.com/gabal.audio" target="_blank" rel="noopener noreferrer" className="icon-instagram">
              <i className="fab fa-instagram" style={{ fontSize: "45px", marginRight: "30px" }}></i>

            </a>
            <a href="https://wa.me/5562992461404" target="_blank" rel="noopener noreferrer" className="botao-whatsapp">
              Whatsapp
            </a>
          </div>
        </div>
      </header>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
        <div
          ref={botaoCarrinhoRef}
          onClick={() => {
            setIsMiniCartOpen(!isMiniCartOpen);

            if (botaoCarrinhoRef.current) {
              botaoCarrinhoRef.current.classList.add('botao-clicado');
              setTimeout(() => {
                botaoCarrinhoRef.current.classList.remove('botao-clicado');
              }, 200); // 0.2s = duração da animação
            }
          }}
          className="botao-carrinho-animado"
          style={{
            backgroundColor: '#000000',
            color: '#fff',
            borderRadius: '8px',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 3px 7px rgba(0,0,0,0.3)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
        >
          🛒
        </div>
        {isMiniCartOpen && isCarrinhoAberto && (
          <div className="mini-cart">
            {/* Fundo escuro */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
              }}
              onClick={() => setIsMiniCartOpen(false)} // Fecha o carrinho ao clicar fora
            />

            {/* Carrinho modal */}
            <div style={{
              position: 'fixed',
              top: 30,
              right: '5%',
              width: '90%',
              maxWidth: '400px',
              height: '75vh',
              backgroundColor: '#fff',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              zIndex: 1000,
            }}>
              {/* Cabeçalho */}
              <div style={{
                padding: '15px',
                backgroundColor: '#f1f1f1',
                textAlign: 'center',
                borderBottom: '1px solid #ccc',
                fontWeight: 'bold',
                fontSize: '18px',
              }}>
                Seu Carrinho
              </div>

              {/* Lista de Itens */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '15px',
              }}>
                {carrinho.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#777' }}>O carrinho está vazio.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {carrinho.map((item, index) => (
                      <li
                        key={index}
                        className={`item-carrinho ${item.removendo ? 'item-removendo' : ''}`}
                        style={{
                          marginBottom: '15px',
                          paddingBottom: '15px',
                          borderBottom: '1px solid #eee',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        {/* Imagem acima */}
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            borderRadius: '5px',
                            marginBottom: '8px',
                          }}
                          onClick={() => {
                            setImagemAmpliada(item.imagem);
                            setImagemAmpliadaAlt(item.nome);
                          }}
                        />

                        {/* Nome, quantidade e valor */}
                        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                          {item.nome}
                        </div>
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '5px' }}>
                          Qtd: {item.quantidade}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#25D366' }}>
                          R$ {(item.quantidade * item.preco).toFixed(2).replace('.', ',')}
                        </div>

                        {/* Botão de remover */}
                        <button
                          onClick={() => abrirModalRemoverItem(item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#dc3545',
                            cursor: 'pointer',
                            fontSize: '18px',
                            marginTop: '8px',
                          }}
                        >
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Rodapé */}
              <div
                className="mini-cart-footer"
                style={{
                  padding: '20px',
                  borderTop: '1px solid #eee',
                  backgroundColor: '#fafafa',
                }}
              >
                <div
                  className="total-carrinho" // ✅ Este também será estilizado no CSS
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '20px',
                    marginBottom: '15px',
                  }}
                >
                  Total: <span style={{ color: '#25D366' }}>
                    R$ {carrinho.reduce((total, item) => total + item.quantidade * item.preco, 0).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={() => abrirModalConfirmacaoEsvaziar(() => confirmarEsvaziarCarrinho())}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9363e'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4d4f'}
                >
                  🗑️ Esvaziar Carrinho
                </button>

                <button
                  onClick={() => setIsMiniCartOpen(false)}
                  style={{
                    backgroundColor: '#1890ff',
                    color: 'white',
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1575cc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1890ff'}
                >
                  ➕ Adicionar mais itens
                </button>

                <button
                  onClick={enviarWhatsapp}
                  style={{
                    backgroundColor: '#52c41a',
                    color: 'white',
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a614'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#52c41a'}
                >
                  💬 Solicitar orçamento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Sua Logo Aqui */}


      <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 30, color: "#333" }}>Solicite seu orçamento - Equipamentos para Locação</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginBottom: 20, justifyContet: "center", width: '100%' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            ref={nomeRef}
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`form-control ${formErros.nome ? 'is-invalid' : ''}`}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: formErros.nome ? '1px solid red' : "1px solid #ccc",
              fontSize: '18px',
            }}
          />
          {formErros.nome && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>Por favor, digite seu nome.</p>}
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            ref={localRef}
            type="text"
            placeholder="Local do Evento"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className={`form-control ${formErros.local ? 'is-invalid' : ''}`}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: formErros.local ? '1px solid red' : "1px solid #ccc",
              fontSize: '18px',
            }}
          />
          {formErros.local && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>Por favor, digite o endereço ou local do evento.</p>}
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>


          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setData(date ? format(date, 'dd-MM-yyyy') : '');
            }}
            customInput={<CustomDateInput ref={dataRef} />}
            dateFormat="dd-MM-yyyy"
            placeholderText="Data do seu evento"
            locale="pt-BR"
            withPortal
            portalId="root"
            onBlur={(e) => {
              const parsedDate = parse(data, 'dd-MM-yyyy', new Date());
              if (isValid(parsedDate)) {
                setStartDate(parsedDate);
              } else {
                setStartDate(null);
              }
            }}
          />
          {formErros.data && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>Por favor, selecione a data do evento.</p>}
        </div>
      </div>

      <p className="aviso-usuario" style={{
        margin: "30px auto",
        fontSize: 16,
        lineHeight: 1.7,
        color: "#444",
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderLeft: "5px solid #25D366",
        borderRadius: 10,
        maxWidth: "700px"
      }}>
        Se você já souber quais equipamentos deseja alugar para o seu evento,
        selecione abaixo a quantidade desejada de cada item. Caso tenha dúvidas, consulte nosso FAQ no final da página.
      </p>

      <div
        style={{
          width: '100%',
          overflowX: 'hidden',
          padding: '0 10px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="grid-equipamentos"

        >
          {equipamentos.map((item, i) => (
            <div
              key={i}
              className="card-equipamento"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 15,
                backgroundColor: "#fff",
                textAlign: "center",
              }}
            >
              {/* TOPO: Imagem e Nome */}
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    cursor: 'zoom-in',
                    position: 'relative',
                  }}
                  onClick={() => {
                    setImagemAmpliada(item.imagem);
                    setImagemAmpliadaAlt(item.nome);
                  }}
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain",
                      borderRadius: 6,
                      backgroundColor: "#ffffff",
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "1.1em",
                    fontWeight: "bold",
                    marginBottom: 5,
                    minHeight: "48px",
                    textAlign: "center",
                    lineHeight: "1.3",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {item.nome.split("\n").map((linha, idx) => (
                    <span key={idx}>{linha}</span>
                  ))}
                </div>

                <div style={{ marginBottom: 3 }}>
                  <span style={{ fontSize: "1.2em", fontWeight: 500, color: "#25D366" }}>
                    R${item.preco.toFixed(2).replace(".", ",")}
                  </span>
                  <span style={{ fontSize: "0.8em", color: "#777", marginLeft: 4 }}>/diária</span>
                </div>

                {data && (
                  <div style={{ fontSize: "0.9em", color: "#777", marginBottom: 10 }}>
                    Quantidade disponível: {calcularQuantidadeDisponivel(item)}
                  </div>
                )}
              </div>

              {/* BASE FIXA */}
              <div style={{ marginTop: "auto" }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => handleDecrement(i)}
                    style={botaoQtdStyle("-")}
                  >-</button>

                  <input
                    type="text"
                    value={quantidades[i]}
                    onChange={(e) => handleQuantidadeChange(e, i)}
                    style={{
                      width: '28px',
                      height: '28px',
                      padding: '0px',
                      fontSize: '14px',
                      textAlign: 'center',
                      border: '1px solid #ccc',
                      borderLeft: 'yes',
                      borderRight: 'yes',
                      boxSizing: 'border-box', // ✅ Garante altura exata
                      lineHeight: '25px',      // ✅ Alinha verticalmente o texto
                    }}
                  />

                  <button
                    onClick={(e) => handleIncrement(i, e)}
                    style={botaoQtdStyle("+")}
                  >+</button>

                  <button
                    onClick={() => {
                      setModalItem(item); // define qual item abrir no modal
                      setMostrarModalDescricao(true); // exibe o modal
                    }}
                    style={{
                      fontSize: 12,
                      height: '30px',
                      padding: '0 12px', // padding horizontal apenas
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ccc',
                      borderRadius: 5,
                      color: '#333',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1, // evita desníveis verticais
                    }}
                  >
                    Mais Informações
                  </button>
                </div>

                {erros[i] && (
                  <div style={{ color: "red", fontSize: "0.9em", textAlign: "center", marginTop: 5 }}>
                    Máximo disponível: {calcularQuantidadeDisponivel(item)}
                  </div>
                )}

                <div
                  style={{
                    maxHeight: infoVisivel[i] ? "none" : "0px", // Mostra tudo quando expandido
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                    fontSize: 14,
                    color: "#555",
                    marginTop: infoVisivel[i] ? 10 : 0,
                    padding: infoVisivel[i] ? "10px" : "0px",
                    borderTop: infoVisivel[i] ? "1px solid #eee" : "none",
                  }}
                  className={`descricao-expandida ${infoVisivel[i] ? "visivel" : ""}`}
                >
                  {renderDescricaoComNegrito(item.descricao)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-resumo-orcamento">
        <h2 style={{ textAlign: 'center', fontSize: 24, color: '#333', marginTop: 5, marginBottom: 20 }}>Resumo do Orçamento</h2>
        {carrinho.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', fontSize: 16 }}>Seu carrinho está vazio.</p>
        ) : (
          <>


            <div className="tabela-resumo">

              {/* TABELA EM TELAS GRANDES */}
              <div className="resumo-desktop">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 25, marginBottom: 15 }}>
                  <thead style={{ backgroundColor: '#f8f8f8' }}>
                    <tr>
                      <th style={tableHeaderStyle}>#</th>
                      <th style={tableHeaderStyle}>Item</th>
                      <th style={tableHeaderStyle}>Qtd.</th>
                      <th style={tableHeaderStyle}>Preço Unitário</th>
                      <th style={tableHeaderStyle}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrinho.map((item, index) => (
                      <tr key={item.nome} style={tableRowStyle}>
                        <td style={tableCellStyle}>{index + 1}</td>
                        <td style={{ ...tableCellStyle, textAlign: 'left' }}>{item.nome}</td>
                        <td style={tableCellStyle}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {item.quantidade}
                            <button
                              onClick={() => abrirModalRemoverItem(item)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#dc3545',
                                cursor: 'pointer',
                                fontSize: '18px',
                                marginLeft: '10px',
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                        <td style={tableCellStyle}>R$ {item.preco.toFixed(2).replace('.', ',')}</td>
                        <td style={tableCellStyle}>R$ {(item.quantidade * item.preco).toFixed(2).replace('.', ',')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CARDS EM TELAS PEQUENAS */}
              <div className="resumo-mobile">
                {carrinho.map((item, index) => (
                  <div className="item-resumo" key={index}>
                    {/* IMAGEM DO ITEM */}
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="imagem-resumo"
                      />
                    </div>

                    {/* INFORMAÇÕES DO ITEM */}
                    <div className="linha-resumo"><strong>Item:</strong><span>{item.nome}</span></div>
                    <div className="linha-resumo"><strong>Qtd:</strong><span>{item.quantidade}</span></div>
                    <div className="linha-resumo"><strong>Unitário:</strong><span>R$ {item.preco.toFixed(2).replace('.', ',')}</span></div>
                    <div className="linha-resumo"><strong>Subtotal:</strong><span>R$ {(item.quantidade * item.preco).toFixed(2).replace('.', ',')}</span></div>

                    {/* BOTÃO REMOVER */}
                    <button className="remover-botao" onClick={() => abrirModalRemoverItem(item)}>Remover</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: 10,
              marginBottom: 15,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'left',
              fontWeight: 'bold',
              fontSize: 18
            }}>
              <span style={{ textAlign: 'right', paddingRight: '10px' }}>Total estimado:</span>
              <span style={{ textAlign: 'left' }}>
                R${carrinho.reduce((total, item) => total + item.quantidade * item.preco, 0).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </>
        )}
      </div>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="informacoesAdicionais" style={{ display: 'block', marginTop: '10px', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
          Informações Adicionais:
        </label>
        <textarea
          id="informacoesAdicionais"
          value={informacoesAdicionais}
          onChange={(e) => setInformacoesAdicionais(e.target.value)}
          placeholder="Tem alguma necessidade específica ou gostaria de adicionar alguma observação?"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box', // ESSENCIAL
            minHeight: '120px',
            lineHeight: '2',
            resize: 'vertical'
          }}
        />
      </div>

      {carrinho.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
            marginTop: 10,
            marginBottom: 10,
            flexWrap: 'wrap',
            maxWidth: '600px', // controla o tamanho máximo dos dois juntos
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            className="botoes-final"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: 5,
              marginBottom: 5,
              flexWrap: 'wrap',
              maxWidth: '600px',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <button
              onClick={() => abrirModalConfirmacaoEsvaziar(() => confirmarEsvaziarCarrinho())}
              style={{
                width: '100%',
                backgroundColor: '#f44336',
                color: 'white',
                padding: '15px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
            >
              🗑️ Esvaziar Carrinho
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <button
              className="botao-carrinho"
              onClick={enviarWhatsapp}
              style={{
                width: '100%',
                backgroundColor: '#25D366',
                color: 'white',
                padding: '15px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
            >
              <FaWhatsapp style={{ marginRight: '8px', fontSize: '1.2em' }} />
              Solicitar orçamento
            </button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 40, borderTop: "1px solid #ccc", paddingTop: 20 }}>
        <h2 style={{ textAlign: "center", fontSize: 24, color: "#333", marginBottom: 30 }}>Perguntas Frequentes</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {perguntasFrequentes.map((faq, index) => (
            <li
              key={index}
              style={{
                marginBottom: 10,
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f0f0f0',
                  borderBottom: openFaqIndex === index ? '1px solid #e0e0e0' : 'none',
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => handleFaqClick(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#25D366';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
              >
                <div className="numero-pergunta">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <strong style={{ fontSize: 16, color: '#555' }}>{faq.pergunta}</strong>
              </div>
              {openFaqIndex === index && (
                <div
                  style={{
                    padding: '15px',
                    fontSize: 14,
                    color: '#777',
                    lineHeight: 1.6,
                    textAlign: 'justify',
                  }}
                  dangerouslySetInnerHTML={{ __html: faq.resposta }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Seção de Contato Direto */}
      <div style={{
        marginTop: 40,
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 22, color: '#555', marginBottom: 10 }}>Ainda está com dúvidas?</h2>
        <h3 style={{ fontSize: 18, color: '#777', marginBottom: 10 }}>{contatoGabal.nome}</h3>
        {/* Sua foto aqui */}
        {contatoGabal.imagem && <img src={contatoGabal.imagem} alt={`Contato com ${contatoGabal.nome}`} style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', marginBottom: 15 }} />}
        <p style={{ color: '#777', marginBottom: 10 }}>
          <strong style={{ fontWeight: 'bold', color: '#555', }}>Vamos conversar?</strong><br />
          Tel: <a href={`tel:${contatoGabal.telefone}`} style={{ color: '#25D366', textDecoration: 'none' }}>{contatoGabal.telefone}</a><br />
          Email: <a href={`mailto:${contatoGabal.email}`} style={{ color: '#25D366', textDecoration: 'none' }}>{contatoGabal.email}</a>
        </p>
        <button
          style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 16
          }}
          onClick={handleContatoClick}
        >
          {contatoGabal.mensagemBotao}
        </button>
      </div>
      {imagemAmpliada && (
        <div
          onClick={() => setImagemAmpliada(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={imagemAmpliada}
            alt={imagemAmpliadaAlt || ''}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.4s ease'
            }}
          />
        </div>

      )}
      {modalEnviando && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              fontSize: '18px',
              color: '#333',
              animation: 'fadeIn 0.4s ease'
            }}
          >
            <div
              style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #25D366', // Cor verde do WhatsApp
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>
            Obrigado! Redirecionando para o WhatsApp...
          </div>
        </div>
      )}
      {mostrarConfirmacaoEsvaziar && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.4s ease',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>Confirmar Ação</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
              Tem certeza que deseja <strong>esvaziar o carrinho</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button
                onClick={() => {
                  if (confirmarEsvaziarCallback) confirmarEsvaziarCallback();
                  setMostrarConfirmacaoEsvaziar(false);
                }}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
              >
                Sim, Esvaziar
              </button>
              <button
                onClick={() => setMostrarConfirmacaoEsvaziar(false)}
                style={{
                  backgroundColor: '#ccc',
                  color: '#333',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bbb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ccc'}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {mostrarModalRemoverItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px 40px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.4s ease',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>
              Confirmar Remoção
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
              Tem certeza que deseja remover o item: <strong>{itemParaRemover?.nome}</strong>?
            </p>
            <div className="modal-botoes-remocao">
              <button
                onClick={removerItemConfirmado}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  marginRight: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
              >
                Sim, Remover
              </button>
              <button
                onClick={cancelarRemocaoItem}
                style={{
                  backgroundColor: '#ccc',
                  color: '#333',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bbb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ccc'}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Botão flutuante do WhatsApp - Tirar dúvidas */}
      <a
        href="https://wa.me/5562992461404?text=Olá! Olá Gabriel. Preciso de ajuda para montar meu orçamento no site."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Tirar dúvidas no WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      {modalInfoAberto && equipamentoSelecionado && (
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh', // altura máxima do modal
            overflowY: 'auto', // ativa scroll se necessário
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            animation: 'fadeIn 0.4s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
            {modalItem?.nome.split('\n')[1] || modalItem?.nome}
          </h2>

          <img
            src={modalItem?.imagem}
            alt={modalItem?.nome}
            style={{
              maxWidth: '100%',
              maxHeight: '250px',
              objectFit: 'contain',
              marginBottom: '15px',
            }}
          />

          <p style={{
            fontSize: '15px',
            lineHeight: 1.6,
            textAlign: 'justify',
            color: '#444',
            marginBottom: '20px'
          }}>
            {renderDescricaoComNegrito(modalItem?.descricao)}
          </p>

          <button
            onClick={() => setMostrarModalDescricao(false)}
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Fechar
          </button>

        </div>
      )}
      {mostrarModalDescricao && modalItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '10px',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '420px',
              height: 'auto',
              maxHeight: '80vh', // menor altura para telas pequenas
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Conteúdo com rolagem */}
            <div
              style={{
                overflowY: 'auto',
                padding: '20px',
                flexGrow: 1,
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                {modalItem.nome.split('\n')[1] || modalItem.nome}
              </h2>

              <img
                src={modalItem.imagem}
                alt={modalItem.nome}
                style={{
                  maxWidth: '100%',
                  maxHeight: '180px',
                  objectFit: 'contain',
                  marginBottom: '10px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />

              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                textAlign: 'justify',
                color: '#444',
                marginBottom: '10px'
              }}>
                {renderDescricaoComNegrito(modalItem.descricao)}
              </p>
            </div>

            {/* Rodapé fixo do modal */}
            <div style={{
              padding: '15px 15px 20px 15px',
              borderTop: '1px solid #eee',
              backgroundColor: '#fafafa',
              textAlign: 'center'
            }}>
              <button
                onClick={() => setMostrarModalDescricao(false)}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;