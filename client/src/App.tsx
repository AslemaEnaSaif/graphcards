import { useEffect, useMemo, useRef, useState } from "react";
import { Edge, Network, Node } from "vis-network";
import "./App.css";
import { Card, TunisianValueTypes } from "./Types/types";

export default function App() {
  const containerRef = useRef(null);
  const [network, setNetwork] = useState<Network | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const nodes: Node[] = useMemo(
    () =>
      cards.map((card) => ({
        id: card.id,
        label: card.front.value,
      })),
    [cards]
  );
  // const nodes = useMemo(
  //   () => [
  //     { id: "1", label: "card1" },
  //     { id: "2", label: "card2" },
  //     { id: "3", label: "card3" },
  //   ],
  //   []
  // );

  useEffect(() => {
    const edges: Edge[] = [];

    const data = { nodes, edges };
    const options = {
      physics: {
        enabled: false,
      },
      interaction: {
        hover: true,
      },
    };
    if (containerRef.current !== null) {
      setNetwork(new Network(containerRef.current, data, options));
    }
    if (network) {
      return () => network.destroy(); // Clean up the network when the component unmounts
    }
  }, [nodes]);

  const BACKEND_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchCards = async () => {
      if (BACKEND_URL) {
        const response = await fetch(`${BACKEND_URL}/api/card/`);
        const data = await response.json();

        const formattedCards: Card[] = data.map((card: any) => ({
          ...card,
          id: card._id,
          _id: undefined,
        }));
        console.log(cards);
        setCards(formattedCards);
      }
    };

    fetchCards();
  }, []);

  // const addCard = () => {
  //   // network.setData({ nodes: nodes2, edges });
  //   nodes.push({ id: "4", label: "card4" });
  //   network2 && console.log(nodes);
  // };

  return (
    <div className={"appContainer"}>
      <div ref={containerRef} className={"canvasContainer"}></div>
      <div className={"cardLab"}>
        <form>
          <div>
            <input type="text" name="word" placeholder="word"></input>
            <select name="type">
              {Object.values(TunisianValueTypes).map((valueType) => (
                <option value={valueType}>{valueType}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="translation"
              placeholder="translation"
            ></input>
          </div>
          <div>
            <input type="text" name="example" placeholder="example"></input>
          </div>
          <div>
            <textarea name="notes" placeholder="notes"></textarea>
          </div>
          <div>
            <select name="groups" multiple>
              <option value="option1">option1</option>
              <option value="option2">option2</option>
              <option value="option3">option3</option>
            </select>
          </div>
          <div>
            <label htmlFor="link">links</label>
            <div>
              <select>
                <option value="">card1</option>
                <option value="">card2</option>
              </select>
              <input type="text" name="relation"></input>
              <button>+</button>
            </div>
          </div>
          <button>Create card</button>
        </form>
      </div>
    </div>
  );
}
