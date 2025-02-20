import { useEffect, useMemo, useRef, useState } from "react";
import { Edge, Network, Node } from "vis-network";
import "./App.css";
import { Card, CardApiData } from "./Types/types";
import CardLab from "./CardLab";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [network, setNetwork] = useState<Network | null>(null);
  const [showCardLab, setShowCardLab] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    console.log("TEST RENDER");
  }, [Network]);

  const nodes: Node[] = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,

        shape: "custom",
        ctxRenderer: ({
          ctx,
          x,
          y,
          id,
          state: { selected: selected, hover: hover },
        }) => {
          // const width = 120;
          // const height = 60;

          ctx.fillStyle = hover ? "#ddd" : "#f0f0f0";

          const drawRect = (width, height, selected) => {
            ctx.fillRect(x - width / 2, y - height / 2, width, height);

            ctx.strokeStyle = selected ? "#ff0000" : "#333";
            ctx.strokeRect(x - width / 2, y - height / 2, width, height);

            ctx.fillStyle = "#000";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(card.front.value, x, y - 10);
            ctx.fillText(card.back.example, x, y + 5);
          };

          if (selected) {
            drawRect(120, 120);
          } else {
            drawRect(120, 60);
          }

          return { drawExternal: false };
        },
      })),
    [cards]
  );

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const canvas = containerRef.current.getElementsByTagName("canvas")[0];
  //     console.log(canvas);
  //     const c = canvas.getContext("2d");
  //     // c?.fillRect(50, 60, 15, 10);
  //     c?.moveTo(50, 50);

  //     c?.lineTo(400, 300);
  //     c?.stroke();
  //   }
  // }, [containerRef]);

  useEffect(() => {
    const fetchCards = async () => {
      if (BACKEND_URL) {
        const response = await fetch(`${BACKEND_URL}/api/card/`);
        const data: CardApiData[] = await response.json();
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
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 100,
          springConstant: 0.8,
        },
      },
      interaction: {
        hover: true,
      },
      nodes: { shape: "box" },
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
          setShowCardLab(true);
        } else {
          setSelectedCard(null);
          setShowCardLab(false);
        }
      }
    };
    network?.on("click", handleGraphClick);

    return () => network.off("selectNode", handleGraphClick);
  }, [network, cards]);

  return (
    <>
      <div className={`appContainer ${showCardLab ? "showCardLab" : ""}`}>
        <div ref={containerRef} className={"canvasContainer"}></div>
        {showCardLab && <CardLab selectedCard={selectedCard} />}
      </div>
    </>
  );
}
