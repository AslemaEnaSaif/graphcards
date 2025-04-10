import { useCallback, useRef, useState } from "react";
import { Card } from "../Types/types";
import styles from "./PlaygroundPage.module.scss";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDeckId } from "../store/selectors/deckSelector";
import { Link } from "react-router-dom";
import CardPanel from "../constituants/CardPanel";

import { useDecksInfo } from "../hooks/useDecksInfo";
import { useDeck } from "../hooks/useDeck";
import Graph from "../constituants/Graph";
import { setSelectedDeckId } from "../store/slices/deckSlice";

export default function PlaygroundPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedDeckId = useSelector(selectSelectedDeckId);
  const { data: activeDeck } = useDeck(selectedDeckId);

  const [showCardPanel, setShowCardPanel] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const dispatch = useDispatch();

  const {
    data: decksInfo,
    error: decksInfoError,
    isLoading: isLoadingDecksInfo,
  } = useDecksInfo();
  const {
    data: deck,
    error: errorDeck,
    isLoading: isLoadingDeck,
  } = useDeck(selectedDeckId);

  const handleDeckSelection = useCallback(
    (deckId: string) => {
      dispatch(setSelectedDeckId(deckId));
    },
    [dispatch]
  );

  // TODO: loading UI
  if (isLoadingDeck) return <h1>Loading deck</h1>;

  if (!selectedDeckId) {
    return (
      <div>
        <Link to="/graphdecks">create deck</Link>
        <span> or </span>
        <label>Select a GraphDeck</label>
        <select
          defaultValue={"select-a-deck"}
          onChange={(e) => handleDeckSelection(e.target.value)}
        >
          <option value="select-a-deck" disabled>
            select a deck
          </option>
          {decksInfo?.map((deckInfo) => (
            <option key={deckInfo._id} value={deckInfo._id}>
              {deckInfo.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={styles.playGroundContainer}>
      <div className={`${styles.graphViewerContainer} `}>
        <div className={`${styles.graphViewerBar}`}>
          <div className={`${styles.selectedDeckName}`}>{activeDeck?.name}</div>
          <Button
            bgColorClass="bg-green"
            onClick={() => setShowCardPanel(!showCardPanel)}
          >
            add card
          </Button>
        </div>
        <div ref={containerRef} className={styles.canvasContainer}>
          <Graph selectedDeckId={selectedDeckId} />
        </div>
      </div>

      {showCardPanel && deck && (
        <div className={`${styles.cardPanelContainer}`}>
          <CardPanel
            selectedDeck={deck}
            selectedCard={selectedCard}
            setShowCardPanel={setShowCardPanel}
          />
        </div>
      )}
    </div>
  );
}
