import { useEffect, useMemo, useRef, useState } from "react";
import { Edge, Network, Node } from "vis-network";
import "./App.css";
import { Card, CardApiData } from "./Types/types";
import CardLab from "./CardLab";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const containerRef = useRef(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const nodes: Node[] = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,
        label: card.front.value,
      })),
    [cards]
  );

  useEffect(() => {
    const fetchCards = async () => {
      if (BACKEND_URL) {
        const response = await fetch(`${BACKEND_URL}/api/card/`);
        const data: CardApiData[] = await response.json();
        console.log("data is2", data);
        const formattedCards: Card[] = data.map((card) => ({
          ...card,
          id: card._id,
          _id: undefined,
        }));
        setCards(formattedCards);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const edges: Edge[] = [];

    const data = { nodes, edges };
    const options = {
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        forceAtlas2Based: {
          gravitationalConstant: -20,
          centralGravity: 0.01,
          springLength: 100,
          springConstant: 0.8,
        },
      },
      interaction: {
        hover: true,
      },
      nodes: {},
    };
    if (containerRef.current !== null) {
      setNetwork(new Network(containerRef.current, data, options));
    }

    if (network) {
      return () => network.destroy();
    }
  }, [nodes]);

  useEffect(() => {
    if (!network) return;

    const handleGraphClick = () => {
      const selectedNodes = network.getSelectedNodes();
      if (cards) {
        const selected = cards.find((card) => card.id === selectedNodes[0]);
        if (selected) {
          setSelectedCard(selected);
        } else {
          setSelectedCard(null);
        }
      }
    };
    network?.on("click", handleGraphClick);

    return () => network.off("selectNode", handleGraphClick);
  }, [network, cards]);

  return (
    <>
      <div className={"appContainer"}>
        <div ref={containerRef} className={"canvasContainer"}></div>
        <CardLab selectedCard={selectedCard} />
      </div>
    </>
  );
}
